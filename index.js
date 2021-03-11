const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// viewed at http://localhost:8080
app.use(express.static("client"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/*', function (req, res) {
  res.redirect('/');
});

app.listen(PORT, function () {
  console.log(`API app started on port: ${PORT}`);
});