
//Boton agregar escenario
function agregarEscenario(boton){
	var cultivo = document.getElementById('rdCult');	
	var escenario = new Object();	
}

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
	
	if(window.location.search === ""){
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
		
		// HAGO ALGUNOS COMPENTARIOS PORQUE EXPLOTA
		//quito estilos a dias despues siembra
		document.getElementById("diasDespuesSiembraAp2D").className = "form-group";
		
		//quito estilos de cantidad
		document.getElementById("cantidadFertilizanteAp2D").className = "form-group";
		
	} else{	
		el.style.display =  'inline'; 
		el2.style.display = 'inline'; 
	}	
  }	
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
	$('#modalCargando').modal('hide');
});
		





