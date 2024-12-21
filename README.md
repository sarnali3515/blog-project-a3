# Blog Project

An Express.js application built with TypeScript and MongoDB for managing blogs and user roles with secure authentication and role-based access control.

## Live Demo

[Blogging Platform - Live URL](#)

---

## Features

### User Roles

- **Admin**:

  - Can block users.
  - Can delete any blog.

- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.

### Blog Management

- Publicly accessible blogs with search, sort, and filter options.
- CRUD operations for authenticated users.

### Secure Authentication and Authorization

- Login required for blog creation, updates, and deletion.
- Role-based access control for admin and user functionalities.

---

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript

---

## Setup

### Clone the repository:

```bash
git clone https://github.com/sarnali3515/blog-project-a3
cd blog-project-a3
```

### Install dependencies:

```bash
npm install
```

### Create a .env file with the following variables:

```bash
PORT=5000
NODE_ENV = development
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.sgvl42h.mongodb.net/blog-a3?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS = <rounds>
JWT_ACCESS_SECRET=<your secret code>
```

### Start the server:

```bash
npm run start:dev
```

## API Endpoints

### Authentication

- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Authenticate and obtain a JWT token.

### Blog Management

- POST /api/blogs: Create a new blog.
- PATCH /api/blogs/:id: Update your blog.
- DELETE /api/blogs/:id: Delete your blog.
- GET /api/blogs: Publicly view blogs with search, sort, and filter.

### Admin Actions

- PATCH /api/admin/users/:userId/block: Block a user.
- DELETE /api/admin/blogs/:id: Delete any blog.

---
