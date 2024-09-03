# Dev-Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Description

Dev-Blog is a dynamic blogging platform designed to provide users with an engaging way to create, manage, and interact with blog posts. The project leverages Express.js and Sequelize to handle user authentication and data management, while Materialize CSS ensures a modern, responsive design. With Dev-Blog, users can easily post their thoughts, comment on others' entries, and navigate through the content with a sleek, mobile-friendly interface. The integration of Materialize CSS offers a polished and accessible user experience, making it easier for developers to focus on content rather than design challenges.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation

To set up and run Dev-Blog locally, start by cloning the repository using git clone https://github.com/demichele-c/dev-blog.git and navigate to the project directory. Install the necessary dependencies with npm install. Create a .env file in the root directory and add your environment variables for database access and session secrets. Seed the database with npm run seeds to populate it with initial data. Finally, start the server using npm start and access the application by opening http://localhost:3001 in your web browser.

## Usage

To use the Dev-Blog application, start the server with npm start, which will run the application on http://localhost:3001. Open this URL in your web browser to access the blog. From the homepage, you can navigate to the login or registration pages to create or access your user account. Once logged in, you can create, view, edit, and delete blog posts via the dashboard. The blog's main interface allows you to explore various posts, with options to comment on them. All interactions are managed through a user-friendly interface built with Materialize CSS for responsive design. For more details on specific features or to report issues, refer to the documentation or the project's GitHub repository.

## Contributing

We welcome contributions to the Dev-Blog project! To contribute, please follow these steps: First, fork the repository on GitHub and clone it to your local machine. Create a new branch for your feature or bug fix by running git checkout -b your-branch-name. Make your changes and test them thoroughly. When you're ready, commit your changes with a descriptive message using git commit -m "Your descriptive message", and push the branch to your forked repository with git push origin your-branch-name. Submit a pull request from your branch to the main repository. Ensure that your code adheres to our coding standards and passes all tests. We appreciate your contributions and will review and merge them as soon as possible. If you have any questions or need help, feel free to open an issue in the repository.

## Tests

To test your Dev-Blog API using Insomnia, open the Insomnia application and create a new request by selecting the appropriate HTTP method (GET, POST, PUT, DELETE) and entering the URL for the endpoint you wish to test. For endpoints that require a request body, such as POST or PUT, navigate to the "Body" tab and input your JSON data. If the endpoint requires headers, add them under the "Headers" tab (e.g., Content-Type: application/json). Click "Send" to execute the request and review the response in the lower section of the Insomnia window. Ensure that the response data, status codes, and any error messages are consistent with your expectations. Repeat this process for various endpoints to confirm the API's functionality.

## Questions

If you have any questions, please feel free to contact me at [demichele.charles@yahoo.com](mailto:demichele.charles@yahoo.com). You can also find more of my work at [demichele-c](https://github.com/demichele-c).

## License

This project is licensed under the MIT license. Click [here](https://opensource.org/licenses/MIT) for more details.
