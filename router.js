function route (handle, pathname,response, objeto) {
	console.log("A punto de rutear una peticion para "+ pathname);
	if (typeof handle[pathname] === 'function') {
		console.log('Desde funcion route' + response);
		handle[pathname](response, objeto);
	} else{
		console.log("No hay manipulador de peticiones para " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 No Encontrado");
		response.end();
	}
}

exports.route = route;