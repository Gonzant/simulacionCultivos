/* $(function () { $('#collapseThree').collapse('toggle')});
   $(function () { $('#collapseOne').collapse('hide')});
  */ 
function validaCamposVacios(){
	
	var errores="<strong> Verifique los siguientes campos: </strong>" 
	var datosOk=false;
	var anioDesdeNoVacio=parseInt($('#desdeAnioSimulacion').val().length) != 0;
	var anioHastaNoVacio=parseInt($('#hastaAnioSimulacion').val().length) != 0;
	var cultivoSeleccionado = ($('input[name=cultivo]:checked').attr('value')==='SB') || ($('input[name=cultivo]:checked').attr('value')==='MZ');
	var fertilizaSeleccionado = ($('input[name=fertilizacion]:checked').attr('value')==='1');
	var diasS, diasS1, diasS2, cantidadS, cantidadS1, cantidadS2;
	var fertiliza1Seleccionado = ($('input[name=fertilizacionO]:checked').attr('value')==='1');
	var fertiliza2Seleccionado = ($('input[name=fertilizacionO]:checked').attr('value')==='2');
	var nombreEscenarioNoVacio = $('#inNombreEscenario').val().length !=0; 
	diasS1 =parseInt($('#diasDespuesSiembraAp1I').val().length) != 0;
	diasS2 =parseInt($('#diasDespuesSiembraAp2I').val().length) != 0;
	if(anioDesdeNoVacio && anioHastaNoVacio){ 		
		datosOk=true;		
	}else{		
		errores = errores + "<p>Periodo de simulacion</p>";		
		datosOk=false;
	}
	if(cultivoSeleccionado){ 		
		datosOk=true;		
	}else{		
		errores = errores + "<p>Debe seleccionar un cultivo<p>";		
		datosOk=false;
	}
	if(fertilizaSeleccionado){//fertiliza Siembra seleccionado
		diasS=parseInt($('#diasDespuesSiembraI').val().length) != 0;
		cantidadS=parseInt($('#cantidadFertilizanteI').val().length) != 0;
		if((parseInt($('#diasDespuesSiembraI').val()) >= 0 && parseInt($('#diasDespuesSiembraI').val()) <=150) === false || ((parseInt($('#cantidadFertilizanteI').val()) >= 0) && parseInt(($('#cantidadFertilizanteI').val())) <= 100==false)){
			errores = errores + "<p> Fertilizacion a la siembra</p>";
			datosOk=false;
		}else{
			datosOk= true;
		}
	}
	if(fertiliza1Seleccionado){//fertiliza 1 ap seleccionado
		if((parseInt($('#diasDespuesSiembraAp1I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp1I').val()) <=150) === false || ((parseInt($('#cantidadFertilizanteAp1I').val()) >= 0) && parseInt(($('#cantidadFertilizanteAp1I').val())) <= 100==false)){
			errores = errores + "<p> Otras fertilizaciones (1 aplicacion)</p>";
			datosOk=false;
		}else{
			datosOk= true;
		}
	}
	
	if(fertiliza2Seleccionado){//fertiliza 2 ap seleccionado
		if((parseInt($('#diasDespuesSiembraAp2I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp2I').val()) <=150) === false || ((parseInt($('#cantidadFertilizanteAp2I').val()) >= 0) && parseInt(($('#cantidadFertilizanteAp2I').val())) <= 100==false)){
			errores = errores + "<p> Otras fertilizaciones (2 aplicaciones)</p>";
			datosOk=false;
		}else{
			datosOk= true;
		}
	}
	if(nombreEscenarioNoVacio ===false){
		errores = errores + "<p> Nombre del escenario </p>";
		datosOk=false;
	}
	if(errores!="<strong> Verifique los siguientes campos: </strong>"){
		var div= "<div class=\"alert alert-warning\"><a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" + errores + "</div>";
		/*
		<div class="alert alert-warning">
		  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>		  
	</div>
		*/
		//document.getElementById("msgErrores").className = "alert alert-warning";
		$("#msgErrores" ).html(div);
		$('body,html').animate({scrollTop : 0}, 500);
	}
	return datosOk;
}
  
  
//Boton agregar escenario
function agregarEscenario(boton){
	var cultivo = document.getElementById('rdCult');	
	var escenario = new Object();	
}

//DATETIMEPICKER
  

