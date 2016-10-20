//Boton agregar escenario
function agregarEscenario(boton){
	var cultivo = document.getElementById('rdCult');	
	var escenario = new Object();	
}

//DATETIMEPICKER
function  borrarNombreEscenario (){	
	$('#inNombreEscenario').val('');
	$('#desdeAnioSimulacion').attr('readonly', true);
	$('#hastaAnioSimulacion').attr('readonly', true);
	$('body,html').animate({scrollTop : 0}, 500);
}

$(function() {
	$('#myModal').modal('hide');	
	
	
	//DATETIMEPICKER
	$('#datetimepicker4').datetimepicker({
		pickTime: false,
		todayHighlight: true,
		autoclose: true,
		language: 'pt-UY'
    });	
	$('#datetimepicker4').on('changeDate', function(ev){                 
		$('#datetimepicker4').datetimepicker('hide');
	});
	
	if(window.location.href === "http://127.0.0.1:8000/webapp/"){
		$('#datetimepicker4').datetimepicker('setDate', new Date());
	}
	
});


//FERTILIZACION

function OnChangeRadioFertilizacion (radio) {

  var el = document.getElementById('fertilizacionSiembra');  
  var diasSiembra = document.getElementById('diasDespuesSiembraI');
  var cantS = document.getElementById('cantidadFertilizanteI');  
  
  if(radio.value === '0'){
	el.style.display = 'none'; 
	
	diasSiembra.removeAttribute("required");
	diasSiembra.value = "";
	
	cantS.removeAttribute("required");
	cantS.value = "";
  }
  else{
	document.getElementById("diasDespuesSiembra").className = " ";
	el.style.display = 'inline'; 	
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
	el.style.display = 'none'; 
	el1.style.display ='inline'; 
	el2.style.display = 'inline'; 
	
	diasSiembra1.removeAttribute("required");
	cantS1.removeAttribute("required");	
	diasSiembra1.value = "";
	cantS1.value = "";
		
	diasSiembra2.removeAttribute("required");
	cantS2.removeAttribute("required");
	  
  }else{
	if(radio.value === '1'){
		el.style.display = 'inline'; 
		el1.style.display = 'inline'; 
		el2.style.display =  'none'; 
		
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
		el.style.display =  'inline'; 
		el2.style.display = 'inline'; 
	}	
  }	
}
	
function validaCamposVacios(){
	
	validacionPeriodoSimulacionVacio();

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
		validacionFertilizacionASiembraVacio();
		validacionFertilizacionOtrasAplicacionesVacio();

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
	if(nombreOk && fertiSiembra2Ok && fertiSiembra1Ok && periodoOk && cultivoOk && fertiSiembraOk){
		//datosOk, periodoOk, cultivoOk, nombreOk, fertiSiembraOk, fertiSiembra1Ok, fertiSiembra2Ok;
		datosOk = true; 
	}
		
	return datosOk;
}
 
$(document).ready(function(){ 
	$("#carga").click(function(){cerrar();}); 
});
 
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
	$('#desdeAnioSimulacion').attr('readonly', true);
	$('#hastaAnioSimulacion').attr('readonly', true);
	$('#inNombreEscenario').val(''); 
	$('#diasDespuesSiembraAp1I').val('');
	$('#cantidadFertilizanteAp1I').val('');
	$('#diasDespuesSiembraAp2I').val('');
	$('#cantidadFertilizanteAp2I').val('');
	$('#diasDespuesSiembraI').val('');
	$('#cantidadFertilizanteI').val('');
	$('body,html').animate({scrollTop : 0}, 500);
}


function btnAgregarEscenario(){
	if(agregarEscenario()){
		$('#myModal').modal('show');	
	}
};

function ejecutarSimulacion(){
	
	if (agregarEscenario()){		
		cerrar();			
		document.getElementById('ejecutarDSSAT').submit();	
		$('#modalCargando').modal('show');			
	}				
};

$(document).ready(function() {
	// alert("document cargo - show graphic - ready");
	 $('#modalCargando').modal('hide');
});
		





