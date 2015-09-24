var express = require('express')
var serveStatic = require('serve-static')
var open = require('open');

var app = express()

app.use(serveStatic(__dirname + '/'))
app.listen(3000)

open('http://localhost:3000');
