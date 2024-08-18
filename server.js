const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const userRoutes = require('./controllers/userController');
const postRoutes = require('./controllers/postController');
const commentRoutes = require('./controllers/commentController');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Post } = require('./models');
const hasAuth = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

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
    const data = await Post.findAll();
    res.render('homepage', { posts: data, name: "Tim" });
  } catch (error) {
    console.log("err: ", error);
    res.status(500).send('An error occurred while fetching posts.');
  }
});

app.get('/dashboard', hasAuth, (req, res) => {
  res.render('dashboard');
});

app.get('/post/:id', (req, res) => {
  res.render('post');
});

// Add route for login page
app.get('/login', (req, res) => {
  res.render('login'); // Renders the login.handlebars view
});

// Add route for registration page
app.get('/register', (req, res) => {
  res.render('register'); // Renders the register.handlebars view
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
