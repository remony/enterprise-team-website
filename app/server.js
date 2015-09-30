/*
			File: server.js

			Description: This file is a nodejs script which runs a file server to host the website on port 3000

			usage: npm start  OR node server.js

*/
var express = require('express')
var serveStatic = require('serve-static')
var open = require('open');

var app = express()

app.use(serveStatic(__dirname + '/'))
app.listen(3000)

// Opens default browser and loads page
open('http://localhost:3000');