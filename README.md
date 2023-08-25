# Yoyo Network

This project was bootstrapped with [React + Vite](https://vitejs.dev/guide/).

## Description

The project is a full stack social networking app that allows users end to end experience of a complete social media platform.\
It is consists of 2 directories:

- A backend that is built as a RESTful, stateless API
- A frontend which communicates with the API and parse its responses into a well crafted user interface

## Technologies

### Backend

The app's core technologies are Express, NodeJS and MongoDB for the backend.\
It uses safe user authentication using Passport for the strategy, bcrypt and crypto for encryption and JWTs for persisting user sessions.\
The app also makes use of Multer and Cloudinary for file uploads and cloud image storage.

### Frontend

The app uses React, Javascript, HTML and CSS for the frontend.\
It also features various external libraries such as Prop-types for type checking, react-router-dom for routing and react-icons for icons.

## Key Features

The app fully responsive and contains everything a proper social media app may need.

### Authentication

Non-logged in users will not be able to see any content except login and sign up pages.\
Users can:

- Sign up
- Login with existed credentials
- Login as guests with a demo profile
- Log out(if logged in)

### Profiles

Logged in users may:

- Scroll through the home feed of to see followed users' and their own posts
- Visit other profiles
- Follow & unfollow other users
- Edit their own profile details
- Explore non-followed users
- Check following & followers list of a user

### Posts

- Create new posts(with pictures too!)
- Leave likes & comment on posts
- Remove likes & comments from posts
- View post details to see further information
- Delete posts

## Important Scripts

In the project directory, you can run:

### Backend - `npm run serverstart`

Runs the backend app in the development mode and spins up a server.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page WILL reload when you make changes.\
The app will also run the debugger to aid in the development process.\
You may also see any lint errors in the console.

### Frontend - `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Frontend - `npm run dev`

Runs the frontend app in the development mode and spins up a client.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page WILL reload when you make changes.\
You may also see any lint errors in the console.

Image by [Clker-Free-Vector-Images](https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=306751) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=306751)
