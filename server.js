var express = require('express');
var multer = require('multer');
var sizeOf   =  require( 'image-size' );
var fs = require('fs');

require('string.prototype.startswith');
var exec = require('exec');
var app     = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var upload = multer( { dest: 'uploads/' } );

var port = 3000

http.listen(port, function(){
  console.log('listening on port: ' + port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
});

app.post('/upload', upload.single( 'file' ), function( req, res, next ) {

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

	// exec('python predict.py uploads/' + req.file.filename + ' > uploads/' + req.file.filename + '.log',function(err,stdout,stderr){
 //      console.log(err,stdout,stderr);
 //      var filename = './uploads/' + req.file.filename + '.log';
 //      var content = "";
 //      var data = fs.readFileSync(filename,'utf-8');
 //      var top = data.split('\n');
 //      // var topResults = top[0] + '<br>' + top[1];
 //      var topResults = top[0];
 //      io.emit('classified',topResults);

 // 	})

  return res.status( 200 ).send( req.file );
  
});


console.log('Amazing server running on port:' + port);





