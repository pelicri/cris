// Dependencias
var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var aws2 = require('aws-sdk');
var ip = require('ip');

// Parsear o conteudo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  	extended: true
}));

// Configuração da requisição, cabeçalhos, CORS
app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	// Métodos que queremos permitir
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

// GET
app.get('/',function(req,res){
	//var ip = self.location.host;
	var body = '<html>'
				+'	<head>'
				+'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
				+'	</head>'
				+'	<body>'
<<<<<<< HEAD:jotinha.js
				+	'<h1>Servidor: ' + ip.address() + '</h1>'
=======
				+	'<h1>Teste Cristiano 2020 - Servidor 1</h1>'
>>>>>>> cf865a8f0895df74f1054247f7266574dc7e832c:server1.js
				+'	</body>'
			    +'</html>';
	console.log(ip.address());
	res.writeHead(200,{"Content-Type" : "text/html"});
	res.write(body);
	res.end();
});

app.listen(80,function(){
	console.log("Conectado e escutando na porta 8080");
});
