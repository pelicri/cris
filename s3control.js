// Dependencias
var AWS = require('aws-sdk');
var express = require('express'); 
var app = express();

var bodyParser = require('body-parser');

// Parsear o conteudo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// AWS
var s3 = new AWS.S3();

// Configuração da requisição, cabeçalhos, etc. CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Métodos que queremos permitir
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())

// GET
app.get('/criarbucket',function(req,res){
	
    var params = {
        Bucket: req.body.bucketname   
    };
    s3.createBucket(params, function(err, data) {
        if (err) {
          returnS3(err);
          console.log(err);
        } else {
          returnS3(data);
          console.log(data);
        }
    });

    var returnS3 = function(result){
        
        result = JSON.stringify(result);
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	result
  		    +'	</body>'
  	      +'</html>';
        console.log(result);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});


// GET
app.get('/criararquivo',function(req,res){
	
    var dstBucket = req.body.bucketname;
    var dstKey = 'arquivo.txt';
    var arquivo = 'Arquivo TXT criado com sucesso!';

    s3.putObject({
        Bucket: dstBucket,
        Key: dstKey,
        Body: arquivo
    },
    function(err, data) {
        if (err) {
            returnS3(err);
            console.log(err);
        } else {
            returnS3(data);
            console.log(data);
        }
    });

    var returnS3 = function(result){
        result = JSON.stringify(result);
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	result
  		    +'	</body>'
  	         +'</html>';
        console.log(result);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});



// GET
app.get('/deletararquivo',function(req,res){

    var params = {
      Bucket: req.body.bucketname,
      Key: 'arquivo.txt'
    };
    s3.deleteObject(params, function(err, data) {
        if (err) {
            returnS3(err);
            console.log(err);
        } else {
            returnS3(data);
            console.log(data);
        }
    });

    var returnS3 = function(result){
        result = JSON.stringify(result);
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	result
  		    +'	</body>'
  	         +'</html>';
        console.log(result);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});


// GET
app.get('/deletarbucket',function(req,res){
	
    var params = {
        Bucket: req.body.bucketname,
    };
    s3.deleteBucket(params, function(err, data) {
        if (err) {
          returnS3(err);
            console.log(err);
        } else {
          returnS3(data);
          console.log(data);
        }
    });

    var returnS3 = function(result){
        result = JSON.stringify(result);
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	result
  		    +'	</body>'
  	         +'</html>';
        console.log(result);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});


// GET
app.get('/teste',function(req,res){

        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    + req.body.nome
  		    +'	</body>'
  	         +'</html>';
        console.log(req.body);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();

	
});

app.listen(80,function(){
  console.log("Conectado e escutando na porta 80");
});
