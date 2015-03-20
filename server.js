var http = require('http');
var url = require('url');

function iniciarSer (route, handle) {
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("peticion para " + pathname + " recibida.");
		var objeto = {};

		request.setEncoding("utf-8");

		request.addListener("data", function(trozoPosteado){
			objeto = JSON.parse(trozoPosteado);
			console.log(objeto);
			console.log("Recibido trozo POST '"+trozoPosteado+"'.");
		});

		request.addListener("end", function(){
			route(handle, pathname,response, objeto);
		});

	}

	http.createServer(onRequest).listen(8888);
	console.log("servidor iniciado");
}

exports.iniciarSer = iniciarSer;