# Plop

A Blog CMS that uses SQLite locally for storage. Designed to unintrusively integrate with existing express projects. Ativnos uses Plop for its development blog
See [ativnos.org/dev](http://ativnos.org/dev)

## Installation

For basic installation clone the repository

> git clone git@github.com:evanroman/plop.git 

and install dependencies 

## Configuration 
Plop stores configuration as javascript variables in `setting.js` by default. This allows the deployer to easily implement whatever user management and session system they prefer to use. For example, Ativnos uses MongoDB for user data and Redis for sessions. 


``` js
//Blog title. Used for homepage title and sidebar title 
exports.title = 'New Plop Blog'; 
//short blog description in sidebar
exports.tagline = 'Change the name of the blog in settings js';
//port used by express server
exports.port = 3000;
//Connect framework session salt
exports.sessionSecret = 'abc123';
//number of posts on homepage
exports.postsPerPage = 5;
//user information can be changed here. 
//default password is "plop", default username is "admin"
exports.users = [{username: "admin", name: "New User", passwordhash: "89304d1c03ceefb2200404f72deb3a01cc33ebe19925229223f880d3", bio: "Edit in settings js"}];
//password hashing algorithm
exports.hashalgorithm = 'sha224';

```







