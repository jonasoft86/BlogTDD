var express = require('express');
var app = express();

//BodyParser
/*Libreria que recibe todo los datos que le pasamos al body
para adjuntarlas al request
*/
var bodyParser = require("body-parser");
const { posts } = require('./endpoints')
const axios = require("axios");
const { authenticate } = require('./middlewares')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//Datos de post, put, patch : Todos dentro de un Json
app.use(bodyParser.json())
 
const postHandlers = posts({ axios });

//app.get('/', postHandlers.get );
app.post('/',  authenticate, postHandlers.post);
/*
app.put('/:id', postHandlers.put);
app.delete('/:id', postHandlers.delete);
*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;