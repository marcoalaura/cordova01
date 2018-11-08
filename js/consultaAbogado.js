$(document).ready(function(){

	$.urlParam = function(name) {
		var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
		return results[1] || 0;
	}

	//getdeails ser� nuestra funci�n para enviar la solicitud ajax
	var getdetails = function(id){
		//return $.getJSON( "http://localhost/rpa/movil/Service/VAbogados/Abogado/id/" + id);
		//return $.getJSON( "http://192.168.3.92/rpa/movil/Service/VAbogados/Abogado/id/" + id);
		//return $.getJSON( "http://192.168.1.6/rpa/movil/Service/VAbogados/Abogado/id/" + id);
		// ID 23 - 25/07/2016 - Cambio de Servicio
		return $.getJSON( "http://rpa.justicia.gob.bo/rpa/movil/Service/VAbogados/Abogado/id/" + id);
		//return $.getJSON( "http://www.justicia.gob.bo/rpa/movil/Service/VAbogados/Abogado/id/" + id);
	}

	//Mostramos texto de que la solicitud est� en curso
	$("#output").html("<p>Buscando...</p>");
	//this hace referencia al elemento que ha lanzado el evento click
	//con el m�todo .data('user') obtenemos el valor del atributo data-user de dicho elemento y lo pasamos a la funci�n getdetails definida anteriormente
	//getdetails($.get('id'))
	//getdetails('27664')
	//getdetails($.get('id'))
	getdetails($.urlParam('id'))
	//getdetails($.url(unescape(window.location.href)).param('id'))
	.done( function( response ) {
		//done() es ejecutada cu�ndo se recibe la respuesta del servidor. response es el objeto JSON recibido
		if( response.success ) {

			var output = "";
			//recorremos cada usuario
			$.each(response.data.abogado, function( key, value ) {
				output += "<div class='panel panel-info'><div class='panel-heading'><h3 class='panel-title'>" + value['paterno'] + " " + value['materno'] + " " + value['nombre'] + " " + "</h3></div>";
				output += "<div class='panel-body'>";
				if (value['sexo'] == 1)
					output += "<img style='height:auto;max-width:400px;width:100%' src='http://rpa.justicia.gob.bo/rpa/app/img/foto/" + value['cedula'] + ".jpg' alt='Fotografia no encontrada' onError=this.src='img/businessman.png' />";
				else
					output += "<img style='height:auto;max-width:400px;width:100%' src='http://rpa.justicia.gob.bo/rpa/app/img/foto/" + value['cedula'] + ".jpg' alt='Fotografia no encontrada' onError=this.src='img/businesswoman.png' />";
				output += "<div class='well' style='float: left;height:auto;max-width:400px;width:100%'>";
				output += "<ul class='nav nav-list'>";
				output += "<li><i class='glyphicon glyphicon-star'> </i> <b>CODIGO RPA: </b>" + value['numero'] + "</li>";
				output += "<li><i class='glyphicon glyphicon-tag'> </i> <b>CEDULA DE IDENTIDAD: </b>" + value['cedula'] + value['cedula_exp'] + "</li>";
				output += "<li><i class='glyphicon glyphicon-map-marker'> </i> <b>DIRECCION OFICINA: </b>" + value['oficinadireccion'] + "</li>";
				output += "<li><i class='glyphicon glyphicon-phone'> </i> <b>CELULAR: </b><span><a href='tel:" + value['celular'] + "'>" + value['celular'] + "</a></span></li>";
				output += "<li><i class='glyphicon glyphicon-earphone'> </i> <b>TELEFONO OFICINA: </b><span><a href='tel:" + value['oficinatelefono'] + "'>" + value['oficinatelefono'] + "</a></span></li>";
				output += "<li><i class='glyphicon glyphicon-book'> </i> <b>UNIV. DE LICENCIATURA: </b>" + value['universidad'] + "</li>";
				output += "<li><i class='glyphicon glyphicon-calendar'> </i> <b>FECHA DE REGISTRO (RPA): </b>" + value['fecharegistro'] + "</li>";
				output += "<li class='divider'></li>";
				output += "</ul>";
				output += "<hr>";
				output += "<h6 align='justify'><b>Nota: </b><i>La presente informaci&oacute;n no constituye una certificaci&oacute;n y/o acreditaci&oacute;n legal alguna para abogadas, abogados o terceras personas, y solo deber&aacute; ser considerada de manera referencial.</i></h6>";
                output += "<h6 align='justify'><i>Las certificaciones que acrediten el registro y matriculaci&oacute;n de abogados y abogadas, deber&aacute;n ser recabadas en oficinas del Registro P&uacute;blico de la Abogac&iacute;a dependiente del Ministerio de Justicia.</i></h6>";
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