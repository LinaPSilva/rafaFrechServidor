var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}

handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/guardar"] = requestHandlers.guardar;
handle["/consultar"] = requestHandlers.consultar;

server.iniciarSer(router.route, handle);