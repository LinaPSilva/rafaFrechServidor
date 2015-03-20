var mysql = require('mysql');

var connection;
function conectar(){
	console.log('conectando');
   connection = mysql.createConnection({
      user: 'root',
      password: '1234',
      host: 'localhost',
      port: 3306,
      database: 'rafafrench'
   });
   connection.connect(function(error){
      if(error){
       console.log(error.message);
       throw error;
    }else{
      console.log('Conexion correcta.');
   }
});
   return connection;
} //fin de metodo conectar
//----------------------------------------------------------------------------------------------------------

function desconectar(){
   connection.end(function(error){
   if (error) {
      console.log(error.message);
   } else{
      console.log('desconectado');
   }
});

} //fin de metodo desconectar
//----------------------------------------------------------------------------------------------------------

function guardarBd(response, objeto){
   var conex = conectar();
   /*
   conex.query('INSERT INTO pedido(codigo, id_vendedor, id_mesa, subtotal, iva, propina, total) VALUES (?, ?, ?, ?, ?, ?, ?)', [objeto.codigo, objeto.id_vendedor, objeto.id_mesa, objeto.subtotal, objeto.iva, objeto.propina, objeto.total], function(error){
   if (error) {
      console.log("Error al insertar "+error.message);
   } else{
      console.log('Pedido Guardado.');
   }
   });

   conex.query('INSERT INTO detalle_pedido(codigo_pedido, codigo_plato, cantidad, subtotal) VALUES (?, ?, ?, ?)', [objeto.codigo, objeto.codigo_plato, objeto.cantidad, objeto.subtotal], function(error){
   if (error) {
      console.log("Error al insertar"+ error.message);
   } else{
      console.log('Detalles Del Plato; Guardado.');
   }

   });
*/
   conex.query('INSERT INTO plato(id, nombre, descripcion) VALUES (?, ?, ?)', [objeto.codigo, objeto.nombre, objeto.descripcion], function(error){
   if (error) {
      console.log("Error al insertar "+error.message);
   } else{
      console.log('Pedido Guardado.');
   }
   });
} //fin de metodo guardar
//----------------------------------------------------------------------------------------------------------

function consultarBd(response, objeto){
   var conex = conectar();
   var json = {};
   console.log(response);
  /* conex.query('SELECT codigo, id_vendedor, id_mesa, subtotal, iva, propina, total FROM pedido WHERE codigo = ?', [1], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
            console.log(resultado[0].subtotal + ' ' + resultado[0].total + ' / ' + resultado[0].propina);
         }else{
            console.log('Registro no encontrado');
         }
      }
   }
);*/
   conex.query('SELECT codigo, nombre_plato, vlr_costo, vlr_venta, fecha_ingreso, estado FROM plato', function(error, result){
      if(error){
         throw error;
      }else{
         
         if(result.length > 0){
            console.log(result[0].nombre + ' ' + result[0].descripcion);
            json = JSON.stringify(result);

          //console.log(json);
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(json);
            response.end();
         }else{
            console.log('Registro no encontrado');
         }
      }
   }

);
   
} //fin de metodo consultar
//----------------------------------------------------------------------------------------------------------

exports.guardarBd = guardarBd;
exports.consultarBd = consultarBd;