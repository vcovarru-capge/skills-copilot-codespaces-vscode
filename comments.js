// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;

// Set up the server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Create a route for the root
app.get('/', (req, res) => {
  res.render('index');
});

// Create a route for the comments
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  const comments = fs.readFileSync('comments.json');
  const commentsArray = JSON.parse(comments);
  commentsArray.push({ name, comment });
  fs.writeFileSync('comments.json', JSON.stringify(commentsArray));
  res.redirect('/comments');
});

// Create a route for the comments
app.get('/comments', (req, res) => {
  const comments = fs.readFileSync('comments.json');
  const commentsArray = JSON.parse(comments);
  res.render('comments', { comments: commentsArray });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});