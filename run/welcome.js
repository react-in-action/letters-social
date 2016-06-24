const { blue, red, green, yellow } = require('chalk');
const moment = require('moment');
const letters = blue('L') + red('e') + yellow('t') + blue('t')
                + green('e') + red('r') + yellow('s');
const today = new Date();
console.log(`
  ${blue('=========================== Welcome! =============================')}

  If you're here, you're probably reading React in Action by, well,
  me (@markthethomas everywhere). I hope you're enjoying learning about React
  so far. You've just installed the tools you'll need for this project. We'll be
  working through each part of the project as we move through it in the book, but
  you can find the complete project here for reference. If you have any questions
  or thoughts, feel free to reach out to me @markthethomas pretty much anywhere.

  - Mark


  ${green('How to get started:')}
  - install project using npm install
  - read welcome letter from Letters (see below)
  - read along in React in Action

  ${red('=========================== Welcome to Letters ====================')}

  ${letters}, Inc.
  Engineering
  TechTown, Anywhere

  ---------------

  ${moment(today).format('dddd, MMMM Do YYYY')}

  Hello!

  Welcome to Letters! As a new employee, you're going to be working with the latest
  and greatest technologies as you learn the ropes of our company. We were very
  impressed with your comment box project and are going to get you set up on a
  new project: Letters Social™. Letters Social™ is a groundbreaking new social experience.
  You can comment, you can post; it's like nothing you've ever seen before.

  For this project, you'll be using React. React, you might remember, is a hot new
  technology for building user interfaces. You've been learning about it and at
  this point you can take advantage of what you know about data in React, parent
  and child components, JSX, and now lifecyle methods.

  When you're done, your project should satisfy the following requirements:

  ${green('Requirements:')}
  - [${green('√')}] display posts and comments from the Letters Social™ API
  - [${green('√')}] create new posts for the Letters Social™ API
  - [${green('√')}] each post should have display likes, comments, and crawled links if available
  - [${green('√')}] filter posts by category
  - [${green('√')}] display metadata about a post; number of comments, likes, etc.
  - [${green('√')}] hide and show comments
  - [${green('√')}] update the like count for posts and comments

  Projects in future chapters will add more to the Letters Social experience, including:

  User profile:
  - [${green('√')}] display user profile info
  - [${green('√')}] allow users to edit their profile

  Search box typeahead:
  - [${green('√')}] allow users to search posts and comments
  - [${green('√')}] display search results in-line
  - [${green('√')}] display search results in a separate page

  User signup, login, and account management:
  - [${green('√')}] allow users to sign up
  - [${green('√')}] allow users to log in
  - [${green('√')}] allow users to manage their settings

  Best,

  The Letters team


  ==================================================================
  `);
