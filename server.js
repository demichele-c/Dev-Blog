const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const userRoutes = require('./controllers/userController');
const postRoutes = require('./controllers/postController');
const commentRoutes = require('./controllers/commentController');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Post, Comment, User } = require('./models'); // Ensure User and Comment are imported
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
  cookie: {},
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

app.get('/dashboard', hasAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.session.userId }
    });
    res.render('dashboard', { 
      posts,
      loggedIn: req.session.userId ? true : false,
      title: 'Dashboard',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching dashboard posts.');
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
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});
