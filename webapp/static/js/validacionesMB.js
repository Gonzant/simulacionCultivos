$(document).ready(function(){

//PRECIO DEL GRANO 

	$("#precioGranoEscenario").change(function(){ //rango entre 0 y 1000
			if(parseInt($('#precioGranoEscenario').val().length) != 0 ){ // no es vacio
				if(parseFloat($('#precioGranoEscenario').val()) < 0 || (parseFloat(($('#precioGranoEscenario').val())) > 1000)){
					// no se encuentra en el rango
					$('#precioGranoEscenario').css({'borderColor': "#a94442"});
					$('#precioGranoEscenarioLE').text("El precio del grano se debe encontrar entre 0 y 1000");
				}
				else{ //es correcto
					$('#precioGranoEscenario').css({'borderColor': "#ccc"});
					$('#precioGranoEscenarioLE').text(" ");
				}	
			}else{//es vacio	  		
				$('#precioGranoEscenario').css({'borderColor': "#a94442"});
				$('#precioGranoEscenarioLE').text("Este campo no puede ser vacio");
			}
	
	});

//PRECIO DEL FERTILIZANTE
	$("#precioFertilizanteEscenario").change(function(){  //rango entre 1 y 3

		if(parseInt($('#precioFertilizanteEscenario').val().length) != 0 ){ // no es vacio
			if(parseFloat($('#precioFertilizanteEscenario').val()) < 1 || (parseFloat($('#precioFertilizanteEscenario').val()) > 3)){
				// no se encuentra en el rango				
				$('#precioFertilizanteEscenario').css({'borderColor': "#a94442"});
				$('#precioFertilizanteEscenarioLE').text("El precio del fertilizante se debe encontrar entre 1 y 3");
			}
			else{ //es correcto
				$('#precioFertilizanteEscenario').css({'borderColor': "#ccc"});
				$('#precioFertilizanteEscenarioLE').text(" ");
			}			
		}else{//es vacio	  		
			$('#precioFertilizanteEscenario').css({'borderColor': "#a94442"});
			$('#precioFertilizanteEscenarioLE').text("Este campo no puede ser vacio");
		}
	   
	});

//COSTO RIEGO 
	$("#costeRiegoEscenario").change(function(){ 
		if(parseFloat($('#costeRiegoEscenario').val().length) != 0 ){ // no es vacio
			if(parseFloat($('#costeRiegoEscenario').val()) < 1 || (parseFloat($('#costeRiegoEscenario').val()) > 3)){
				// no se encuentra en el rango				
				$('#costeRiegoEscenario').css({'borderColor': "#a94442"});
				$('#costeRiegoEscenarioLE').text("El costo del riego se debe encontrar entre 1 y 3");
			}
			else{ //es correcto
				$('#precioFertilizanteEscenario').css({'borderColor': "#ccc"});
				$('#precioFertilizanteEscenarioLE').text(" ");
			}	
		}else{//es vacio	  		
			$('#costeRiegoEscenario').css({'borderColor': "#a94442"});
			$('#costeRiegoEscenarioLE').text("Este campo no puede ser vacio");
		}
	   
	});

//OTROS COSTOS 

	$("#gastosGeneralesEscenario").change(function(){
		if(parseFloat($('#gastosGeneralesEscenario').val().length) != 0 ){ // no es vacio
			if(parseFloat($('#gastosGeneralesEscenario').val()) < 300 || (parseFloat($('#gastosGeneralesEscenario').val()) > 1000)){
				// no se encuentra en el rango				
				$('#gastosGeneralesEscenario').css({'borderColor': "#a94442"});
				$('#gastosGeneralesEscenarioLE').text("Los gastos generales se deben encontrar entre 300 y 1000");
			}
			else{ //es correcto
				$('#gastosGeneralesEscenario').css({'borderColor': "#ccc"});
				$('#gastosGeneralesEscenarioLE').text(" ");
			}	
		}else{//es vacio	  		
			$('#gastosGeneralesEscenario').css({'borderColor': "#a94442"});
			$('#gastosGeneralesEscenarioLE').text("Este campo no puede ser vacio");
		}	   
	});

});

