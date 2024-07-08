# Posts-comments service

## Tech Stack
1. NodeJS
2. ExpressJS
3. TypeScript
4. MongoDB
5. Docker
## Installation
### Prerequisites
1- docker
2- npm
To get started with installation
1. Clone the repository
2. Set up envrionment variables (.env file) in both comment's and post service's root folders
3. Navigate to root and run the following cmd
```
docker-compose up --build
```
**Note:  Make sure docker is running**

## Overview
This project comprises of two services post-service and comment-service which interact with each other for extensible functionalities.
### Functionalities

 - **Implemented rich text support by creating a html validator for post text contenet.** (The input for the text would be a html string consisting of <p/<b,<a and<i HTML tags for normal, bold, link and italics tags respectively)
 - Implemented validations for request body using class-validators and DTO's.
 - Implemented logs for better debugging.
 - Implemented containers for each service

### Post-service
The post service handles all the operations related to a post.
 - User can perform CRUD operations on the post.
 - A post can have multiple comments linked to it.
 - When a post gets deleted all the comments of that also get deleted.
### Comment-service
The comment service handles all the operations related to comments
 - User can perform CRUD operations on the post.
 - Each comment consists of a postId in it
 - User can get or delete all comments in a post
 
## Architecture

