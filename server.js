var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(session({
    secret: 'survey',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/process', function(req, res) {
    req.session.survey = req.body;

    res.redirect('/results');
});

app.get('/results', function(req, res) {
    var context = { 'data': req.session.survey };
    res.render('result', {context: context });
});


app.listen(8000, function(){
    console.log("Port 8000 working");
});