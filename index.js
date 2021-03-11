const express = require('express');
const path = require('path');

const app = express();
const Port = 3012;

// viewed at http://localhost:8080
app.use(express.static("client"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/*', function (req, res) {
  res.redirect('/');
});

app.listen(Port, function () {
  console.log("API app started");
});