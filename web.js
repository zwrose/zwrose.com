var express = require('express');
var app = express();
var poet = require('poet')(app);
app.use(express.logger());

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.get('/', function(req, res) {
  res.send('Hello World! Love from zwrose! Cannot wait to have some beautiful content up here!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
