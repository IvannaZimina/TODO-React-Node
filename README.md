# Task
Create a web-app with the task manager system.
(web-app is in progress)

## Stack
### Backend
JavaScript, Node.js, Express.js, REST API, JWT, JSON validation, AJAX, MongoDB.
### Libraries
Mongoose, AJV, crypto, jsonwebtoken, deep-freeze, multer for images.
### Frontend
JavaScript, React, Redux, localStorage via redux-persist, Sass (SCSS).

## Description
System is internal. Only registered users can use the site. 

### Backend
A web-app was created with Node.js application (via express-generator) using MVC. The next modules were created:
-	Server module: contains main app file with base configurations of application and connection to DB;
-	Configuration module: contains configuration of PORT, deepfreeze;
-	Model module: contains models of DB entities in MongoDB - users, tasks;
-	Controller module: functions of interaction with the DB entities (CRUD), access & refresh tokens (JWT) for users using private and public keys;
-	Routes module: built REST API architecture using POST and GET methods, made middleware to check if a user is logged in by access token to enter a personal page.
-	Schemas module: contains JSON validation schemes for validate the data from front.


### Fronetend
A basic React-app was created with Create React App. The following pages were implemented:
Login, Create Account, Update accountCreate Task, ManageTask, List of tasks.

There are some buttons on the top the page to manage the navigation of the site: Login, User information, Logout, Tasks, Home.

There are two roles in the system: administrator and manager.
For both roles, the functionality of updating personal data is available. Each field in can be updated individually.
The administrator can create tasks and delete them. The manager can only read tasks and change the status and due date.
Both roles cannot change the task, but only discuss it in the comments (this functionality is under development).

## Environment
Clone project to your machine. Use npm install to add all dependencies in project and open web-app.

View

## ================== main page
![image](https://user-images.githubusercontent.com/46706194/177044944-ea481390-d34e-4614-b73a-0449f525e17a.png)

## ================== login page
![image](https://user-images.githubusercontent.com/46706194/177044972-8ed7454d-0689-41ef-aa1f-2840ca120f10.png)

## ================== create account page
![image](https://user-images.githubusercontent.com/46706194/177044992-ce3ec377-21d3-4ed9-b6db-a200994c8641.png)

## ================== updation personal information page
![image](https://user-images.githubusercontent.com/46706194/177045023-dba72524-a37b-4764-9df1-570bda6631b3.png)

## ================== managing task for admin page
![image](https://user-images.githubusercontent.com/46706194/177045047-8550e29f-b1b6-428c-80f6-57a085fa8ac8.png)

## ================== creating task page
![image](https://user-images.githubusercontent.com/46706194/177045065-eaba7045-601b-4d0d-8bb6-57bf66985629.png)

## ================== manager page
![image](https://user-images.githubusercontent.com/46706194/177045100-12b27b1b-f227-41a2-a6be-279f58df14ba.png)


