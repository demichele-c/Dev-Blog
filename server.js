const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
//const userRoutes = require('./routes/userRoutes');
const userRoutes = require('./controllers/userController');
//const postRoutes = require('./routes/postRoutes');
const postRoutes = require('./controllers/postController');
// const commentRoutes = require('./routes/commentRoutes');
const commentRoutes = require('./controllers/commentController');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Post, User, Comment } = require('./models')

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
app.set('views', path.join(__dirname, 'views')); // Ensure the views directory is correctly set

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers --> Taking the incoming REQUEST and redirecting it to the file with the LOGIC
app.use('/api/users', userRoutes);  // Adjusted route paths for clarity
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Page routes
app.get('/', (req, res) => {
  // Fetch posts or other data as needed
  // How would I request ALL POSTS ?
  Post.findAll()  // WE kick off an ASYNC request (PROMISE)
  // A SUCCESS STATE --> we get vaild data back from the REQUEST
      .then(data => {  // the DATA is the SUCCSSFUL RESPONSE from our DB
        console.log("data: ", data);


        res.render('homepage', { });
      })
      // A FAILURE / ERROR STATE and we get an ERROR MESSAGE back from the request
      .catch(error => {  // the ERROR 
        console.log("err: ", error);
      });
      
  // res.render('homepage', { });
});

app.get('/dashboard', (req, res) => {
  // Fetch user posts or other data as needed
  res.render('dashboard');
});

app.get('/post/:id', (req, res) => {
  // Fetch post details and comments by ID
  res.render('post');
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
