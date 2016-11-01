
function validacionFertilizacionASiembra (){
	var diasSiembra1, cantFert1; 
	var fertilizaSeleccionado = ($('input[name=fertilizacion]:checked').attr('value')==='1');
	if(fertilizaSeleccionado){
		if(parseInt($('#diasDespuesSiembraI').val().length) != 0 ){ // no es vacio
			if (parseInt($('#diasDespuesSiembraI').val()) >= 0 && parseInt($('#diasDespuesSiembraI').val())<=150){ //es correcto
				$('#diasDespuesSiembraI').css({'borderColor': "#ccc"});
				$('#diasDespuesSiembraLE').text(" ");
				diasSiembra1 = true;
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraI').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraLE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
				diasSiembra1 = false;
			}
		}else{//es vacio
			$('#diasDespuesSiembraI').css({'borderColor': "#a94442"});
			$('#diasDespuesSiembraLE').text("Este campo no puede ser vacio");
			diasSiembra1 = false;
		}
		if(parseInt($('#cantidadFertilizanteI').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteI').val()) >= 0 && parseInt($('#cantidadFertilizanteI').val())<=100){ //es correcto
				$('#cantidadFertilizanteI').css({'borderColor': "#ccc"});
				$('#cantidadFertilizanteLE').text(" ");
				cantFert1 = true;
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteI').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteLE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
				cantFert1 = false;
			}
		}else{//es vacio
			$('#cantidadFertilizanteI').css({'borderColor': "#a94442"});
			$('#cantidadFertilizanteLE').text("Este campo no puede ser vacio");
			cantFert1 = false;
		}
	}
	return cantFert1 && diasSiembra1;
}

