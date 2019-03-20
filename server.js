var express = require('express');
var path = require('path');

var app = express();

var tables = require('./data/tableData.js');
var waitlist = require('./data/waitListData.js');

// console.log(tables);
// console.log(waitlist);

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, './public/tables.html'));
});

app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, './public/reserve.html'));
});

app.get('/api/tables', function (request, response) {
    response.json(tables);
});

app.get('/api/waitlist', function (request, response) {
    response.json(waitlist);
});

app.post('/api/reserve', function (request, response) {
    var userInfo = request.body;
    if (tables.length >= 5) {
        waitlist.push(userInfo);
    } else {
        tables.push(userInfo);
    }
    response.json(request.body);
});

app.listen(PORT, function () {
    console.log('App is listening at your port: ', PORT);
});