var exec = require("child_process").exec;
var modelo = require('./modelo');
function iniciar ( response) {
	console.log("Manipulador de petición 'iniciar' fue llamado.");
	exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(stdout);
		response.end();
	});
}
function guardar(response, objeto){
   modelo.guardarBd(response ,objeto);
}
function consultar(response, objeto){
	console.log(response);
   var resultado = (function(error, result){
    var datos = modelo.consultarBd(response, objeto);
      
   });   
   resultado();
}
exports.iniciar = iniciar;
exports.guardar = guardar;
exports.consultar = consultar;