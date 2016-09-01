  
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
	
	
function validaCamposVacios(){
	
	var errores="<strong> Verifique los siguientes campos: </strong>" 
	var datosOk, periodoOk, cultivoOk, nombreOk=true, fertiSiembraOk=true, fertiSiembra1Ok=true, fertiSiembra2Ok=true;
	
	var anioDesdeNoVacio= validaPeriodoSimulacion()===true && parseInt($('#desdeAnioSimulacion').val().length) != 0; 
	var anioHastaNoVacio= validaPeriodoSimulacion()===true && parseInt($('#hastaAnioSimulacion').val().length) != 0;
	var cultivoSeleccionado = ($('input[name=cultivo]:checked').attr('value')==='SB') || ($('input[name=cultivo]:checked').attr('value')==='MZ');
	var fertilizaSeleccionado = ($('input[name=fertilizacion]:checked').attr('value')==='1');
	var diasS, diasS1, diasS2, cantidadS, cantidadS1, cantidadS2;
	var fertiliza1Seleccionado = ($('input[name=fertilizacionO]:checked').attr('value')==='1');
	var fertiliza2Seleccionado = ($('input[name=fertilizacionO]:checked').attr('value')==='2');
	var nombreEscenarioNoVacio = $('#inNombreEscenario').val().length !=0; 
	diasS1 = parseInt($('#diasDespuesSiembraAp1I').val().length) != 0;
	diasS2 =parseInt($('#diasDespuesSiembraAp2I').val().length) != 0;
	if(anioDesdeNoVacio && anioHastaNoVacio){ 		
		periodoOk=true;		
	}else{		
		errores = errores + "<p>Periodo de simulacion</p>";		
		periodoOk=false;
	}
	if(cultivoSeleccionado){ 		
		cultivoOk=true;		
	}else{		
		errores = errores + "<p>Debe seleccionar un cultivo<p>";		
		cultivoOk=false;
	}
	if(fertilizaSeleccionado){//fertiliza Siembra seleccionado
		diasS = parseInt($('#diasDespuesSiembraI').val().length) != 0;
		cantidadS=parseInt($('#cantidadFertilizanteI').val().length) != 0;
		if((parseInt($('#diasDespuesSiembraI').val()) >= 0 && parseInt($('#diasDespuesSiembraI').val()) <=150) === false || ((parseInt($('#cantidadFertilizanteI').val()) >= 0) && parseInt(($('#cantidadFertilizanteI').val())) <= 100==false)){
			errores = errores + "<p> Fertilizacion a la siembra</p>";
			fertiSiembraOk=false;
		}else{
			fertiSiembraOk= true;
		}
	}
	if(fertiliza1Seleccionado){//fertiliza 1 ap seleccionado
		if((parseInt($('#diasDespuesSiembraAp1I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp1I').val()) <=150) === false || ((parseInt($('#cantidadFertilizanteAp1I').val()) >= 0) && parseInt(($('#cantidadFertilizanteAp1I').val())) <= 100==false)){
			errores = errores + "<p> Otras fertilizaciones (1 aplicacion)</p>";
			fertiSiembra1Ok=false;
		}else{
			fertiSiembra1Ok= true;
		}
	}
	
	if(fertiliza2Seleccionado){//fertiliza 2 ap seleccionado
		if((parseInt($('#diasDespuesSiembraAp2I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp2I').val()) <=150) === false || ((parseInt($('#cantidadFertilizanteAp2I').val()) >= 0) && parseInt(($('#cantidadFertilizanteAp2I').val())) <= 100==false)){
			errores = errores + "<p> Otras fertilizaciones (2 aplicaciones)</p>";
			fertiSiembra2Ok=false;
		}else{
			fertiSiembra2Ok= true;
		}
	}
	if(nombreEscenarioNoVacio ===false){
		errores = errores + "<p> Nombre del escenario </p>";
		nombreOk=false;
	}
	if(errores!="<strong> Verifique los siguientes campos: </strong>"){
		var div= "<div class=\"alert alert-warning\"><a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" + errores + "</div>";
		//document.getElementById("msgErrores").className = "alert alert-warning";
		$("#msgErrores" ).html(div);
		$('body,html').animate({scrollTop : 0}, 500);
	}
	/*alert("fertisiembra Ok" + fertiSiembraOk);
	alert("cultivoOk Ok" + cultivoOk);
	alert("nombreOk Ok" + nombreOk);
	alert("fertiSiembra2Ok Ok" + fertiSiembra2Ok);
	alert("fertiSiembra1Ok Ok" + fertiSiembra1Ok);
	alert("periodo Ok" + periodoOk);
*/
	if(nombreOk && fertiSiembra2Ok && fertiSiembra1Ok && periodoOk && cultivoOk && fertiSiembraOk){
		//datosOk, periodoOk, cultivoOk, nombreOk, fertiSiembraOk, fertiSiembra1Ok, fertiSiembra2Ok;
		datosOk = true; 
	}
		
	return datosOk;
}
 
 
function validaPeriodoSimulacion(){
	//retorna true si el periodo es valido
	var retorno = false; 
	if(parseInt($('#desdeAnioSimulacion').val().length) != 0  || (parseInt($('#hastaAnioSimulacion').val().length) != 0)){
		if((parseInt($('#desdeAnioSimulacion').val()) < parseInt($('#desdeAnio').val())) || (parseInt(($('#desdeAnioSimulacion').val())) > parseInt($('#hastaAnio').val())) || (parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnio').val())) || (parseInt($('#hastaAnioSimulacion').val()) > parseInt($('#hastaAnio').val())) || (parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnioSimulacion').val()))){
				retorno = false;
		} else{							
				retorno = true;
			}
	}else{
		retorno = false;
	}		
	return retorno; 	
} 
 
function vaciarForm(){
	$('#desdeAnioSimulacion').val('');
	$('#hastaAnioSimulacion').val('');
	$('#inNombreEscenario').val('');
	$("#noFertiliza").prop("checked", "checked");
	$("#fertiliza").prop("checked", "");
	$("#noFertilizaO").prop("checked", "checked");
	$("#fertiliza2").prop("checked", "");
	$("#fertiliza1").prop("checked", "");
	
}


	//valida precio del grano 
	$(function() {
		$('#precioGranoEscenario').change(function () {   
			if((parseInt($('#precioGranoEscenario').val()) < 0) || (parseInt($('#precioGranoEscenario').val()) > 1000)){
					document.getElementById("precioGranoEscenarioD").className = "form-group has-error has-feedback";
					document.getElementById("errorPrecioGrano").innerHTML = 'Incorrecto';
					document.getElementById("precioGranoS").className = "glyphicon glyphicon-remove form-control-feedback";
			}else{				
				document.getElementById("precioGranoEscenarioD").className = "form-group has-success has-feedback";
				document.getElementById("errorPrecioGrano").innerHTML = ' ';				
				document.getElementById("precioGranoS").className = "glyphicon glyphicon-ok form-control-feedback";
			}			
		});
	});
	//valida precio del fertilizante 
 	$(function() {
		$('#precioFertilizanteEscenario').change(function () {   
			if((parseInt($('#precioFertilizanteEscenario').val()) < 1) || (parseInt($('#precioFertilizanteEscenario').val()) > 3)){
					document.getElementById("precioFertilizanteEscenarioD").className = "form-group has-error has-feedback";
					document.getElementById("errorprecioFertilizanteEscenario").innerHTML = 'Incorrecto';
					document.getElementById("precioFertilizanteEscenarioS").className = "glyphicon glyphicon-remove form-control-feedback";
			}else{				
				document.getElementById("precioFertilizanteEscenarioD").className = "form-group has-success has-feedback";
				document.getElementById("errorprecioFertilizanteEscenario").innerHTML = ' ';				
				document.getElementById("precioFertilizanteEscenarioS").className = "glyphicon glyphicon-ok form-control-feedback";
			}			
		});
	});
	//valida costo del riego
 	$(function() {
		$('#costeRiegoEscenario').change(function () {   
			if((parseInt($('#costeRiegoEscenario').val()) < 1) || (parseInt($('#costeRiegoEscenario').val()) > 3)){
					document.getElementById("costeRiegoEscenarioD").className = "form-group has-error has-feedback";
					document.getElementById("errorCosteRiegoEscenario").innerHTML = 'Incorrecto';
					document.getElementById("costeRiegoEscenarioS").className = "glyphicon glyphicon-remove form-control-feedback";
			}else{				
				document.getElementById("costeRiegoEscenarioD").className = "form-group has-success has-feedback";
				document.getElementById("errorCosteRiegoEscenario").innerHTML = ' ';				
				document.getElementById("costeRiegoEscenarioS").className = "glyphicon glyphicon-ok form-control-feedback";
			}			
		});
	});
	
	//valida gastos generales
 	$(function() {
		$('#gastosGeneralesEscenario').change(function () {   
			if((parseInt($('#gastosGeneralesEscenario').val()) < 300) || (parseInt($('#gastosGeneralesEscenario').val()) > 1000)){
					document.getElementById("gastosGeneralesEscenarioD").className = "form-group has-error has-feedback";
					document.getElementById("errorGastosGeneralesEscenario").innerHTML = 'Incorrecto';
					document.getElementById("gastosGeneralesEscenarioS").className = "glyphicon glyphicon-remove form-control-feedback";
			}else{				
				document.getElementById("gastosGeneralesEscenarioD").className = "form-group has-success has-feedback";
				document.getElementById("errorGastosGeneralesEscenario").innerHTML = ' ';				
				document.getElementById("gastosGeneralesEscenarioS").className = "glyphicon glyphicon-ok form-control-feedback";
			}			
		});
	});
