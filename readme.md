# NEWZ
NEWZ is a comprehensive web application designed to deliver the latest news and updates to users. It features a robust backend built with Express and a dynamic frontend developed using Angular. Users can explore all news articles, search for specific news by keywords, and authenticate for personalized experiences. Admin users have additional privileges to add new articles, ensuring the platform remains up-to-date with the latest information.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Overview](#overview)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [News Endpoints](#news-endpoints)
    - [Authentication Endpoints](#authentication-endpoints)
  - [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Live Link
The live version of the NEWZ web application is available at:
[NEWZ Live](https://newz-app-front.vercel.app)

## Installation
Provide step-by-step instructions on how to set up the project locally.

### Frontend (Angular)
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Angular development server
ng serve
```

### Backend (Express)
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the Express server
npm start
```

## Usage
Explain how to use the project once it’s set up.

```bash
# Frontend will be running at
http://localhost:4200

# Backend API will be available at
http://localhost:3000
```

## API Documentation

### Overview
This API provides news-related services and authentication features. Users can fetch all news, search news by keywords, and perform authentication actions such as login and register. Admin users can also add news.

### Authentication
The API uses token-based authentication. Users must include a valid token in the `Authorization` header for protected routes.

```http
Authorization: Bearer <token>
```

### Endpoints

#### News Endpoints

##### Get All News
- **Method**: GET
- **URL**: `/api/news/all`
- **Description**: Fetch all news articles.

**Example Request**:
```http
GET /api/news/all
```

**Example Response**:
```json
[
  {
   "id": 1,
   "title": "New Article Title",
   "content": "Content of the new article.",
   "url": " main link to the source.",
   "description": "small description of the news article",
   "image": "image of the news article"
  },
  {
    "id": 2,
    "title": "New Article Title",
    "content": "Content of the new article.",
    "url": " main link to the source.",
    "description": "small description of the news article",
    "image": "image of the news article"
  }
]
```

##### Search News
- **Method**: GET
- **URL**: `/api/news/search?q={keyword}`
- **Description**: Search for news articles by keyword.

**Example Request**:
```http
GET /api/news/search?q=technology
```

**Example Response**:
```json
[
  {
    "id": 1,
    "title": "Technology News",
    "content": "Content of the new article.",
    "url": " main link to the source.",
    "description": "small description of the news article",
    "image": "image of the news article"
  }
]
```

##### Add News (Admin Only)
- **Method**: POST
- **URL**: `/api/news`
- **Description**: Add a new news article. Admin authentication required.
- **Body Parameters**:
  - `title`: Title of the news article.
  - `content`: Content of the news article.
  - `url`: main link to the source.
  - `description`: small description of the news article.
  - `image`: image of the news article


**Example Request**:
```http
POST /api/news
{
  "title": "New Article Title",
  "content": "Content of the new article."
  "url": " main link to the source."
  "description": "small description of the news article"
  "image": "image of the news article"
}
```

**Example Response**:
```json
{
  "message": "News article added successfully."
}
```

#### Authentication Endpoints

##### Register
- **Method**: POST
- **URL**: `/api/auth/register`
- **Description**: Register a new user.
- **Body Parameters**:
  - `name`: Username of the user.
  - `password`: Password of the user.
  - `email`: email of the user.
  - `confirm password`: Password of the user.

**Example Request**:
```http
POST /api/auth/register
{
  "email": "newuser@gmail.com",
  "password": "password123"
}
```

**Example Response**:
```json
{
  "message": "User registered successfully."
}
```

##### Login
- **Method**: POST
- **URL**: `/api/auth/login`
- **Description**: Login a user and get a token.
- **Body Parameters**:
  - `email`: email of the user.
  - `password`: Password of the user.

**Example Request**:
```http
POST /api/auth/login
{
  "email": "existinguser@gmail.com",
  "password": "password123"
}
```

**Example Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Handling
List common errors, their status codes, and possible solutions.

```json
{
  "error": "Invalid request",
  "message": "Details about the error"
}
```

## Contributing
Provide guidelines for contributing to the project.

## License
Include license information for the project.
