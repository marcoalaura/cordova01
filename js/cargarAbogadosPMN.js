$(document).ready(function(){
	//getdeails ser� nuestra funci�n para enviar la solicitud ajax
	var getdetails = function(paterno, materno, nombre){
		if (paterno != '') paterno = "/paterno/"+paterno;
		if (materno != '') materno = "/materno/"+materno;
		if (nombre != '') nombre = "/nombre/"+nombre
		;
		//return $.getJSON( "http://localhost/rpa/movil/Service/VAbogados/ListaAbogadosN"+paterno+materno+nombre);
		//return $.getJSON( "http://192.168.3.92/rpa/movil/Service/VAbogados/ListaAbogadosN"+paterno+materno+nombre);
		//return $.getJSON( "http://192.168.1.6/rpa/movil/Service/VAbogados/ListaAbogadosN"+paterno+materno+nombre);
		//return $.getJSON( "http://www.justicia.gob.bo/rpa/movil/Service/VAbogados/ListaAbogadosN"+paterno+materno+nombre);
		// ID 23 - 25/07/2016 - Cambio de Servicio
		return $.getJSON( "http://rpa.justicia.gob.bo/rpa/movil/Service/VAbogados/ListaAbogadosN"+paterno+materno+nombre);
	}

	//al hacer click sobre cualquier elemento que tenga el atributo data-user.....
	$('#Buscar').click(function(e){
		//Detenemos el comportamiento normal del evento click sobre el elemento clicado
		e.preventDefault();
		//Mostramos texto de que la solicitud est� en curso
		$("#output").html("<p>Buscando...</p>");
		//this hace referencia al elemento que ha lanzado el evento click
		//con el m�todo .data('user') obtenemos el valor del atributo data-user de dicho elemento y lo pasamos a la funci�n getdetails definida anteriormente
		//getdetails($('#Cedula').value)
		getdetails($("#Paterno").val(), $("#Materno").val(), $("#Nombres").val())
		.done( function( response ) {
			//done() es ejecutada cu�ndo se recibe la respuesta del servidor. response es el objeto JSON recibido
			if( response.success ) {

				var output = "<div class='alert alert-info'>" + response.data.message + "</div>";	//"<div class='alert alert-info'>" + response.data.message + "</div>";

				output += "<div class='table'><table class='table table-striped table-hover'><thead>" +
							"<th>Paterno</th><th>Materno</th><th>Nombres</th><th width='13%'>Opc.</th></tr>" +
                           	"</thead><tbody>";
				var i = 0;
				var row = "";
				//recorremos cada usuario
				$.each(response.data.abogados, function( key, value ) {
					i += 1;
					if ((i / 2) >> 0) row = 'gris'
					else row = 'blanca';
					output += "<tr class='" + row + "'>";
					//output += "<td>" + value['numero'] + "</td>";
					output += "<td>" + value['paterno'] + "</td>";
					output += "<td>" + value['materno'] + "</td>";
					output += "<td>" + value['nombre'] + "</td>";
					output += "<td><div class='btn-group btn-group-sm'><a class='btn btn-default' alt='Ver' title='Ver' href='consultaAbogado.html?id=" + value['id'] + "'><span class='glyphicon glyphicon-search'></span></a></td></div>";
					output += "</tr>";
				});
				output += "</tbody></table></div>";

				//Actualizamos el HTML del elemento con id="#response-container"
				$("#output").html(output);

			} else {
				//response.success no es true
				var output = "<div class='alert alert-info'>" + response.data.message + "</div>";
				$("#output").html(output);
			}
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			$("#output").html("Algo ha fallado: " +  textStatus);
		});
	 });
});