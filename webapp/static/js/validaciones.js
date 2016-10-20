
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

		
	
});

