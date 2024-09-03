const { Post } = require("../models");

const postdata = [
  {
    title: "Exploring the Power of JavaScript",
    post_text:
      "JavaScript's flexibility allows for powerful web applications. Its event-driven, non-blocking nature helps create interactive and dynamic user experiences. Let's dive into how JavaScript enhances modern web development.",
    user_id: 1,
  },
  {
    title: "Mastering CSS Grid Layout",
    post_text:
      "CSS Grid is a layout system designed to help developers create complex, responsive web layouts with ease. Learn about its features and how it simplifies the creation of grid-based designs.",
    user_id: 2,
  },
  {
    title: "Getting Started with React Hooks",
    post_text:
      "React Hooks offer a new way to manage state and lifecycle features in functional components. Explore the advantages of using hooks and how they can improve your React applications.",
    user_id: 3,
  },
  {
    title: "Leveraging PostgreSQL JSONB for Flexibility",
    post_text:
      "PostgreSQL's JSONB data type provides powerful ways to store and query JSON data. Learn how to use JSONB to handle dynamic and semi-structured data efficiently.",
    user_id: 4,
  },
  {
    title: "Streamlining Development with Express",
    post_text:
      "Express is a minimal and flexible Node.js web application framework. Discover how Express simplifies routing and middleware management in server-side development.",
    user_id: 5,
  },
  {
    title: "Understanding Object-Oriented Programming",
    post_text:
      "Object-Oriented Programming (OOP) principles like encapsulation, inheritance, and polymorphism can help you create more modular and reusable code. Learn how to apply OOP concepts in your projects.",
    user_id: 6,
  },
  {
    title: "Building Scalable Applications with Node.js",
    post_text:
      "Node.js is ideal for building scalable network applications due to its non-blocking I/O model. Explore how Node.js handles concurrent operations and how it can be used to create high-performance applications.",
    user_id: 1,
  },
  {
    title: "HTML5 New Features and APIs",
    post_text:
      "HTML5 introduces new elements and APIs that enhance web development, such as the canvas API and semantic elements. Understand how these features can improve your HTML structure and interactivity.",
    user_id: 3,
  },
  {
    title: "Optimizing Queries with PostgreSQL Indexes",
    post_text:
      "Indexes in PostgreSQL can significantly improve query performance. Learn about different types of indexes and how to use them effectively to optimize your database operations.",
    user_id: 4,
  },
  {
    title: "React Context API for Global State Management",
    post_text:
      "The React Context API allows you to manage global state across your application without prop drilling. Discover how to use context to simplify state management in your React projects.",
    user_id: 5,
  },
  {
    title: "CSS Variables for Consistent Styling",
    post_text:
      "CSS variables provide a way to define and reuse values throughout your stylesheets. Learn how to use CSS variables to maintain consistency and simplify updates to your design system.",
    user_id: 6,
  },
  {
    title: "Express Middleware for Custom Functionality",
    post_text:
      "Middleware in Express allows you to extend functionality for your routes. Explore how to create and use custom middleware to handle authentication, logging, and more.",
    user_id: 1,
  },
  {
    title: "Benefits of OOP in Software Design",
    post_text:
      "Applying Object-Oriented Programming principles can help in designing robust and maintainable software. Learn how concepts like inheritance and encapsulation contribute to better software design.",
    user_id: 2,
  },
  {
    title: "Async/Await in JavaScript for Cleaner Code",
    post_text:
      "Async/await syntax in JavaScript makes handling asynchronous operations more readable and maintainable. Understand how to use async/await to simplify your asynchronous code.",
    user_id: 3,
  },
  {
    title: "Enhancing Web Apps with React's Performance Features",
    post_text:
      "React provides several features to improve application performance, including memoization and lazy loading. Discover how to leverage these features to create fast and efficient web applications.",
    user_id: 4,
  },
  {
    title: "Securing Your Node.js Applications",
    post_text:
      "Securing Node.js applications is crucial for protecting user data and ensuring application integrity. Learn about best practices for securing your Node.js applications against common vulnerabilities.",
    user_id: 5,
  },
  {
    title: "Responsive Web Design with CSS Flexbox",
    post_text:
      "CSS Flexbox offers powerful tools for creating responsive layouts that adapt to different screen sizes. Explore how Flexbox can simplify layout design and improve your website's responsiveness.",
    user_id: 6,
  },
  {
    title: "Integrating Node.js with PostgreSQL",
    post_text:
      "Combining Node.js with PostgreSQL provides a robust solution for server-side applications with complex data requirements. Learn how to set up and integrate PostgreSQL with Node.js for effective data management.",
    user_id: 1,
  },
  {
    title: "Modern JavaScript Features: ES6 and Beyond",
    post_text:
      "JavaScript has evolved significantly with the introduction of ES6 and subsequent versions. Discover new features like arrow functions, template literals, and destructuring that enhance your JavaScript development.",
    user_id: 2,
  },
  {
    title: "Handling Form Data in React",
    post_text:
      "React offers various methods for managing form data, including controlled components and custom hooks. Learn how to handle form data efficiently in your React applications.",
    user_id: 3,
  },
  {
    title: "Using CSS Transitions and Animations",
    post_text:
      "CSS transitions and animations can add visual interest to your web applications. Explore how to use these features to create smooth and engaging user experiences.",
    user_id: 4,
  },
  {
    title: "Developing RESTful APIs with Express",
    post_text:
      "Express is well-suited for building RESTful APIs with its straightforward routing and middleware capabilities. Learn how to design and implement RESTful APIs using Express.",
    user_id: 5,
  },
  {
    title: "Advanced PostgreSQL Techniques",
    post_text:
      "PostgreSQL offers advanced features like window functions and common table expressions (CTEs) for complex queries. Discover how to use these techniques to perform advanced data analysis.",
    user_id: 6,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
