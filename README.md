# ece-webtech-2023-fall-gr03-06
Webtech Project: Third Lab
ECE ING4 grp3

## Introduction

This readme contains the documentation over the lab3 done for the webtech class.
This is a Node.js and Express project. It includes an App localhost web server, with REST API. 



## Before starting

1. Install **Node.js** by referring the [prerequisites](../01.prerequisite/index.md#nodejs-installation).
2. [Install Express](https://www.npmjs.com/package/express#installation)


## Running/usage instructions

After downloading the folder, open the **Terminal** and use the "cd" command to acces the folder.
Once your are inside the folder, lauch the localhost server using this command: 

```$ npm start ```

The web server is now running on your local machine, to acces it:
Open your web browser and copy this url: "http://localhost:8080"

GET API :
- GET `/articles` - list all articles
- GET `/articles/:articleId` - get an article by ID
- GET `/articles/:articleId/comments` - get all comments of the article with `articleId`
- GET `/articles/:articleId/comments/:commentId` - get a comment with `commentId` of the article with `articleId`

POST API : 
- POST `/articles` - add a new article
- POST `/articles/:articleId/comments` - add a new comment to a specific article with `articleId`


## Authors

Paul PERENNEZ--ZELUS
Sébastien TRAN
Hugo BENEDIT