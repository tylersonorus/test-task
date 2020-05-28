const express = require('express');
const mustacheExpress = require('mustache-express');
const http = require('http');
const router = require("./routers/index");
const path = require("path")  

const app = express();
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views/'));;
app.use(express.static('public'));

app.use(express.json());
app.use('/', router);

var httpServer = http.createServer(app);

httpServer.listen(1234, function () {
    console.log("Server started")
});


