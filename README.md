# Project Overview
- Build a blog platform where users can create, edit, and delete blog posts. The platform integrates a MongoDB database for storing and retrieving blog data.

# Tech Stack
1.Frontend: JavaScript (React)
2. Backend: JavaScript (Node.js, Express)
3. Database: MongoDB
## Features
1. User authentication (register/login)
2. Create, edit, delete blog posts
3. Store blog posts
4. Show users a list of all posts they’ve read
5. Responsive design
6. Bonus: Markdown editor for blog posts
7. Bonus: Upload header images for blog posts
### Installation
- Clone the repository:
'git clone https://github.com/your-username/blog-platform-backend.git'
'cd blog-platform-backend'

'npm install'
### Set up MongoDB:
- Create a MongoDB Atlas account and create a new cluster.
- Create a new database and collection.
- Note down the connection string.
### Directory Structure

'mediblog/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
├── package.json
└── README.md'

### Environment Variables
- Create a .env file in the root of your project and add your MongoDB connection string:

'MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret'
