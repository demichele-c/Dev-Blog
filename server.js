const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const userRoutes = require('./controllers/userController');
const postRoutes = require('./controllers/postController');
const commentRoutes = require('./controllers/commentController');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Post, Comment, User } = require('./models');
const hasAuth = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  next();
});

// Session configuration
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Optional cookie settings
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // Prevent client-side access to cookies
    secure: process.env.NODE_ENV === 'production' // Only set cookies over HTTPS in production
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Handlebars configuration
const hbs = exphbs.create({
  // Define helpers here if needed
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Page routes
app.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title', 'createdAt'],
    });
    res.render('homepage', { 
      posts,
      loggedIn: req.session.userId ? true : false, // Pass loggedIn status
      title: 'Homepage',
    });
  } catch (error) {
    console.log("err: ", error);
    res.status(500).send('An error occurred while fetching posts.');
  }
});

app.get('/dashboard', async (req, res) => {
  if (req.session.userId) {
    try {
      const posts = await Post.findAll({
        where: { user_id: req.session.userId },
        order: [['createdAt', 'DESC']] // Optional: Order posts by creation date
      });
      res.render('dashboard', { title: 'Dashboard', posts });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('/login'); // Redirect to login if user is not authenticated
  }
});

// Route to render the new post form
app.get('/post/new', hasAuth, (req, res) => {
  console.log('GET /post/new route hit');

  // Check if the session has a userId
  if (!req.session.userId) {
    console.log('User not logged in, redirecting to /login');
    return res.redirect('/login');
  }

  console.log('User is logged in, rendering new-post page');
  
  try {
    res.render('new-post', {
      loggedIn: req.session.userId ? true : false,
      title: 'New Post'
    });
    console.log('Successfully rendered new-post page');
  } catch (error) {
    console.error('Error rendering new-post page:', error);
    res.status(500).send('An error occurred while rendering the new post page.');
  }
});

app.post('/post/new', hasAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new Error('Title and content are required');
    }
    await Post.create({
      title,
      content,
      user_id: req.session.userId,
    });
    res.redirect('/dashboard'); // Redirect to the dashboard after creating the post
  } catch (error) {
    console.error('Error creating new post:', error.message || error);
    res.status(500).send(`An error occurred while creating the new post: ${error.message || error}`);
  }
});

app.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: Comment, include: [User] },
        User // Include the post creator
      ]
    });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('post', {
      post,
      loggedIn: req.session.userId ? true : false,
      title: post.title
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the post.');
  }
});

// Add route for login page
app.get('/login', (req, res) => {
  res.render('login', { loggedIn: req.session.userId ? true : false }); // Pass loggedIn status
});

// Add route for registration page
app.get('/register', (req, res) => {
  res.render('register', { loggedIn: req.session.userId ? true : false }); // Pass loggedIn status
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});
