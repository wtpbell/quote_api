# Express.js Quote API

---

## Table of Contents

---

- General Information
- Technologies
- Learn from the project
- Using the App

---

### General Information

---

This is one of the Codecademy challenge project entitled Quote API, wherein I need to design a small web app using Express.js that allows users to create, read, updae and delete (CRUD) quotes about computers, coding and technology.

The following requirements have to be met:

- the server should listen on port 4001
- the api should have a GET ==/api/quotes/random== route that sends back a random quote from the quotes data
- the api should have a GET ==api/quotes== route that will return different results depending below conditions
  - if the request has no query params, it returns all available quotes
  - if there is a query strinng with a ==person== attribute, it should return all the quotes attributed to the specified person
  - if there are no quotes for the requested person, an empty array should be returned
- the api should have a POST ==/api/quotes== route for adding new quotes with two properties: ==quote== with the quote text itself, and ==person== with the person who is crediting with saying the quote
- extra challenges:
✅ include a **PUT** route for updating quotes
✅ include a **DELETE** route for deleting quotes
✅ include the year of each quote

---

### Technologies

---
I wrote thhis Express.js web app using the followinng technologies:

- HTML
- CSS
- JavaScript
- Express.js
- Node JS

---

### Learn from the project

---

This project didn't guide me step-by-step. It provided a series of open-ended requirements which describe the project I'll be building

- I learned how to structure the file system by separating them into different folders for scaling up and easily debugging. Definitely my approach still has rooms to improve. If you read this and have suggestions for this topic, please feel free to comment

- In this project, I need to search whether id or quote exists. In order to repeat these coding lines so many times. I created help functions **findQuoteById** and **findIndexByCode** to reuse them in different files. I also created middleware function **validateQuote** to serve the same purpose and validate the data before **PUT**, **POST** and **DELETE**

---

### Using the App

---

This app can be used by cloning the project onto your computer, navigating to the project root via the command line, and running node server.js
