var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var sizeOf   =  require( 'image-size' );
var fs = require('fs');

// credentials;
var USER = 'user';
var PASSWORD = 'cannonau';

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


require('string.prototype.startswith');
var exec = require('exec');
var app     = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var upload = multer( { dest: 'uploads/' } );



http.listen(3000, function(){
  console.log('listening on *:3000');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username == USER && password == PASSWORD)
    {
      done(null, {user: username});
    }
    else
    {
      done(null, false);
    }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
});

app.get('/home', function(req, res) {
  if(req.isAuthenticated())
    res.sendfile('./public/views/home.html');
  else
    res.sendfile('./public/views/index.html');
});

app.post('/login', passport.authenticate('local', 
{ 
  successRedirect: '/home',
  failureRedirect: '/' 
}));

app.post('/upload_content', upload.single( 'file' ), function( req, res, next ) {

	if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }

  var dimensions = sizeOf( req.file.path );

  if ( ( dimensions.width < 320) || ( dimensions.height < 240 ) ) {
    return res.status( 422 ).json( {
      error : 'The image must be at least 320 x 240px'
    } );
  }
  return res.status( 200 ).send( req.file );
  
});

app.post('/upload_style', upload.single( 'file' ), function( req, res, next ) {

  if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }

  var dimensions = sizeOf( req.file.path );

  if ( ( dimensions.width < 320) || ( dimensions.height < 240 ) ) {
    return res.status( 422 ).json( {
      error : 'The image must be at least 320 x 240px'
    } );
  }
  return res.status( 200 ).send( req.file );
});

app.post('/start', function(req, res, next) {
  io.emit('starting');
  return res.status( 200 );
});

io.on('connection', function(socket){
    console.log('receiving from client...');
  socket.on('uploading', function(response){
    console.log('yes, it is uploading the images');

    exec('python copy_images.py --content "./uploads/' + response.content + '" --style "./uploads/' + response.style + '"', function(err, stdout, stderr){
      // console.log(err,stdout,stderr);
      console.log("copied images");
    });

    exec('python ./segmentation/test.py --dataroot .segmentation/datasets/pspt --name pspt_pix2pix --model pix2pix --which_model_netG unet_256 --which_direction AtoB --dataset_mode aligned --norm batch');


      // exec('python predict.py uploads/' + req.file.filename + ' > uploads/' + req.file.filename + '.log',function(err,stdout,stderr){
 //      console.log(err,stdout,stderr);
 //      var filename = './uploads/' + req.file.filename + '.log';
 //      var content = "";
 //      var data = fs.readFileSync(filename,'utf-8');
 //      var top = data.split('\n');
 //      // var topResults = top[0] + '<br>' + top[1];
 //      var topResults = top[0] + '--' + top[1];
 //      io.emit('classified',topResults);

 //   })
  });
});





