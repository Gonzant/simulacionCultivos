function validacionFertilizacionASiembraVacio (){

	if(parseInt($('#diasDespuesSiembraI').val().length) != 0 ){ // no es vacio
		$('#diasDespuesSiembraI').css({'borderColor': "#ccc"});
		$('#diasDespuesSiembraLE').text(" ");
	}else{//es vacio
		$('#diasDespuesSiembraI').css({'borderColor': "#a94442"});
		$('#diasDespuesSiembraLE').text("Este campo no puede ser vacio");
	}
	if(parseInt($('#cantidadFertilizanteI').val().length) != 0 ){ // no es vacio
		$('#cantidadFertilizanteI').css({'borderColor': "#ccc"});
		$('#cantidadFertilizanteLE').text(" ");	
	}else{//es vacio
		$('#cantidadFertilizanteI').css({'borderColor': "#a94442"});
		$('#cantidadFertilizanteLE').text("Este campo no puede ser vacio");
	}
}

$(document).ready(function(){
	
	//PERIODO DE SIMULACION 	
    
    $("#desdeAnioSimulacion").change(function(){
		if(parseInt($('#desdeAnioSimulacion').val().length) != 0 ){ // no es vacio
			if(parseInt($('#desdeAnioSimulacion').val()) < parseInt($('#desdeAnio').val()) || (parseInt(($('#desdeAnioSimulacion').val())) > parseInt($('#hastaAnio').val()))){
				// no se encuentra en el rango
				$('#desdeAnioSimulacion').css({'borderColor': "#a94442"});
				$('#anioDesdeLE').text("El año se debe encontrar dentro del periodo disponible");
			}
			else{ //es correcto
				$('#desdeAnioSimulacion').css({'borderColor': "#ccc"});
				$('#anioDesdeLE').text(" ");
			}			
		}else{//es vacio	  		
			$('#desdeAnioSimulacion').css({'borderColor': "#a94442"});
			$('#anioDesdeLE').text("Este campo no puede ser vacio");
		}
       
    });

    $("#hastaAnioSimulacion").change(function(){
		if(parseInt($('#hastaAnioSimulacion').val().length) != 0 ){ // no es vacio
			if(parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnio').val()) || (parseInt(($('#hastaAnioSimulacion').val())) > parseInt($('#hastaAnio').val()))){
				// no se encuentra en el rango
				$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
				$('#anioHastaLE').text("El año se debe encontrar dentro del periodo disponible");
			}
			else{ 
				//el año de inicio no puede ser mayor que el año de fin
				if(parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnioSimulacion').val())){
					$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
					$('#anioHastaLE').text("El año inicial no puede ser mayor al año de finalización del período.");

				}else{//es correcto
					$('#hastaAnioSimulacion').css({'borderColor': "#ccc"});
					$('#anioHastaLE').text(" ");
				}				
			}			
		}else{//es vacio	  		
			$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
			$('#anioHastaLE').text("Este campo no puede ser vacio");
		}
       
    });

	//FERTILIZACION A LA SIEMBRA	
	$("#diasDespuesSiembraI").change(function(){
		if(parseInt($('#diasDespuesSiembraI').val().length) != 0 ){ // no es vacio
			if (parseInt($('#diasDespuesSiembraI').val()) >= 0 && parseInt($('#diasDespuesSiembraI').val())<=150){ //es correcto
				$('#diasDespuesSiembraI').css({'borderColor': "#ccc"});
				$('#diasDespuesSiembraLE').text(" ");
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraI').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraLE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores a 150.");
			}
		}

	});

	$("#cantidadFertilizanteI").change(function(){
		if(parseInt($('#cantidadFertilizanteI').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteI').val()) >= 0 && parseInt($('#cantidadFertilizanteI').val())<=100){ //es correcto
				$('#cantidadFertilizanteI').css({'borderColor': "#ccc"});
				$('#cantidadFertilizanteLE').text(" ");
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteI').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteLE').text("La cantidad de fertilizante debe ser mayor a 0 y menor a 100.");
			}
		}


	});

	
});


function validacionFertilizacionOtrasAplicacionesVacio (){
//1 aplicacion
	if(parseInt($('#diasDespuesSiembraAp1I').val().length) != 0 ){ // no es vacio
		$('#diasDespuesSiembraAp1I').css({'borderColor': "#ccc"});
		$('#diasDespuesSiembraAp1LE').text(" ");
	}else{//es vacio
		$('#diasDespuesSiembraAp1I').css({'borderColor': "#a94442"});
		$('#diasDespuesSiembraAp1LE').text("Este campo no puede ser vacio");
	}
	if(parseInt($('#cantidadFertilizanteAp1I').val().length) != 0 ){ // no es vacio
		$('#cantidadFertilizanteAp1I').css({'borderColor': "#ccc"});
		$('#cantidadFertilizanteAp1LE').text(" ");	
	}else{//es vacio
		$('#cantidadFertilizanteAp1I').css({'borderColor': "#a94442"});
		$('#cantidadFertilizanteAp1LE').text("Este campo no puede ser vacio");
	}

// 2 aplicaciones
	if(parseInt($('#diasDespuesSiembraAp2I').val().length) != 0 ){ // no es vacio
		$('#diasDespuesSiembraAp2I').css({'borderColor': "#ccc"});
		$('#diasDespuesSiembraAp2LE').text(" ");
	}else{//es vacio
		$('#diasDespuesSiembraAp2I').css({'borderColor': "#a94442"});
		$('#diasDespuesSiembraAp2LE').text("Este campo no puede ser vacio");
	}

	if(parseInt($('#cantidadFertilizanteAp2I').val().length) != 0 ){ // no es vacio
		$('#cantidadFertilizanteAp2I').css({'borderColor': "#ccc"});
		$('#cantidadFertilizanteAp2LE').text(" ");	
	}else{//es vacio
		$('#cantidadFertilizanteAp2I').css({'borderColor': "#a94442"});
		$('#cantidadFertilizanteAp2LE').text("Este campo no puede ser vacio");
	}
}

function validacionPeriodoSimulacionVacio (){
	if(parseInt($('#desdeAnioSimulacion').val().length) == 0 ){ // no es vacio
		$('#desdeAnioSimulacion').css({'borderColor': "#a94442"});
		$('#anioDesdeLE').text("Este campo no puede ser vacio");
	}

	if(parseInt($('#hastaAnioSimulacion').val().length) == 0 ){ // no es vacio
		$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
		$('#anioHastaLE').text("Este campo no puede ser vacio");
	}

}

