var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('/public'));

var port = process.env.port || 3000

app.listen(port);
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', './public' + '/views');

app.get('/', function(req, res) {
    res.render('home.html', {address: ''});
    });


var endpoints = require('./endpoints')
var oauth = require('./oauth')

endpoints(app);
oauth(app);
    
