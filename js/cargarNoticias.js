$(document).ready(function(){
	//getdeails ser� nuestra funci�n para enviar la solicitud ajax
	var getdetails = function(id){
		//return $.getJSON( "http://localhost/rpa/movil/Service/News/Articles");
		//return $.getJSON( "http://192.168.3.92/rpa/movil/Service/News/Articles");
		//return $.getJSON( "http://192.168.1.6/rpa/movil/Service/News/Articles");
		// ID 23 - 25/07/2016 - Cambio de Servicio
		return $.getJSON( "http://rpa.justicia.gob.bo/rpa/movil/Service/News/Articles");
		//return $.getJSON( "http://www.justicia.gob.bo/rpa/movil/Service/News/Articles");
	}

	//Mostramos texto de que la solicitud est� en curso
	$("#output").html("<p>Buscando...</p>");
	//this hace referencia al elemento que ha lanzado el evento click
	//con el m�todo .data('user') obtenemos el valor del atributo data-user de dicho elemento y lo pasamos a la funci�n getdetails definida anteriormente
	getdetails($(this).data('new'))
	.done( function( response ) {
		//done() es ejecutada cu�ndo se recibe la respuesta del servidor. response es el objeto JSON recibido
		if( response.success ) {

			var output = "";	//"<div class='alert alert-info'>" + response.data.message + "</div>";
			//recorremos cada usuario
			$.each(response.data.news, function( key, value ) {
				output += "<div class='panel panel-info'><div class='panel-heading'><h3 class='panel-title'>" + value['NewTitle'] + "</h3></div>";
				output += "<div class='panel-body'>";
				output += value['NewDescription'];
				output += "</div>";
				output += "</div></div>";
			});

			//Actualizamos el HTML del elemento con id="#response-container"
			$("#output").html(output);

		} else {
			//response.success no es true
			$("#output").html('No ha habido suerte: ' + response.data.message);
		}
	})
	.fail(function( jqXHR, textStatus, errorThrown ) {
		$("#output").html("Algo ha fallado: " +  textStatus);
	});
});