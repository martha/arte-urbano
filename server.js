'use strict';

const fs = require('fs');
const images_dir = './images/';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Error handler. Must be last function added with app.use
app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send('Oh noes');
});

app.get('/', (request, response) => {
  response.render('main.html');
});

app.get('/coords', (request, response) => {
  var coords = [];
  fs.readdir(images_dir, (err, files) => {
    var lat_lon_re = /^(-?\d+\.?\d*)_(-?\d+\.?\d*)\.jpg$/;
    files.forEach(file => {
      if (lat_lon_re.test(file)) {
        coords.push(file);
      }
    });
    response.json(coords);
  });
});

app.get('/images/:filename', (request, response) => {
  var filename = request.params.filename;
  console.log(fs.realpath(images_dir + filename));
  response.sendFile(fs.realpath(images_dir + filename));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err);
  }

  console.log(`server listening on ${port}`);
})