$(function() {
	$('#datetimepicker4').datetimepicker({
		pickTime: false,
		todayHighlight: true,
		autoclose: true,
    });
	
	$('#datetimepicker4').datetimepicker('setDate', new Date());
});
 
//FERTILIZACION

function OnChangeRadioFertilizacion (radio) {
	
  var el = document.getElementById('fertilizacionSiembra');
  
  var diasSiembra = document.getElementById('diasDespuesSiembraI');
  var cantS = document.getElementById('cantidadFertilizanteI');
  
  
  if(radio.value === '0'){
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
	
	diasSiembra.removeAttribute("required");
	diasSiembra.value = "";
	
	cantS.removeAttribute("required");
	cantS.value = "";
	//quito estilos a dias despues siembra
	document.getElementById("diasDespuesSiembraD").className = "form-group";
	document.getElementById("errordiasDespuesSiembra").innerHTML = ' ';
	document.getElementById("diasDespuesSiembraS").className = " ";
	
	//quito estilos de cantidad
	document.getElementById("cantidadFertilizanteD").className = "form-group";
	document.getElementById("errorCantidadFertilizante").innerHTML = ' ';
	document.getElementById("cantidadFertilizanteS").className = " ";
  }
  else{
	document.getElementById("diasDespuesSiembra").className = " ";
	el.style.display = (el.style.display == 'inline') ? 'block' : 'inline'; 	
  }	
}


