var express = require('express');
var app = express();

app.use(express.static('/public'));


app.listen(3000);
app.engine('html', require('ejs').renderFile);

app.set('views', './public' + '/views');

app.get('/', function(req, res) {
    res.render('home.html');
    });


var endpoints = require('./endpoints')

endpoints(app);
    
