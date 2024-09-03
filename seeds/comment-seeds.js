const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "I love working with JavaScript! The event-driven nature makes it so versatile.",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "CSS Grid is a game changer for layout design. It simplifies complex layouts.",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: "React hooks have really improved how I manage state in my components.",
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text: "PostgreSQL's support for JSONB is fantastic for storing structured data.",
    user_id: 4,
    post_id: 4,
  },
  {
    comment_text: "Express makes setting up routes and middleware so much easier in Node.js.",
    user_id: 5,
    post_id: 5,
  },
  {
    comment_text: "Object-Oriented Programming helps in creating reusable code and maintaining codebase efficiently.",
    user_id: 6,
    post_id: 6,
  },
  {
    comment_text: "Node.js is great for building scalable network applications. Its non-blocking I/O model is superb.",
    user_id: 1,
    post_id: 7,
  },
  {
    comment_text: "HTML5 has brought some really cool new features like semantic elements and the canvas API.",
    user_id: 2,
    post_id: 8,
  },
  {
    comment_text: "Using PostgreSQL with Sequelize ORM makes database management so much more convenient.",
    user_id: 3,
    post_id: 9,
  },
  {
    comment_text: "React's component-based architecture promotes better code organization and reuse.",
    user_id: 4,
    post_id: 10,
  },
  {
    comment_text: "CSS variables are incredibly useful for maintaining a consistent theme throughout a site.",
    user_id: 5,
    post_id: 11,
  },
  {
    comment_text: "Express middleware functions allow for powerful and flexible request handling.",
    user_id: 6,
    post_id: 12,
  },
  {
    comment_text: "OOP principles like inheritance and encapsulation are fundamental for scalable software development.",
    user_id: 1,
    post_id: 13,
  },
  {
    comment_text: "The 'fetch' API in JavaScript makes handling asynchronous requests more intuitive.",
    user_id: 2,
    post_id: 14,
  },
  {
    comment_text: "React's virtual DOM improves performance by minimizing direct DOM manipulations.",
    user_id: 3,
    post_id: 15,
  },
  {
    comment_text: "PostgreSQL's advanced indexing options greatly enhance query performance.",
    user_id: 4,
    post_id: 16,
  },
  {
    comment_text: "Node.js's npm ecosystem offers a vast range of libraries to speed up development.",
    user_id: 5,
    post_id: 17,
  },
  {
    comment_text: "Understanding HTML semantics helps improve SEO and accessibility.",
    user_id: 6,
    post_id: 18,
  },
  {
    comment_text: "CSS Flexbox makes it easy to align and distribute space among items in a container.",
    user_id: 1,
    post_id: 19,
  },
  {
    comment_text: "Express's routing system allows for clean and manageable API endpoints.",
    user_id: 2,
    post_id: 20,
  },
  {
    comment_text: "React's context API is great for managing global state without prop drilling.",
    user_id: 3,
    post_id: 21,
  },
  {
    comment_text: "JavaScript ES6 features like arrow functions and template literals enhance coding efficiency.",
    user_id: 4,
    post_id: 22,
  },
  {
    comment_text: "Using Node.js for server-side scripting allows for seamless integration with front-end technologies.",
    user_id: 5,
    post_id: 23,
  },
  {
    comment_text: "PostgreSQL's support for transactions helps maintain data integrity across operations.",
    user_id: 6,
    post_id: 24,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