function OnChangeRadioFertilizacionOtras (radio) {
  var el = document.getElementById('fertilizacionOtrasAplicaciones');
  
  var el1 = document.getElementById('fertilizacionOtrasAplicaciones1');
  var el2 = document.getElementById('fertilizacionOtrasAplicaciones2');
  
  var diasSiembra1 = document.getElementById('diasDespuesSiembraAp1I');
  var diasSiembra2 = document.getElementById('diasDespuesSiembraAp2I');
  
  var cantS1 = document.getElementById('cantidadFertilizanteAp1I');
  var cantS2 = document.getElementById('cantidadFertilizanteAp2I');
  
  if(radio.value === '0'){
	//no fertiliza  
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
	el1.style.display = (el1.style.display == 'inline') ? 'block' : 'inline'; 
	el2.style.display = (el2.style.display == 'inline') ? 'block' : 'inline'; 
	
	diasSiembra1.removeAttribute("required");
	cantS1.removeAttribute("required");	
	diasSiembra1.value = "";
	cantS1.value = "";
		
	diasSiembra2.removeAttribute("required");
	cantS2.removeAttribute("required");
	
	//quito estilos a dias despues siembra
	document.getElementById("diasDespuesSiembraAp1D").className = "form-group";
	document.getElementById("errordiasDespuesSiembraAp1").innerHTML = ' ';
	document.getElementById("diasDespuesSiembraAp1S").className = " ";
	document.getElementById("diasDespuesSiembraAp2D").className = "form-group";
	document.getElementById("errordiasDespuesSiembraAp2").innerHTML = ' ';
	document.getElementById("diasDespuesSiembraAp2S").className = " ";
	
	//quito estilos de cantidad
	document.getElementById("cantidadFertilizanteAp1D").className = "form-group";
	document.getElementById("errorCantidadFertilizanteAp1").innerHTML = ' ';
	document.getElementById("cantidadFertilizanteAp1S").className = " ";
	document.getElementById("cantidadFertilizanteAp2D").className = "form-group";
	document.getElementById("errorCantidadFertilizanteAp2").innerHTML = ' ';
	document.getElementById("cantidadFertilizanteAp2S").className = " ";
  
  }else{
	if(radio.value === '1'){
		el.style.display = (el.style.display == 'inline') ? 'block' : 'inline'; 
		el1.style.display = (el1.style.display == 'inline') ? 'block' : 'inline'; 
		el2.style.display = (el2.style.display == 'none') ? 'block' : 'none'; 
		
		diasSiembra2.value = "";
		cantS2.value = "";
		
		//quito estilos a dias despues siembra
		document.getElementById("diasDespuesSiembraAp2D").className = "form-group";
		document.getElementById("errordiasDespuesSiembraAp2").innerHTML = ' ';
		document.getElementById("diasDespuesSiembraAp2S").className = " ";
		
		//quito estilos de cantidad
		document.getElementById("cantidadFertilizanteAp2D").className = "form-group";
		document.getElementById("errorCantidadFertilizanteAp2").innerHTML = ' ';
		document.getElementById("cantidadFertilizanteAp2S").className = " ";
		
	} else{	
		el.style.display = (el.style.display == 'inline') ? 'block' : 'inline'; 
		el2.style.display = (el2.style.display == 'inline') ? 'block' : 'inline'; 
	}	
  }	
}
	
	
$(function() { //valida dias despues de siembra
	$('#diasDespuesSiembraI').change(function () {   
		if(parseInt($('#diasDespuesSiembraI').val().length) != 0){					
			if(diasDespuesSiembraIValido()){
				document.getElementById("diasDespuesSiembraD").className = "form-group has-error has-feedback";
				document.getElementById("errordiasDespuesSiembra").innerHTML = 'Incorrecto';
				document.getElementById("diasDespuesSiembraS").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{		
				document.getElementById("diasDespuesSiembraD").className = "form-group has-success has-feedback";
				document.getElementById("diasDespuesSiembraS").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errordiasDespuesSiembra").innerHTML = ' ';					
			}
		}else{
			document.getElementById("errordiasDespuesSiembra").innerHTML = 'Campo no puede ser vacio';
		}		
	});
	$('#diasDespuesSiembraAp1I').change(function () {   
		if(parseInt($('#diasDespuesSiembraAp1I').val().length) != 0){
					
			if(diasDespuesSiembraAp1IValido()){
				document.getElementById("diasDespuesSiembraAp1D").className = "form-group has-error has-feedback";
				document.getElementById("errordiasDespuesSiembraAp1").innerHTML = 'Incorrecto';
				document.getElementById("diasDespuesSiembraAp1S").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{		
				document.getElementById("diasDespuesSiembraAp1D").className = "form-group has-success has-feedback";
				document.getElementById("diasDespuesSiembraAp1S").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errordiasDespuesSiembraAp1").innerHTML = ' ';					
			}
		}else{
			document.getElementById("errordiasDespuesSiembraAp1").innerHTML = 'Campo no puede ser vacio';
		}		
	});
	$('#diasDespuesSiembraAp2I').change(function () {   
		if(parseInt($('#diasDespuesSiembraAp2I').val().length) != 0){
					
			if(diasDespuesSiembraAp2IValido()){
				document.getElementById("diasDespuesSiembraAp2D").className = "form-group has-error has-feedback";
				document.getElementById("errordiasDespuesSiembraAp2").innerHTML = 'Incorrecto';
				document.getElementById("diasDespuesSiembraAp2S").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{		
				document.getElementById("diasDespuesSiembraAp2D").className = "form-group has-success has-feedback";
				document.getElementById("diasDespuesSiembraAp2S").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errordiasDespuesSiembraAp2").innerHTML = ' ';					
			}
		}else{
			document.getElementById("errordiasDespuesSiembraAp2").innerHTML = 'Campo no puede ser vacio';
		}		
	});
	
}); 

$(function() { //valida cantidad
	$('#cantidadFertilizanteI').change(function () {   
		if(parseInt($('#cantidadFertilizanteI').val().length) != 0){
					
			if((parseInt($('#cantidadFertilizanteI').val()) < 0) || parseInt(($('#cantidadFertilizanteI').val())) >100){
				document.getElementById("cantidadFertilizanteD").className = "form-group has-error has-feedback";
				document.getElementById("errorCantidadFertilizante").innerHTML = 'Incorrecto';
				document.getElementById("cantidadFertilizanteS").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{		
				document.getElementById("cantidadFertilizanteD").className = "form-group has-success has-feedback";
				document.getElementById("cantidadFertilizanteS").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errorCantidadFertilizante").innerHTML = ' ';					
			}
		}else{
			document.getElementById("errorCantidadFertilizante").innerHTML = 'Campo no puede ser vacio';
		}		
	});
	$('#cantidadFertilizanteAp1I').change(function () {   
		if(parseInt($('#cantidadFertilizanteAp1I').val().length) != 0){
					
			if((parseInt($('#cantidadFertilizanteAp1I').val()) < 0) || parseInt(($('#cantidadFertilizanteAp1I').val())) >100){
				document.getElementById("cantidadFertilizanteAp1D").className = "form-group has-error has-feedback";
				document.getElementById("errorCantidadFertilizanteAp1").innerHTML = 'Incorrecto';
				document.getElementById("cantidadFertilizanteAp1S").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{		
				document.getElementById("cantidadFertilizanteAp1D").className = "form-group has-success has-feedback";
				document.getElementById("cantidadFertilizanteAp1S").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errorCantidadFertilizanteAp1").innerHTML = ' ';					
			}
		}else{
			document.getElementById("errorCantidadFertilizanteAp1").innerHTML = 'Campo no puede ser vacio';
		}		
	});
	$('#cantidadFertilizanteAp2I').change(function () {   
		if(parseInt($('#cantidadFertilizanteAp2I').val().length) != 0){
					
			if((parseInt($('#cantidadFertilizanteAp2I').val()) < 0) || parseInt(($('#cantidadFertilizanteAp2I').val())) >100){
				document.getElementById("cantidadFertilizanteAp2D").className = "form-group has-error has-feedback";
				document.getElementById("errorCantidadFertilizanteAp2").innerHTML = 'Incorrecto';
				document.getElementById("cantidadFertilizanteAp2S").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{		
				document.getElementById("cantidadFertilizanteAp2D").className = "form-group has-success has-feedback";
				document.getElementById("cantidadFertilizanteAp2S").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errorCantidadFertilizanteAp2").innerHTML = ' ';					
			}
		}else{
			document.getElementById("errorCantidadFertilizanteAp2").innerHTML = 'Campo no puede ser vacio';
		}		
	});
}); 

// RIEGO
function OnChangeRadioRiego (radio) {
  var el = document.getElementById('detalleRiego');
  if((parseInt(radio.value) === 0) || (radio.value === '1')){
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
  }
  else{
	el.style.display = (el.style.display == 'inline') ? 'block' : 'inline'; 
  }	
}

//PERIODO DE SIMULACIÓN

$(function() { //valida el año de inicio y fin del periodo de simulación

    $('#desdeAnioSimulacion').change(function () {   
		if(parseInt($('#desdeAnioSimulacion').val().length) != 0){
			if((parseInt($('#desdeAnioSimulacion').val())) < parseInt($('#desdeAnio').val()) || 
					parseInt(($('#desdeAnioSimulacion').val())) > parseInt($('#hastaAnio').val())){
				document.getElementById("anioDesdeS").className = "form-group has-error has-feedback";
				document.getElementById("errorAnioDesde").innerHTML = 'Incorrecto';
				document.getElementById("desdeAnioSimulacionS").className = "glyphicon glyphicon-remove form-control-feedback";
			} else{							
				document.getElementById("anioDesdeS").className = "form-group has-success has-feedback";
				document.getElementById("desdeAnioSimulacionS").className = "glyphicon glyphicon-ok form-control-feedback";
				document.getElementById("errorAnioDesde").innerHTML = ' ';
			}
		}else{
			document.getElementById("errorAnioDesde").innerHTML = 'Campo no puede ser vacio';
		}		
	});
	$('#hastaAnioSimulacion').change(function () {   
		if(parseInt($('#hastaAnioSimulacion').val().length) != 0){
				if((parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnio').val())) || 
				(parseInt($('#hastaAnioSimulacion').val()) > parseInt($('#hastaAnio').val())) || 
				(parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnioSimulacion').val()))){
					document.getElementById("anioHastaS").className = "form-group has-error has-feedback";
					document.getElementById("errorAnioHasta").innerHTML = 'Incorrecto';
					document.getElementById("hastaAnioSimulacionS").className = "glyphicon glyphicon-remove form-control-feedback";
			}else{				
				document.getElementById("anioHastaS").className = "form-group has-success has-feedback";
				document.getElementById("errorAnioDesde").innerHTML = ' ';				
				document.getElementById("hastaAnioSimulacionS").className = "glyphicon glyphicon-ok form-control-feedback";
			}
		}else{
			document.getElementById("anioHastaS").className = "form-group has-success has-feedback";
		}
	});
});  
    
function limpiarFormulario(){
	$('#desdeAnioSimulacion').val(" ");
	$('#hastaAnioSimulacion').val(" ");
	$('#diasDespuesSiembraI').val(" ");
	$('#cantidadFertilizanteI').val(" ");
	$('#diasDespuesSiembraAp1I').val(" ");
	$('#diasDespuesSiembraAp2I').val(" ");
	$('#cantidadFertilizanteAp1I').val(" ");
	$('#cantidadFertilizanteAp2I').val(" ");
	$('#inNombreEscenario').val(" ");
}  



