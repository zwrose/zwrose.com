var
  express = require('express'),
  app = express(),
  Poet = require('poet');

var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.init().then(function () {
  // ready to go!
});

app.set( 'view engine', 'jade' );
app.set( 'views', __dirname + '/../views' );
app.use( express.static( __dirname + '/../public' ));
app.use( app.router );

app.get('/', function(req, res) {
  res.send('Hello World! Love from zwrose! Cannot wait to have some beautiful content up here!');
});

app.get( '/blog', function ( req, res ) { res.render( 'index' ) });

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
