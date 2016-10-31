function validaPrecioGrano (){
	
	var cantEscenarios = document.getElementsByName("precioGranoEscenario").length;
	//alert (cantEscenarios);	
	var retorno = []; 
	for (var i=0; i < cantEscenarios; i=i+1){
		
		var precioGrano = (document.getElementsByName("precioGranoEscenario")[i].value);		

		if(parseInt(precioGrano.length) != 0 ){ // no es vacio
			if(parseFloat(precioGrano) < 0 || parseFloat(precioGrano) > 1000){// no se encuentra en el rango
					document.getElementsByName("precioGranoEscenario")[i].setAttribute('style', 'border-color: #a94442');
					document.getElementsByName("precioGranoEscenarioLE")[i].innerHTML = 'El precio del grano se debe encontrar entre 0 y 1000';
					retorno [i] = false;
				}
				else{ //es correcto
					document.getElementsByName("precioGranoEscenario")[i].setAttribute('style', 'border-color: #ccc');
					document.getElementsByName("precioGranoEscenarioLE")[i].innerHTML= ' ';
					retorno[i]= true; 
				}	
		}else{//es vacio	  		
				document.getElementsByName("precioGranoEscenario")[i].setAttribute('style', 'border-color: #a94442');
				document.getElementsByName("precioGranoEscenarioLE")[i].innerHTML ='Este campo no puede ser vacio';
				retorno [i] = false;
		}

	}
	return retorno; 
}

function validaPrecioFertilizante (){
	var cantEscenarios = document.getElementsByName("precioFertilizanteEscenario").length;

	var retorno = [];  
	for (var i=0; i < cantEscenarios; i=i+1){
		
		var precioFert = document.getElementsByName("precioFertilizanteEscenario")[i].value;		

		if(parseInt(precioFert.length) != 0 ){ // no es vacio
			retorno [i] = false;
			if(parseFloat(precioFert) < 0 || parseFloat(precioFert) > 1000){// no se encuentra en el rango
				document.getElementsByName("precioFertilizanteEscenario")[i].setAttribute('style', 'border-color: #a94442');
				document.getElementsByName("precioFertilizanteEscenarioLE")[i].innerHTML = "El precio del fertilizante se debe encontrar entre 0 y 4";
				retorno [i]= false;
			}
			else{ //es correcto
				document.getElementsByName("precioFertilizanteEscenario")[i].setAttribute('style', 'border-color: #ccc');
				document.getElementsByName("precioFertilizanteEscenarioLE")[i].innerHTML =  " ";
				retorno [i]= true; 
			}	
		}else{//es vacio	  		
			document.getElementsByName("precioFertilizanteEscenario")[i].setAttribute('style', 'border-color: #a94442');
			document.getElementsByName("precioFertilizanteEscenarioLE")[i].innerHTML = 'Este campo no puede ser vacio';
			retorno [i] = false;
		}

	}
	return retorno; 	
}

function validaCostoRiego (){
	
	var cantEscenarios = document.getElementsByName("costeRiegoEscenario").length;	
	var retorno = [];  
	for (var i=0; i < cantEscenarios; i=i+1){	
		var costoRiegoEsc = (document.getElementsByName("costeRiegoEscenario")[i].value);	
		if(parseInt(costoRiegoEsc.length) != 0 ){ // no es vacio
			if(parseFloat(costoRiegoEsc) < 0 || parseFloat(costoRiegoEsc) > 1000){ 	// no se encuentra en el rango
				document.getElementsByName("costeRiegoEscenario")[i].setAttribute('style', 'border-color: #a94442');
				document.getElementsByName("costeRiegoEscenarioLE")[i].innerHTML = 'El costo del riego se debe encontrar entre 0 y 1000';
				retorno [i]= false;
			}
			else{ //es correcto
				document.getElementsByName("costeRiegoEscenario")[i].setAttribute('style', 'border-color: #ccc');
				document.getElementsByName("costeRiegoEscenarioLE")[i].innerHTML =' ';
				retorno [i]=  true; 
			}	
		}else{//es vacio	  		
				document.getElementsByName("costeRiegoEscenario")[i].setAttribute('style', 'border-color: #a94442');
				document.getElementsByName("costeRiegoEscenarioLE")[i].innerHTML = 'Este campo no puede ser vacio';
				retorno [i]= false;
		}

	}
	return retorno; 
}

function validaCostosGenerales (){
	var cantEscenarios = document.getElementsByName("gastosGeneralesEscenario").length;
	//alert (cantEscenarios);	
	var retorno = [];  
	for (var i=0; i < cantEscenarios; i=i+1){
		
		var costosGen = (document.getElementsByName("gastosGeneralesEscenario")[i].value);		

		if(parseInt(costosGen.length) != 0 ){ // no es vacio
				if(parseFloat(costosGen) < 0 || parseFloat(costosGen) > 1000){
				// no se encuentra en el rango
					document.getElementsByName("gastosGeneralesEscenario")[i].setAttribute('style', 'border-color: #a94442');
					document.getElementsByName("gastosGeneralesEscenarioLE")[i].innerHTML = 'Otros costos de producción se deben encontrar entre 300 y 1000';
					retorno[i] = false;
				}
				else{ //es correcto
					document.getElementsByName("gastosGeneralesEscenario")[i].setAttribute('style', 'border-color: #ccc');
					document.getElementsByName("gastosGeneralesEscenarioLE")[i].innerHTML= ' ';
					retorno [i]= true; 
				}	
		}else{//es vacio	  		
				document.getElementsByName("gastosGeneralesEscenario")[i].setAttribute('style', 'border-color: #a94442');
				document.getElementsByName("gastosGeneralesEscenarioLE")[i].innerHTML ='Este campo no puede ser vacio';
				retorno [i]= false;
		}

	}
	return retorno; 	

}