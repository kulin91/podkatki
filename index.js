const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.static("client"));

app.get('/robots.txt', function (req, res) {
  res.sendFile(path.join(__dirname + '/metadata/robots.txt'));
});

app.get('/sitemap.xml', function (req, res) {
  res.sendFile(path.join(__dirname + '/metadata/sitemap.xml'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/*', function (req, res) {
  res.redirect('/');
});

app.listen(PORT, function () {
  console.log(`API app started on port: ${PORT}`);
});