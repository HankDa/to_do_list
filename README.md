# Project Title

Todo List App

## Introduction

This project creates a backend server using Django and a frontend using React. It allows users to create and modify their todo lists through the interaction between the frontend and backend. The application also provides a "Get News" button that fetches the latest top 5 news articles and adds them to the todo list as a reading list.

## Instructions

### Backend

1. Prepare the virtual environment for the Django project:
   - Install `pipenv` by running: `pip install pipenv`
   - Navigate to the project directory and run: `pipenv shell`

2. Start the backend server:
   - Navigate to the backend directory: `cd to_do_list/backend`
   - Run the command: `python manage.py runserver`

### Frontend

1. Install dependencies:
   - Navigate to the project root directory
   - Run: `npm install`

2. Start the frontend server:
   - Run: `npm start`

### Environment Variables

1. Create an `.env` file:
   - Create a file named `.env` in the frontend directory.

2. Get an API key:
   - Go to [https://newsapi.org](https://newsapi.org) and obtain an API key.

3. Add the API key to the `.env` file:
   - Open the `.env` file and add the following line: `REACT_APP_API_KEY=YOUR_API_KEY`

   Note: Replace `YOUR_API_KEY` with the actual API key obtained from [https://newsapi.org](https://newsapi.org).

