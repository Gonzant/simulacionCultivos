/* $(function () { $('#collapseThree').collapse('toggle')});
   $(function () { $('#collapseOne').collapse('hide')});
  */   
  
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
/*
//agregar escenario
$(function() {
   	$('#agregarEscenario').click(function () {
		var errores = "";
		var anioDesdeNoVacio=parseInt($('#desdeAnioSimulacion').val().length) != 0;
		var anioHastaNoVacio=parseInt($('#hastaAnioSimulacion').val().length) != 0;
		var checkFertilizaSiembra = $("#fertiliza").attr('checked', true).val() === '1';
		var nombreCultNoVacio = $("#nombreCultivo").attr('checked', true).val() != 0;
		var checkFertilizaOtras1 = $("#fertiliza1").attr('checked', true).val() === '1';
		var checkFertilizaOtras2 = $("#fertiliza2").attr('checked', true).val() === '2';
		var nombreEscenario = $('#inNombreEscenario').val(); 
		var nomCultivo = document.getElementById("nombreCultivo").value;
		var cultivo="";
		var ciclo = document.getElementById("cmbDetalleCultivar").value;
		var cicloMostrar=ciclo;
		var riego ="";
		
		//control de errores
		
		
		//fin - control de errores
		if($('input[name="riego"]:checked', '#rbRiego').val() ==='1'){
			riego = "Riego automático."
		}else{riego = "No riego."}
		if(nomCultivo ==='SB'){ 
			cultivo = "Soja";
			if(ciclo ==="UY0370"){cicloMostrar="Ciclo medio";}
			else{
				if(ciclo ==="UY0371"){cicloMostrar="Ciclo corto";}
				else{ if(ciclo ==="UY0372"){ cicloMostrar="Ciclo largo";} else{cicloMostrar="";}}
			}
		}
		else{
			cultivo = "Maíz";
			if(ciclo ==="UY0141"){cicloMostrar="GM 4";}
			else{
				if(ciclo ==="UY0151"){cicloMostrar="GM 5";}
				else{ if(ciclo ==="UY0161"){ cicloMostrar="GM 6";} else{cicloMostrar="";}}
			}	
					
			
		}
				
		alert(cicloMostrar);
		$("#accordion").append(
		"<div class=" + '"' +"panel panel-default" + '"' + "> " +
			"<div class=" + '"' + "panel-heading panelEscenarios" +'"' + ">" + 
			"<button class="+ '"'+"panel-title botonEscenario form-control"+'"'+"data-toggle="+'"'+"collapse"+'"'+"data-parent="+'"'+"#accordion" +'"'+"href="+'"'+"#collapse" +nombreEscenario +'"' +">Escenario 1: " + nombreEscenario +"</button>"+
			"<div id=" + '"' + "collapse"+ nombreEscenario + '"' + "class=" +'"' + "panel-collapse collapse in" +'"' +">"+
				"<div class=" + '"' + "panel-body" + '"' +">"+ cultivo + "<br>" + cicloMostrar  + "<br>" + riego +	"<div>" + "<div>"+
			"<div>"+
		"<div>");
	});
});
 */
 
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
	
	


/* RIEGO
function OnChangeRadioRiego (radio) {
  var el = document.getElementById('detalleRiego');
  if((parseInt(radio.value) === 0) || (radio.value === '1')){
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
  }
  else{
	el.style.display = (el.style.display == 'inline') ? 'block' : 'inline'; 
  }	
}*/

