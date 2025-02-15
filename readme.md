# Posts-comments service

## Tech Stack
1. NodeJS
2. ExpressJS
3. TypeScript
4. MongoDB
5. Docker
## Installation
### Prerequisites
- docker
- npm
  
# Getting Started

## Installation

1. Clone the repository

2. Set up environment variables (.env file) in both comment's and post service's root folders:

   - For the comments service:
     ```
     # ./cloudsek-comments-service/.env
     MONGO_URL=your_mongo_db_connection_url
     POST_SERVICE_URL=http://localhost:8001/post
     ```

   - For the posts service:
     ```
     # ./cloudsek-posts-service/.env
     MONGO_URL=your_mongo_db_connection_url
     COMMENT_SERVICE_URL=http://localhost:8000
     ```

3. Navigate to the root directory and run the following command:
```
docker-compose up --build
```
> Note:  Make sure docker is running

> Note: Replace `your_mongo_db_connection_url` with your actual MongoDB connection URL.

## Overview
This project comprises of two services post-service and comment-service which interact with each other for extensible functionalities.
### Architecture
![Frame 1](https://github.com/rishiCz/cloudsek-assignment/assets/98217604/ce77c10e-8d93-4f8e-b8ce-c679fd7207e1)
### Functionalities

 - **Implemented rich text support by creating a html validator for comment.** (The input for the text would be a html string consisting of <p/<b,<a and<i HTML tags for normal, bold, link and italics tags respectively)
 - Implemented validations for request body using class-validators and DTO's.
 - Implemented logs for better debugging.
 - Implemented containers for each service

### Post-service
The post service handles all the operations related to a post.
 - User can perform CRUD operations on the post.
 - A post can have multiple comments linked to it.
 - When a post gets deleted all the comments of that also get deleted.

#### Endpoints

- **GET**: `/post` - Gets all posts.
- **POST**: `/post` - Creates a new post.
- **GET**: `/post/:postId` - Gets a specific post by its ID.
- **DELETE**: `/post/:postId` - Deletes a specific post by its ID.
- **PATCH**: `/post/:postId` - Updates a specific post by its ID.

### Comment-service
The comment service handles all the operations related to comments
 - User can perform CRUD operations on the comment.
 - Each comment consists of a postId in it
 - User can get or delete all comments in a post

#### Endpoints

- **GET**: `/comment` - Gets all comments.
- **POST**: `/comment` - Creates a new comment.
- **GET**: `/comment/:commentId` - Gets a specific comment by its ID.
- **DELETE**: `/comment/:commentId` - Deletes a specific comment by its ID.
- **PATCH**: `/comment/:commentId` - Updates a specific comment by its ID.
- **GET**: `/postcomments/:postId` - Gets all comments for a specific post by the post's ID.
- **DELETE**: `/postcomments/:postId` - Deletes all comments for a specific post by the post's ID.
 