$(document).ready(function(){
	
//PERIODO DE SIMULACION 	
    
    $("#desdeAnioSimulacion").change(function(){
		if(parseInt($('#desdeAnioSimulacion').val().length) != 0 ){ // no es vacio
			if(parseInt($('#desdeAnioSimulacion').val()[0]) === 0 || parseInt($('#desdeAnioSimulacion').val()) < parseInt($('#desdeAnio').val()) || (parseInt(($('#desdeAnioSimulacion').val())) > parseInt($('#hastaAnio').val()))){
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
			if(parseInt($('#hastaAnioSimulacion').val()[0]) === 0 || parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnio').val()) || (parseInt(($('#hastaAnioSimulacion').val())) > parseInt($('#hastaAnio').val()))){
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
			if (parseInt($('#diasDespuesSiembraI').val().length) <= 3 && parseInt($('#diasDespuesSiembraI').val().length) >= 1){
				if(parseInt($('#diasDespuesSiembraI').val()) >= 0 && parseInt($('#diasDespuesSiembraI').val())<=150){ //es correcto
					$('#diasDespuesSiembraI').css({'borderColor': "#ccc"});
					$('#diasDespuesSiembraLE').text(" ");
				}
				else{
					$('#diasDespuesSiembraI').css({'borderColor': "#a94442"});
					$('#diasDespuesSiembraLE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
				}
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraI').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraLE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
			}
		}

	});

	$("#cantidadFertilizanteI").change(function(){
		if(parseInt($('#cantidadFertilizanteI').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteI').val().length) <= 3 && parseInt($('#cantidadFertilizanteI').val().length) >= 1){
				if (parseInt($('#cantidadFertilizanteI').val()) >= 0 && parseInt($('#cantidadFertilizanteI').val())<=100){ //es correcto
					$('#cantidadFertilizanteI').css({'borderColor': "#ccc"});
					$('#cantidadFertilizanteLE').text(" ");
				}
				else{
					$('#cantidadFertilizanteI').css({'borderColor': "#a94442"});
					$('#cantidadFertilizanteLE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
				}
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteI').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteLE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
			}
		}

	});

//FERTILIZACION OTRAS APLICACIONES 

	$("#diasDespuesSiembraAp1I").change(function(){
		if(parseInt($('#diasDespuesSiembraAp1I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#diasDespuesSiembraAp1I').val().length) <= 3 && parseInt($('#diasDespuesSiembraAp1I').val().length) >= 1){
				if (parseInt($('#diasDespuesSiembraAp1I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp1I').val())<=150){ //es correcto
					$('#diasDespuesSiembraAp1I').css({'borderColor': "#ccc"});
					$('#diasDespuesSiembraAp1LE').text(" ");
				}
				else{
					$('#diasDespuesSiembraAp1I').css({'borderColor': "#a94442"});
					$('#diasDespuesSiembraAp1LE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");					
				}
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraAp1I').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraAp1LE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
			}
		}
	});

	$("#diasDespuesSiembraAp2I").change(function(){
		if(parseInt($('#diasDespuesSiembraAp2I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#diasDespuesSiembraAp2I').val().length) <= 3 && parseInt($('#diasDespuesSiembraAp2I').val().length) >= 1){
				if (parseInt($('#diasDespuesSiembraAp2I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp2I').val())<=150){ //es correcto
					$('#diasDespuesSiembraAp2I').css({'borderColor': "#ccc"});
					$('#diasDespuesSiembraAp2LE').text(" ");
				}
				else{
					$('#diasDespuesSiembraAp2I').css({'borderColor': "#a94442"});
					$('#diasDespuesSiembraAp2LE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
				}
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraAp2I').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraAp2LE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
			}
		}
	});

	$("#cantidadFertilizanteAp1I").change(function(){
		if(parseInt($('#cantidadFertilizanteAp1I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteAp1I').val().length) <= 3 && parseInt($('#cantidadFertilizanteAp1I').val().length) >= 1){
				if (parseInt($('#cantidadFertilizanteAp1I').val()) >= 0 && parseInt($('#cantidadFertilizanteAp1I').val())<=100){ //es correcto
					$('#cantidadFertilizanteAp1I').css({'borderColor': "#ccc"});
					$('#cantidadFertilizanteAp1LE').text(" ");
				}
				else{
					$('#cantidadFertilizanteAp1I').css({'borderColor': "#a94442"});
					$('#cantidadFertilizanteAp1LE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
				}
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteAp1I').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteAp1LE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
			}
		}

	});
	$("#cantidadFertilizanteAp2I").change(function(){
		if(parseInt($('#cantidadFertilizanteAp2I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteAp2I').val().length) <= 3 && parseInt($('#cantidadFertilizanteAp2I').val().length) >= 1){
				if (parseInt($('#cantidadFertilizanteAp2I').val()) >= 0 && parseInt($('#cantidadFertilizanteAp2I').val())<=100){ //es correcto
					$('#cantidadFertilizanteAp2I').css({'borderColor': "#ccc"});
					$('#cantidadFertilizanteAp2LE').text(" ");
				}
				else{
					$('#cantidadFertilizanteAp2I').css({'borderColor': "#a94442"});
					$('#cantidadFertilizanteAp2LE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
				}
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteAp2I').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteAp2LE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
			}
		}
	});

});


function validacionFertilizacionOtrasAplicaciones (){
	var diasSiembra1=true, cantFert1=true, diasSiembra2=true, cantFert2=true; 

	var fertiliza1Seleccionado = ($('input[name=fertilizacionO]:checked').attr('value')==='1');
	var fertiliza2Seleccionado = ($('input[name=fertilizacionO]:checked').attr('value')==='2');

	if(fertiliza1Seleccionado || fertiliza2Seleccionado){
		//1 aplicacion
		if(parseInt($('#diasDespuesSiembraAp1I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#diasDespuesSiembraAp1I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp1I').val())<=150){ //es correcto
				$('#diasDespuesSiembraAp1I').css({'borderColor': "#ccc"});
				$('#diasDespuesSiembraAp1LE').text(" ");
				diasSiembra1 = true;
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraAp1I').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraAp1LE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
				diasSiembra1 = false;
			}
		}else{//es vacio
			$('#diasDespuesSiembraAp1I').css({'borderColor': "#a94442"});
			$('#diasDespuesSiembraAp1LE').text("Este campo no puede ser vacio");
			diasSiembra1 = false;
		}
		if(parseInt($('#cantidadFertilizanteAp1I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteAp1I').val()) >= 0 && parseInt($('#cantidadFertilizanteAp1I').val())<=100){ //es correcto
				$('#cantidadFertilizanteAp1I').css({'borderColor': "#ccc"});
				$('#cantidadFertilizanteAp1LE').text(" ");
				cantFert1 = true;
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteAp1I').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteAp1LE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
				cantFert1 = false;
			}	
		}else{//es vacio
			$('#cantidadFertilizanteAp1I').css({'borderColor': "#a94442"});
			$('#cantidadFertilizanteAp1LE').text("Este campo no puede ser vacio");
			cantFert1 = false;
		}
	}

	if(fertiliza2Seleccionado){

	// 2 aplicaciones
		if(parseInt($('#diasDespuesSiembraAp2I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#diasDespuesSiembraAp2I').val()) >= 0 && parseInt($('#diasDespuesSiembraAp2I').val())<=150){ //es correcto
				$('#diasDespuesSiembraAp2I').css({'borderColor': "#ccc"});
				$('#diasDespuesSiembraAp2LE').text(" ");
				diasSiembra2 = true;
			}
			else{ //dato incorrecto
				$('#diasDespuesSiembraAp2I').css({'borderColor': "#a94442"});
				$('#diasDespuesSiembraAp2LE').text("Los días despues de siembra deben ser mayores/iguales a 0 y menores/iguales a 150.");
				diasSiembra2 = false;
			}
		}else{//es vacio
			$('#diasDespuesSiembraAp2I').css({'borderColor': "#a94442"});
			$('#diasDespuesSiembraAp2LE').text("Este campo no puede ser vacio");
			diasSiembra2 = false;
		}

		if(parseInt($('#cantidadFertilizanteAp2I').val().length) != 0 ){ // no es vacio
			if (parseInt($('#cantidadFertilizanteAp2I').val()) >= 0 && parseInt($('#cantidadFertilizanteAp2I').val())<=100){ //es correcto
				$('#cantidadFertilizanteAp2I').css({'borderColor': "#ccc"});
				$('#cantidadFertilizanteAp2LE').text(" ");
				cantFert2 = true;
			}
			else{ //dato incorrecto
				$('#cantidadFertilizanteAp2I').css({'borderColor': "#a94442"});
				$('#cantidadFertilizanteAp2LE').text("La cantidad de fertilizante debe ser mayor/igual a 0 y menor/igual a 100.");
				cantFert2 = false;
			}
		}else{//es vacioc
			$('#cantidadFertilizanteAp2I').css({'borderColor': "#a94442"});
			$('#cantidadFertilizanteAp2LE').text("Este campo no puede ser vacio");
			cantFert2 = false;
		}
	}
	return cantFert2 && cantFert1 && diasSiembra1 && diasSiembra2;
}

function validacionPeriodoSimulacion (){
	var aniodesde, aniohasta;
	if(parseInt($('#desdeAnioSimulacion').val().length) == 0 ){ //  es vacio
		$('#desdeAnioSimulacion').css({'borderColor': "#a94442"});
		$('#anioDesdeLE').text("Este campo no puede ser vacio");
		aniodesde = false;
	}
	else{
		if(parseInt($('#desdeAnioSimulacion').val()) < parseInt($('#desdeAnio').val()) || (parseInt(($('#desdeAnioSimulacion').val())) > parseInt($('#hastaAnio').val()))){
			// no se encuentra en el rango
			$('#desdeAnioSimulacion').css({'borderColor': "#a94442"});
			$('#anioDesdeLE').text("El año se debe encontrar dentro del periodo disponible");
			aniodesde = false;
		}
		else{ //es correcto
			$('#desdeAnioSimulacion').css({'borderColor': "#ccc"});
			$('#anioDesdeLE').text(" ");
			aniodesde = true;
		}	

	}

	if(parseInt($('#hastaAnioSimulacion').val().length) == 0 ){ // es vacio
		$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
		$('#anioHastaLE').text("Este campo no puede ser vacio");
		aniohasta = false;
	}
	else{//no es vacio
		if(parseInt($('#hastaAnioSimulacion').val()) < parseInt($('#desdeAnio').val()) || (parseInt(($('#hastaAnioSimulacion').val())) > parseInt($('#hastaAnio').val()))){
				// no se encuentra en el rango
				$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
				$('#anioHastaLE').text("El año se debe encontrar dentro del periodo disponible");
				anioHastaLE = false;
			}
			else{ 
				//el año de inicio no puede ser mayor que el año de fin
				if(parseInt($('#hastaAnioSimulacion').val()) <= parseInt($('#desdeAnioSimulacion').val())){
					$('#hastaAnioSimulacion').css({'borderColor': "#a94442"});
					$('#anioHastaLE').text("El año inicial no puede ser mayor/igual al año de finalización del período.");
					aniohasta = false;

				}else{//es correcto
					$('#hastaAnioSimulacion').css({'borderColor': "#ccc"});
					$('#anioHastaLE').text(" ");
					aniohasta = true;
				}				
			}			
	}
	return aniodesde && aniohasta;
}

//NOMBRE ESCENARIO 
function validaNombreEscenario (e){

    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla==8) return true; // 3
    patron =/[0-9A-Za-zñÑáÁéÉíÍóÓúÚ \s]/; // 4
    te = String.fromCharCode(tecla); // 5
    
    if(patron.test(te) === false){

    	$('#inNombreEscenario').css({'borderColor': "#a94442"});
		$('#nombreEscenarioLE').text("Este campo solo puede contener letras y números");
    }
    else{
    	$('#inNombreEscenario').css({'borderColor': "#ccc"});
    	$('#nombreEscenarioLE').text(" ");
    }
    return patron.test(te); // 6

}

