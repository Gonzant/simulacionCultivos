function cargarParrafos(){										
	for (i = 0; i < escenarios.length; i++) { 						
		var para = document.createElement("P");
		var paraCE = document.createElement("P");

		var textoCE = "Para el escenario " + escenarios[i].nombre + " hay una probabilidad de 50% de obtener rindes por encima de "+escenarios[i].mediana+"Kg/ha. Por otro lado, 3 de cada 4 años se obtienen rindes por encima de "+escenarios[i].base+"Kg/ha, la probabilidad es de 75%, y una vez cada 4 años rindes por encima de "+escenarios[i].mayor + "Kg/ha (25%).";
		var texto = "El gráfico muestra que en el escenario " + escenarios[i].nombre + " hay un 50% de chances de que el rendimiento esté entre " + escenarios[i].whiskMenor +" y "+ escenarios[i].whiskMayor +" Kg/ha (límites de la “Caja”). Por otro lado la chance de obtener "+escenarios[i].mediana+" Kg/ha o más es de 50%, es decir se puede esperar que en la mitad de los años el rendimiento sea por lo menos "+escenarios[i].mediana+" Kg/ha.  La probabilidad de obtener " + escenarios[i].whiskMenor +" Kg/ha o menos es de 25%, es decir una vez cada 4 años se pueden esperar rendimientos menores a "+escenarios[i].whiskMenor+" Kg/ha. Lo mismo sucede con rendimientos superiores a " +escenarios[i].whiskMayor+" Kg/ha.";								
		var t = document.createTextNode(texto);  
		var tCE = document.createTextNode(textoCE);       				
		para.appendChild(t);  
		paraCE.appendChild(tCE);				
		document.getElementById("datosBoxplot").appendChild(para); 
		document.getElementById("datosCurvaExedencia").appendChild(paraCE);				
	}					
};

function etiquetaCultivo(c){
	for (var l = 0;l<cultivos.length;l++){
		if (c===cultivos[l].valor){
			return cultivos[l].nombre;
		}
	}
};

function etiquetaSuelo(s){	
	console.log('suelos');
	console.log(suelos);		
	for (var l = 0;l<suelos.length;l++){
		if (s===suelos[l].valor){
			return suelos[l].etiqueta;
		}
	}
};

function etiquetaRiego(r){
	var rieg = "";
	if (r=='0'){
		rieg = "No";
	}else{
		rieg = "Automático";
	}
	return rieg;
};

function cargarEscenarios(){
	var table = document.getElementById("tEscenarios");						
				
	for (i=0;i<escenarios.length;i++){
		var row = table.insertRow(i+1);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		

		// Add some text to the new cells:
		cell1.innerHTML = escenarios[i].nombre;
		cell2.innerHTML = etiquetaCultivo(escenarios[i].cultivo);
		cell3.innerHTML = etiquetaSuelo(escenarios[i].cultivoTCultivar);
		cell4.innerHTML = etiquetaRiego(escenarios[i].riego);
		console.log(escenarios[i]);
		cell5.innerHTML = "<button type=\"button\" class='btn btn-primary' onclick='setearCookie("+i+")'>Modificar</button>";			
	}

	if (escenarios.length<5){
		var row = table.insertRow(escenarios.length+1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = "";
		cell2.innerHTML = "";
		cell3.innerHTML = "";
		cell4.innerHTML = "";
		cell5.innerHTML = "<button class='btn btn-primary' onclick='agregarNuevoEscenario()'>Agregar escenario</button>";	
		
	}
};

function agregarNuevoEscenario(){
	setearCookie('NuevoEscenario');
};

function setearCookie(esc){
	console.log("esc");
	console.log(esc);	
	//document.cookie = escenarios[esc];						
	var cookie = ['escenarios', '=', JSON.stringify(escenarios),'; path=/;'].join('');					
	document.cookie = cookie;
	window.location = "./?modificar="+ esc;	
};			

function read_cookie() {
	var result = document.cookie.match(new RegExp('escenarios' + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
};

function calcularMargenBruto(){
	var dir = document.getElementsByName('dirEscenario')[0].value;
	var danios = document.getElementsByName('aEscenario');
	console.log(dir);
	var cookieEscenarios = ['escenarios', '=', JSON.stringify(escenarios),'; path=/;'].join('');					
	document.cookie = cookieEscenarios;			
	var nombres = "";
	var anios = "";
	var noms  = "nombreEscenario=";						
	for (var n=0;n<escenarios.length;n++){
		if (n!==0){
			nombres = nombres + "&";
			anios = anios +"&";
		};
		nombres = nombres + noms + escenarios[n].nombre;
		anios = anios + "aEscenario=" + danios[n].value;
	};
	window.location.href = "margenBruto?dirEscenario=" + dir + "&" + nombres + "&" + anios;	
};


$(document).ready(function() {
	// alert("document cargo - show graphic - ready");
	 $('#modalCargando').modal('hide');
});