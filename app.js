const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
// Load the full build.
const _ = require('lodash');

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + '...';
  }
};

app.set('view engine', 'ejs');

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static('public'));

// URL & Options
const DB = 'blogDB';
const url = `mongodb://localhost:27017/${DB}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Create database
mongoose.connect(url, options);

// Schema
const postSchema = {
  title: String,
  content: String,
};

// Mongoose model, collections
const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('home', {
      startingContent: homeStartingContent,
      posts: posts,
      truncate: truncateString,
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    aboutContent: aboutContent,
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent: contactContent,
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const { postTitle, postBody } = req.body;

  const post = new Post({
    title: postTitle,
    content: postBody,
  });

  post.save((err) => {
    if (!err) {
      res.redirect('/');
    }
  });
});

// Route parameters
app.get('/posts/:postId', (req, res) => {
  const requestedPostId = _.lowerCase(req.params.postId);

  storedTitle = _.lowerCase(post.title);

  Post.findOne({ _id: requestedPostId }, (req, res) => {
    res.render('post', {
      title: post.title,
      content: post.content,
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