function validaPrecioGrano (input){
	
		var retorno;
		if(parseInt($('#precioGranoEscenario').val().length) != 0 ){ // no es vacio
			if(parseFloat($('#precioGranoEscenario').val()) < 0 || (parseFloat(($('#precioGranoEscenario').val())) > 1000)){
				// no se encuentra en el rango
				$('#precioGranoEscenario').css({'borderColor': "#a94442"});
				$('#precioGranoEscenarioLE').text("El precio del grano se debe encontrar entre 0 y 1000");
				retorno = false;
			}
			else{ //es correcto
				$('#precioGranoEscenario').css({'borderColor': "#ccc"});
				$('#precioGranoEscenarioLE').text(" ");
				retorno = true; 
			}	
		}else{//es vacio	  		
			$('#precioGranoEscenario').css({'borderColor': "#a94442"});
			$('#precioGranoEscenarioLE').text("Este campo no puede ser vacio");
			retorno = false;
		}
		
	return retorno;
}

function validaPrecioFertilizante (){
	var retorno;
	if(parseInt($('#precioFertilizanteEscenario').val().length) != 0 ){ // no es vacio
		if(parseFloat($('#precioFertilizanteEscenario').val()) < 1 || (parseFloat($('#precioFertilizanteEscenario').val()) > 3)){
			// no se encuentra en el rango				
			$('#precioFertilizanteEscenario').css({'borderColor': "#a94442"});
			$('#precioFertilizanteEscenarioLE').text("El precio del fertilizante se debe encontrar entre 1 y 3");
			retorno = false;
		}
		else{ //es correcto
			$('#precioFertilizanteEscenario').css({'borderColor': "#ccc"});
			$('#precioFertilizanteEscenarioLE').text(" ");
			retorno = true;
		}			
	}else{//es vacio	  		
		$('#precioFertilizanteEscenario').css({'borderColor': "#a94442"});
		$('#precioFertilizanteEscenarioLE').text("Este campo no puede ser vacio");
		retorno = false;
	}	
	return retorno; 
}

function validaCostoRiego (){
	var retorno;
	if(parseFloat($('#costeRiegoEscenario').val().length) != 0 ){ // no es vacio
		if(parseFloat($('#costeRiegoEscenario').val()) < 1 || (parseFloat($('#costeRiegoEscenario').val()) > 3)){
			// no se encuentra en el rango				
			$('#costeRiegoEscenario').css({'borderColor': "#a94442"});
			$('#costeRiegoEscenarioLE').text("El costo del riego se debe encontrar entre 1 y 3");
			retorno = false; 
		}
		else{ //es correcto
			$('#precioFertilizanteEscenario').css({'borderColor': "#ccc"});
			$('#precioFertilizanteEscenarioLE').text(" ");
			retorno = true;
		}	
	}else{//es vacio	  		
		$('#costeRiegoEscenario').css({'borderColor': "#a94442"});
		$('#costeRiegoEscenarioLE').text("Este campo no puede ser vacio");
		retorno = false;
	}
	return retorno;
}

function validaCostosGenerales (){
	var retorno;
	if(parseFloat($('#gastosGeneralesEscenario').val().length) != 0 ){ // no es vacio
		if(parseFloat($('#gastosGeneralesEscenario').val()) < 300 || (parseFloat($('#gastosGeneralesEscenario').val()) > 1000)){
			// no se encuentra en el rango				
			$('#gastosGeneralesEscenario').css({'borderColor': "#a94442"});
			$('#gastosGeneralesEscenarioLE').text("Los gastos generales se deben encontrar entre 300 y 1000");
			retorno = false;
		}
		else{ //es correcto
			$('#gastosGeneralesEscenario').css({'borderColor': "#ccc"});
			$('#gastosGeneralesEscenarioLE').text(" ");
			retorno = true;
		}	
	}else{//es vacio	  		
		$('#gastosGeneralesEscenario').css({'borderColor': "#a94442"});
		$('#gastosGeneralesEscenarioLE').text("Este campo no puede ser vacio");
		retorno = false;
	}
	return retorno;
}