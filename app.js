console.log('hello app');
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
app.set('views', __dirname + '/dist');
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res){
  res.render('index.html');
});
app.use('/', express.static(__dirname + '/dist'));
app.listen(port);
console.log(port);