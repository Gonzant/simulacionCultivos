from django.shortcuts import render, render_to_response, redirect
from django.utils import timezone
from django.conf import settings
from .models import Post, EstacionMeteorologica, Cultivo, Riego, Fertilizante, AplicacionF
from .models import Administrativo_procesamiento, Administrativo_contador
import os
import sys
import subprocess
import shutil
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import time
import datetime
import glob
from scipy.stats import rankdata #to make a rank to create yield exceedance curve

#Inicializacion de Variables
nombre_aplicacion = "webapp"

# Funciones auxiliares
def dateToJulian(fecha):
	fmt = '%Y-%m-%d'
	fechaAnioActual = str(datetime.date.today().year) + fecha[4:]	
	dt = datetime.datetime.strptime(fecha, fmt)
	tt = dt.timetuple()	
	return tt.tm_yday
	
def get_soil_IC(ID_SOIL):	
    SOL_file = os.path.join(settings.BASE_DIR, "input", "DSS_minimum_inputs", "UY.SOL")
    #initialize
    depth_layer=[]
    ll_layer=[]
    ul_layer=[]
    n_layer=0
    soil_flag=0
    count=0
    fname = open(SOL_file,"r") #opens *.SOL
    print('ID_SOIL')
    print(ID_SOIL)
    for line in fname:
        if ID_SOIL in line:
            soil_depth=line[33:36]
            print('soil_depth',soil_depth)
            soil_flag=1
        if soil_flag == 1:
            print (line)
            count=count+1
            if count >= 7:
                print(count)
                print(line)
                print('fin',line[3:6])
                depth_layer.append(int(line[0:6]))
                ll_layer.append(float(line[13:18]))
                ul_layer.append(float(line[19:24]))
                n_layer=n_layer+1
                if line[3:6] == soil_depth:
                    yield depth_layer
                    yield ll_layer
                    yield ul_layer
                    yield n_layer
                    fname.close()
                    break
					
def P_procesamiento():	
	procesamiento = Administrativo_procesamiento.objects.filter(procesamiento=0)		
	while(len(procesamiento) == 0):
		print('Espera procesamiento')
		time.sleep(10)		
		procesamiento = Administrativo_procesamiento.objects.filter(procesamiento=0)		
	procesamiento.update(procesamiento = 1)
	
def P_contador():	
	contador = Administrativo_contador.objects.filter(usado=0)	
	while(len(contador) == 0):
		print('Espera contador')
		time.sleep(10)
		contador = Administrativo_contador.objects.filter(usado=0)		
	contador.update(usado = 1)	
	
def V_procesamiento():
	procesamiento = Administrativo_procesamiento.objects.filter(procesamiento=1).update(procesamiento=0)
	
def V_contador():
	contador = Administrativo_contador.objects.filter(usado=1).update(usado=0)	

def completarCeros(string):	
	while (len(string)<4):
		string = '0' + string	
	return string

def check_text_number_space(text):
	ret = True
	text_sinespacio = text.replace(" ", "")	
	return ret
		
def check_text(text):	
	return text.isalpha()

def check_number(text):	
	return text.isdigit()

def check_number_float(text):	
	return text.replace(".", "", 1).isdigit()	

def check_text_number(text):
	return text.isalnum()

def check_lenght(text, num):	
	largo = False
	if len(text) == num:
		largo = True
	return largo

def check_date(text):
	ret = True
	print ('ckd',text)
	listDate = text.split('-')
	if (len(text)!=10) or (len(listDate)!=3):
		print('1')
		return False
	if not (check_number(listDate[0]) and check_lenght(listDate[0], 4)):
		print('2')
		return False
	if not (check_number(listDate[1]) and check_lenght(listDate[1], 2)):
		print('3')
		return False
	if not (check_number(listDate[2]) and check_lenght(listDate[2], 2)):
		print('4')
		return False	
	return ret

def validacion(opcion , req):	
	retVal = True
	if (opcion == 'postList'):
		for v in range(len(req.GET.getlist("nombreEscenario"))):

			print(req.GET.getlist("nombreEscenario")) # falta validar

			if not (check_text(req.GET.getlist("estMeteorologica")[v]) and check_lenght(req.GET.getlist("estMeteorologica")[v],4)):
				retVal = False
			print(retVal)
			if not (check_text(req.GET.getlist("cultivo")[v]) and check_lenght(req.GET.getlist("cultivo")[v],2)):
				retVal = False
			print(retVal)
			if not (check_text_number(req.GET.getlist("cultivoTSuelo")[v]) and check_lenght(req.GET.getlist("cultivoTSuelo")[v],10)):
				retVal = False
			print(retVal)
			if not (check_text_number(req.GET.getlist("cultivoTCultivar")[v]) and check_lenght(req.GET.getlist("cultivoTCultivar")[v],6)):
				retVal = False	
			print(retVal)
			if not (check_number(req.GET.getlist("fInicioSim")[v]) and check_lenght(req.GET.getlist("fInicioSim")[v],4)):
				retVal = False	
			print(retVal)
			if not (check_number(req.GET.getlist("fFinSim")[v]) and check_lenght(req.GET.getlist("fFinSim")[v],4)):
				retVal = False
			print(retVal)
			if not (check_number_float(req.GET.getlist("cultivoNHumedad")[v])):
				retVal = False
			print('wadadw',retVal)
			if not (check_text(req.GET.getlist("cultivoNO3")[v]) and check_lenght(req.GET.getlist("cultivoNO3")[v],1)):
				retVal = False		
			print(retVal)
			if not (check_date(req.GET.getlist("cultivoFSiembra")[v])):
				retVal = False
			if not (check_number(req.GET.getlist("fertilizacionSiembraDias")[v]) or check_lenght(req.GET.getlist("fertilizacionSiembraDias")[v],0)):
				retVal = False	
			print('fs',retVal)
			if not (check_number_float(req.GET.getlist("fertilizacionSiembraCantidad")[v]) or check_lenght(req.GET.getlist("fertilizacionSiembraCantidad")[v],0)):
				retVal = False										
			print(retVal)
			if not (check_number(req.GET.getlist("fertilizacion1Dias")[v]) or check_lenght(req.GET.getlist("fertilizacion1Dias")[v],0)):
				retVal = False				
			if not (check_number_float(req.GET.getlist("fertilizacion1Cantidad")[v]) or check_lenght(req.GET.getlist("fertilizacion1Cantidad")[v],0)): 
				retVal = False
			if not (check_number(req.GET.getlist("fertilizacion2Dias")[v]) or check_lenght(req.GET.getlist("fertilizacion2Dias")[v],0)):
				retVal = False				
			print(retVal)
			if not (check_number_float(req.GET.getlist("fertilizacion2Cantidad")[v]) or check_lenght(req.GET.getlist("fertilizacion2Cantidad")[v],0)): 
				retVal = False
			print(retVal)
			if not (check_number(req.GET.getlist("riego")[v]) and check_lenght(req.GET.getlist("riego")[v],1)):
				retVal = False				
	return retVal

def run_dssat(dir, dirInputDSS, listaArchivos):
	#entries = ("AveStress.txt", "SumStress.txt", "YIELD.txt","PgtTHRESHPct.txt","PlantGro.OUT","Evaluate.OUT",
	entries = ("ET.OUT", "PlantGro.OUT", "PlantN.OUT", 
				"SoilNi.OUT", "SoilTemp.OUT", "SoilWat.OUT", "Weather.OUT",
				"Mulch.OUT", "Evaluate.OUT", "OVERVIEW.OUT",
				"SolNBalSum.OUT", "SoilNiBal.OUT", "SoilNoBal.OUT", "SoilWatBal.OUT",
				"Summary.OUT", "INFO.OUT")
	
	for a in listaArchivos:			
		P_procesamiento()
		writeDV4_main(dirInputDSS, a)		
		#==RUN DSSAT with ARGUMENT
		
		if os.name == 'nt':
			exe = 'DSCSM046_W.EXE'
		else:
			exe = './DSCSM046.EXE'
		args = exe + " B DSSBatch.v46"
		#Run executable with argument
		try:
			subprocess.call(args, cwd= os.path.join(settings.BASE_DIR, "input", "DSS_minimum_inputs"), shell=True)		
			#creo la carpeta del escenario dentro de los escenarios del usuario
			carpetaContador = a[4:8]
			home_escenario = os.path.join(dir, carpetaContador)
			os.makedirs(home_escenario)
			for entry in entries:
				source_file= os.path.join(dirInputDSS, entry)
				shutil.move(source_file, home_escenario)
			V_procesamiento()
		except:
			#Si ocurre un error libero el semaforo de procesamiento
			print "Unexpected error:", sys.exc_info()[0]
			V_procesamiento()

def writeDV4_main(dirInputDSS,nombreArchivo):
	temp_dv4 = os.path.join(dirInputDSS, "DSSBatch_TEMP.v46")	
	dv4_fname = os.path.join(dirInputDSS, "DSSBatch.v46")
	fr = open(temp_dv4, "r") #opens temp DV4 file to read
	fw = open(dv4_fname, "w")
	#read template and write lines
	for line in range(0,10):
		temp_str=fr.readline()
		fw.write(temp_str)		

	temp_str = fr.readline()
	new_str = nombreArchivo + temp_str[12:]
	fw.write(new_str)
	fr.close()
	fw.close()

def graficasYield(directorioEscenario, anios, nombreEscenarios ):
	fname = []
	scename = nombreEscenarios   #scenario name	
	nyears = anios
	listaEscenarios = os.listdir(directorioEscenario)		
	count=0
	
	for escenario in listaEscenarios:
		fname.append(os.path.join(directorioEscenario, escenario, "Summary.OUT"))		
		count = count+1
		
	max_nyears = int(max(nyears))

	#create an empty matrix
	yield_data = np.empty((max_nyears,count))
	yield_data[:] = np.NAN
	
	sorted_yield_data = np.empty((max_nyears,count))
	sorted_yield_data[:] = np.NAN
	excedp_data = np.empty((max_nyears,count))
	excedp_data[:] = np.NAN

	#Read Summary.out from all scenario output
	for x in range(0, count):
		fr = open(fname[x],"r") #opens summary.out to read
		yield_list=[]
		for line in range(0,4): #read headers
			temp_str=fr.readline()
		for line in range(0,int(nyears[x])): #read actual simulated data
			temp_str=fr.readline()
			yield_data[line,x]=int(temp_str[164:170])
			yield_list.append(int(temp_str[164:170]))
			print(yield_list)
		fr.close()
						
		yield_array = np.array(yield_list)  #convert list to array
		#compute rank using rankdata(note: The default assigns the average rank to the tied values:)
		rank_yield=rankdata(yield_array) #from smallest to largest
		rank_yield=max_nyears - rank_yield + 1  #from  largest (has rank=1) to smallest value

		#exceedance probability; p=m/(n+1) where m is the rank from above, n is total number of data
		excedp=rank_yield/(max_nyears+1)

		#sort yield from smallest to largest
		sorted_yield=np.sort(yield_array)
		#get index of sorted array
		sort_index = np.argsort(yield_array)

		sorted_excedp=[]
		for i in range(yield_array.__len__()):
			sorted_excedp.append(excedp[sort_index[i]])
		excedp_array = np.array(sorted_excedp)  #convert list to array

		#save into one matrix
		sorted_yield_data[:,x]=sorted_yield
		excedp_data[:,x]=excedp_array

	#X data for plot
   # myXList=[i+1 for i in range(3)]
	myXList=[i+1 for i in range(count)]

	#Plotting 1
	fig = plt.figure()
	fig.suptitle('Rendimiento estimado', fontsize=14, fontweight='bold')

	ax = fig.add_subplot(111)
	#fig.subplots_adjust(top=0.85)
	#ax.set_title('Yield Forecast')
	ax.set_xlabel('Escenario',fontsize=14)
	ax.set_ylabel('Rendimiento [kg/ha]',fontsize=14)
		
	# Plot a line between the means of each dataset
	#plt.plot(myXList, obs, 'go-')
	resultB1 = ax.boxplot(yield_data, labels=scename, showmeans=True, meanline=True, meanprops ={'color':'green'}) #, notch=True, bootstrap=10000)
	plt.savefig(os.path.join(directorioEscenario, "boxplot.png"))	
		
	listMean = []
	listMediana = []
	listWhiskersMenor = []
	listWhiskersMayor = []
	listBase = []
	listMayor = []		
		
	#faltan 4 valores mas
	for x in range(0, count):
		listMean.append(int(round(resultB1["means"][x].get_data()[1][0],-1)))
		listMediana.append(int(round(resultB1["medians"][x].get_data()[1][0],-1)))
		listWhiskersMenor.append(int(round(resultB1["whiskers"][x*2].get_data()[1][0],-1)))
		listWhiskersMayor.append(int(round(resultB1["whiskers"][x*2+1].get_data()[1][0],-1))) 
		listBase.append(int(round(resultB1["whiskers"][x*2].get_data()[1][1],-1)))
		listMayor.append(int(round(resultB1["whiskers"][x*2+1].get_data()[1][1],-1)))		
	
	#Plotting 2
	fig = plt.figure()
	fig.suptitle('Curva de excedencia del rendimiento', fontsize=14, fontweight='bold')

	ax = fig.add_subplot(111)
	#fig.subplots_adjust(top=0.85)
	#ax.set_title('Yield Forecast')
	ax.set_xlabel('Rendimiento [kg/ha]',fontsize=14)
	ax.set_ylabel('Probabilidad de excedencia [-]',fontsize=14)

	for x in range(0, count):
		ax.plot(sorted_yield_data[:,x],excedp_data[:,x],'o-', label=scename[x])
##        #legend = ax.legend(loc='lower left', shadow=True, fontsize='large') #loc=0 => best location
	# Shrink current axis by 15%
	box = ax.get_position()
	ax.set_position([box.x0, box.y0, box.width * 0.85, box.height])

	# Put a legend to the right of the current axis
	ax.legend(loc='center left', bbox_to_anchor=(1, 0.5))
	plt.savefig(os.path.join(directorioEscenario, "curvaPExcedencia.png"))
	return ([listMean,listMediana,listWhiskersMenor,listWhiskersMayor,listBase,listMayor])


# Controlador
def post_list(request):
	posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')	
	estaciones = EstacionMeteorologica.objects.all()
	cultivos = Cultivo.objects.all()
	riegos = Riego.objects.all()
	fertilizantes = Fertilizante.objects.all()
	aplicaciones = AplicacionF.objects.all()
	return render(request, 'webapp/post_list.html', {'posts': posts, 'estaciones': estaciones, 'cultivos':cultivos, 'riegos':riegos, 'fertilizantes':fertilizantes, 'aplicaciones':aplicaciones})
	
def btnDSSAT(request):	
	home_input = os.path.join(settings.BASE_DIR, "input", "DSS_minimum_inputs")
	home_output = os.path.join(settings.BASE_DIR, "output")
	fechaActual = time.strftime("%Y%m%d%H%M%S")	
	# Creo el directorio en output	
	dirEscenario = os.path.join(home_output, fechaActual)
	print(dirEscenario)
	os.makedirs(dirEscenario)	

	# Se realiza la validacion
	val = validacion('postList', request)
	if not (val):
		#return render(request, 'webapp/show_graphics.html', {'dir': 'output/' +fechaActual, 'nombreEscenarios': nombreEscenarios, 'aniosEscenarios': cantidadAniosEscenarios, 'resultPlot':resultPlot, 'cultivos':cultivos})	
		print('fallo validacion')
	else :
		# Obtengo cantidad de escenarios
		nombreEscenarios = request.GET.getlist("nombreEscenario")
		cantidadEscenarios = len(request.GET.getlist("nombreEscenario"))
		print(cantidadEscenarios)
		cantidadAniosEscenarios = []
		print(request.GET.getlist("cultivoNHumedad"))
		for nEscenario in range(cantidadEscenarios):
			# Obtengo variables de la pagina		
			estacion = request.GET.getlist("estMeteorologica")[nEscenario]		
			# Cultivo
			cultivo = request.GET.getlist("cultivo")[nEscenario]
			tipoSuelo = request.GET.getlist("cultivoTSuelo")[nEscenario]
			tipoCultivar = request.GET.getlist("cultivoTCultivar")[nEscenario]
			desdeAnioSimulacion = request.GET.getlist("fInicioSim")[nEscenario]
			hastaAnioSimulacion = request.GET.getlist("fFinSim")[nEscenario]
			nivelHumedad = request.GET.getlist("cultivoNHumedad")[nEscenario]		
			no3Inicial = request.GET.getlist("cultivoNO3")[nEscenario]
			fechaSiembra = request.GET.getlist("cultivoFSiembra")[nEscenario]
			#Fertilizacion		
			fertilizaciones = []
			diasDespuesSiembra0 = request.GET.getlist("fertilizacionSiembraDias")[nEscenario]
			cantidadFertilizante0 = request.GET.getlist("fertilizacionSiembraCantidad")[nEscenario]
			if diasDespuesSiembra0 != "":
				fertilizaciones.append((diasDespuesSiembra0,cantidadFertilizante0))
			diasDespuesSiembra1 = request.GET.getlist("fertilizacion1Dias")[nEscenario]
			cantidadFertilizante1 = request.GET.getlist("fertilizacion1Cantidad")[nEscenario]
			if diasDespuesSiembra1 != "":
				fertilizaciones.append((diasDespuesSiembra1,cantidadFertilizante1))
			print(request.GET.getlist("fertilizacion2Dias"))
			diasDespuesSiembra2 = request.GET.getlist("fertilizacion2Dias")[nEscenario]
			cantidadFertilizante2 = request.GET.getlist("fertilizacion2Cantidad")[nEscenario]
			if diasDespuesSiembra2 != "":
				fertilizaciones.append((diasDespuesSiembra2,cantidadFertilizante2))
			#Riego
			riego = request.GET.getlist("riego")[nEscenario]
			#metodoRiego = request.GET.getlist("NombreEscenario")[nEscenario]
			# Escenario	
			nombreEscenario = request.GET.getlist("nombreEscenario")[nEscenario]
			
			#precioGranoEscenario = request.GET['precioGranoEscenario']
			#precioFertilizanteEscenario = request.GET['precioFertilizanteEscenario']
			#costeRiegoEscenario = request.GET['costeRiegoEscenario']
			#gastosGeneralesEscenario = request.GET['gastosGeneralesEscenario']
			#descripcionEscenario = request.GET['descripcionEscenario']
			
			# Se abre al template UYXXTEMP.SNX
			fr = open(os.path.join(home_input,'UY' + cultivo + 'TEMP.SNX'),"r") #opens temp SNX file to read				
			
			listaArchivos = []
			
			# Paro los demas contadores
			P_contador()
			
			# Obtengo contador escenarios			
			contador = completarCeros(str(Administrativo_contador.objects.all().first()))	
			
			#Sumo uno al contador				
			Administrativo_contador.objects.filter(usado=1).update(contador = int(contador) + 1)

			V_contador()

			# Mod 10000 para que vuelva  a 0 luego de 9999
			print('contador')		
			contador = completarCeros(str(int(contador) % 10000))
			
			archivoSNX = 'UY' + cultivo + contador + '.SNX'
			listaArchivos.append(archivoSNX)
			
			fw = open(os.path.join(home_input, archivoSNX),"w")	
					
			#===set up parameters
			MI = '0'  #should be one character
			if (len(fertilizaciones)>0):
				MF = '1'
			else: 
				MF = '0'		
			INGENO = tipoCultivar #self.cul_type.getvalue()[0][0:6] #'UY0371' #cultivar type
			WSTA = estacion #'UYTT'	
			ID_SOIL = tipoSuelo   #self.soil_type.getvalue()[0][0:10] #'UYSN0P2304'		
			plt_date = str(dateToJulian(fechaSiembra)) #'258' 
			print (plt_date)
			start_year = desdeAnioSimulacion #'2002'			
			temp = int(plt_date)-1  #initial condition: 1 day before planting	
			ICDAT = start_year[2:]+repr(temp).zfill(3)  #for some reason, str() is not working	
			i_NO3 = no3Inicial  #self.NO3_soil.getvalue()[0][0:1] #'H' #or 'L'
			SNH4 = 1.5  #**EJ(5/27/2015) followed by Walter's UYMZDSS6.SNX
			
			PDATE=start_year[2:]+plt_date.zfill(3)
			FDATE1=diasDespuesSiembra1 #'0'
			FDATE2=diasDespuesSiembra2 #'60' -> ver como hacer el 2do
			FAMN1=cantidadFertilizante1 #'50'  #1st fertilizer application amount
			FAMN2=cantidadFertilizante2 #'90'  #2nd fertilizer application amount
			#if self.fert_mat1.getvalue()[0] != 'None':
			FMCD = 'FE001'  #fertilizer method
			#if self.fert_mat2.getvalue()[0] != 'None':
			#FMCD2= tipoFertilizacion2  #fertilizer method
			#if self.fert_app1.getvalue()[0] != 'None': -> hay que ver como preguntar cuantas aplicaciones de fertilizante son
			FACD = 'AP001' #application method
			#else: 
			#	FACD1= '-99'
			#if self.fert_app2.getvalue()[0] != 'None':
			#FACD2=aplicacionFertilizacion2 #application method
			#else: 
			#	FACD2= '-99'

			temp=int(plt_date)-3 #EJ(6/9/2015) #simuation starting date
			SDATE=start_year[2:]+repr(temp).zfill(3)
			end_year = hastaAnioSimulacion
			NYERS=repr(int(end_year)-int(start_year)+1) #'12'
			
			print(NYERS)
			
			cantidadAniosEscenarios.append(NYERS)
			print("cantidadAniosEscenarios")
			print(cantidadAniosEscenarios)
			if riego == '1':
				IRRIG='A'  #automatic, or 'N' (no irrigation)
			else:
				IRRIG='N'  #automatic, or 'N' (no irrigation)
			if MF == '1':
				FERTI='D' # 'D'= Days after planting, 'R'=on report date, or 'N' (no fertilizer)
			else:
				FERTI='N'
			print("nivelHumedad")
			print(nivelHumedad)
			print(float(nivelHumedad))
			IC_w_ratio = float(nivelHumedad) #float(self.wet_soil.getvalue()[0][0:3]) #0.1
			IMETH = 'IR001' #irrigation method
			#===end of setting up paramters
			
			#read lines 1-9 from temp file
			for line in range(0,12):
				temp_str=fr.readline()
				fw.write(temp_str)

			#write *TREATMENTS 
			temp_str=fr.readline()
			new_str=temp_str[0:51] + MI + temp_str[52:]
			new_str=new_str[0:54] + MF + temp_str[55:]
			fw.write(new_str)

			#read lines from temp file
			for line in range(0,3):
				temp_str=fr.readline()
				#print temp_str
				fw.write(temp_str)
			#write *CULTIVARS
			temp_str=fr.readline()
			#new_str=temp_str[0:3] + Cr_type + temp_str[5:6] + INGENO + temp_str[12:]
			new_str=temp_str[0:6] + INGENO + temp_str[12:]
			fw.write(new_str)

			#read lines from temp file
			for line in range(0,3):
				temp_str=fr.readline()
				fw.write(temp_str)
			#write *FIELDS   
			temp_str=fr.readline()
			new_str=temp_str[0:3] + WSTA + temp_str[7:]
			new_str=new_str[0:12] + WSTA + temp_str[16:]
			new_str=new_str[0:69] + ID_SOIL + temp_str[79:]
			fw.write(new_str)

			#read lines from temp file
			for line in range(0,5):
				temp_str=fr.readline()
				fw.write(temp_str)
			#write *INITIAL CONDITIONS   
			temp_str=fr.readline()
			new_str=temp_str[0:9] + ICDAT + temp_str[14:]
			fw.write(new_str)
			temp_str=fr.readline() #@C  ICBL  SH2O  SNH4  SNO3 
			fw.write(temp_str)

			#Get soil info from *.SOL
			soil_depth, wp, fc, nlayer = get_soil_IC(ID_SOIL)  
			temp_str=fr.readline()
			print("nlayer", nlayer)		
			print("i_NO3",i_NO3)
			print("ID_SOIL",ID_SOIL)
			for nline in range(0,nlayer):
				print("nline",nline)
				if nline == 0:  #first layer
					temp_SH2O=IC_w_ratio*(fc[nline]- wp[nline])+ wp[nline]#EJ(6/25/2015): initial AWC=70% of maximum AWC
					# SH2O=0.7*(float(fc[nline])- float(wp[nline]))+ float(wp[nline])#EJ(6/25/2015): initial AWC=70% of maximum AWC
					if i_NO3 == 'A': #'H': High -> Alto
						if ID_SOIL == 'UYSN0H0806':
							SNO3='14'  #**EJ(8/14/2015
						else:
							SNO3='15'  #**EJ(8/14/2015
					elif i_NO3 == 'B': #'L': Low -> Bajo
						SNO3='5'  #**EJ(5/27/2015)				                 
				elif nline == 1:  #second layer
					temp_SH2O=IC_w_ratio*(fc[nline]- wp[nline])+ wp[nline]#EJ(6/25/2015): initial AWC=70% of maximum AWC
					if i_NO3 == 'A': #'H': High -> Alto
						if ID_SOIL[6:]== '0806':  #ID_SOIL == 'UYSN0H0806':
							SNO3='0.0'  #**EJ(8/14/2015
						elif ID_SOIL[6:]== '2002':  #'UYSN0N2002':
							SNO3='8.5'  
						elif ID_SOIL[6:]== '2304':  #UYSN0P2304':
							SNO3='2.9'  
						elif ID_SOIL[6:]== '1903':  #UYSN0P1903':
							SNO3='13.9' 
						elif ID_SOIL[6:]== '1706':  #UYSN0N1706':
							SNO3='7.4'					
					elif i_NO3 == 'B': #'L': Low -> Bajo
						if ID_SOIL[6:]== '0806':  #ID_SOIL == 'UYSN0H0806':
							SNO3='0.2'  #**EJ(8/14/2015
						elif ID_SOIL[6:]== '2002':  #'UYSN0N2002':
							SNO3='4.6'  
						elif ID_SOIL[6:]== '2304':  #UYSN0P2304':
							SNO3='1.9'  
						elif ID_SOIL[6:]== '1903':  #UYSN0P1903':
							SNO3='7.3' 
						elif ID_SOIL[6:]== '1706':  #UYSN0N1706':
							SNO3='3.6'									
				else:
					temp_SH2O=fc[nline] #float
					SNO3='0'  #**EJ(5/27/2015)

				SH2O=repr(temp_SH2O)[0:5]  #convert float to string
				new_str=temp_str[0:5] + repr(soil_depth[nline]).rjust(3) + ' ' + SH2O.rjust(5) + temp_str[14:22]+ SNO3.rjust(4)+ "\n"
				fw.write(new_str)
			fw.write("  \n")

			for nline in range(0,10):
				temp_str=fr.readline()
				#print temp_str
				if temp_str[0:9] == '*PLANTING':
					break

			fw.write(temp_str) #*PLANTING DETAILS  
			temp_str=fr.readline() #@P PDATE EDATE
			fw.write(temp_str)
				
			#write *PLANTING DETAILS
			temp_str=fr.readline()
			new_str=temp_str[0:3] + PDATE + temp_str[8:]
			fw.write(new_str)

			#read lines from temp file
			for line in range(0,3):
				temp_str=fr.readline()
				fw.write(temp_str)
				
			#write *FERTILIZERS (INORGANIC)
			if (len(fertilizaciones)==0):
				temp_str=fr.readline()
				fw.write(temp_str)
				temp_str=fr.readline()
				fw.write(temp_str)
			else:
				temp_str=fr.readline()
				for i in range(len(fertilizaciones)):				
					new_str=temp_str[0:5] + fertilizaciones[i][0].rjust(3) + ' '+ FMCD.rjust(5)+' '+FACD.rjust(5)+temp_str[20:30]+ fertilizaciones[i][1].rjust(2) + temp_str[32:]				
					fw.write(new_str)
				temp_str=fr.readline()			

			#read lines from temp file
			for line in range(0,3):
				temp_str=fr.readline()
				fw.write(temp_str)
			#write *SIMULATION CONTROLS
			temp_str=fr.readline()
			new_str=temp_str[0:18] + NYERS.rjust(2) + temp_str[20:33]+ SDATE + temp_str[38:]
			fw.write(new_str)
			temp_str=fr.readline() #@N OPTIONS
			fw.write(temp_str)
			temp_str=fr.readline()  # 1 OP     
			fw.write(temp_str)
			temp_str=fr.readline()  #@N METHODS 
			fw.write(temp_str)
			temp_str=fr.readline()  # 1 ME      
			fw.write(temp_str)
			temp_str=fr.readline()  #@N MANAGEMENT 
			fw.write(temp_str)
			temp_str=fr.readline()  # 1 MA   
			new_str=temp_str[0:25] + IRRIG + temp_str[26:31]+ FERTI + temp_str[32:]
			fw.write(new_str)
			temp_str=fr.readline()  #@N OUTPUTS
			fw.write(temp_str)
			temp_str=fr.readline()  # 1 OU   
			fw.write(temp_str)

			#read lines from temp file
			for line in range(0,5):
				temp_str=fr.readline()
				fw.write(temp_str)
			#irrigation method
			temp_str=fr.readline()  #  1 IR 
			new_str=temp_str[0:39] + IMETH + temp_str[44:]
			fw.write(new_str)

			#read lines from temp file
			for line in range(0,7):
				temp_str=fr.readline()
				fw.write(temp_str)
				
			fr.close()
			fw.close()
			
		#====End of WRITE *.SNX
			#updated = Administrativo.objects.filter(Q(procesamiento=0)).update(contador = contador + 1 , procesamiento=1)
			#print (updated)
			run_dssat(dirEscenario, home_input, listaArchivos)		
		#return render(request, 'webapp/run_dssat.html', {})
		
		print(cantidadAniosEscenarios)
		resultPlot = graficasYield(dirEscenario, cantidadAniosEscenarios, nombreEscenarios)
		
		#Se pasan etiquetas de cultivos y riego
		cultivos = Cultivo.objects.all()
		riegos = Riego.objects.all()
		
		print('output/' +fechaActual)
		return render(request, 'webapp/show_graphics.html', {'dir': 'output/' +fechaActual, 'nombreEscenarios': nombreEscenarios, 'aniosEscenarios': cantidadAniosEscenarios, 'resultPlot':resultPlot, 'cultivos':cultivos})	
	
def margenBruto(request):
	print("Entra margen burto")	
	dirEscenario = os.path.normpath(request.GET['dirEscenario'])
	print(dirEscenario)
	pathCompleto = os.path.join(settings.BASE_DIR, dirEscenario)			
	print(pathCompleto)	
	listaTodo = os.listdir(pathCompleto)
	print(listaTodo)
	listaDir = []
	for i in listaTodo:
		dir = os.path.join(pathCompleto, i)
		if os.path.isdir(dir):
			listaDir.append(dir)							
	
	print (listaDir)		
		
	# le tengo qque pasar todos los escenarios y sus costos
	# los anioos de cada escenario
		
	nombreEscenarios = request.GET.getlist("nombreEscenario")
	precioGranoEscenarios = request.GET.getlist("precioGranoEscenario")
	precioFertilizanteEscenarios = request.GET.getlist("precioFertilizanteEscenario")
	costoRiegoEscenarios = request.GET.getlist("costeRiegoEscenario")
	gastosGeneralesEscenarios = request.GET.getlist("gastosGeneralesEscenario")
	aniosEscenarios = request.GET.getlist("aEscenario")
	
	fname=[]
	scename=[]   #scenario name
	nyears=[]
	costN_list=[]
	costI_list=[]
	costG_list=[]
	price_list=[]	
	count = len(nombreEscenarios)
	tienePrecio = (len(precioGranoEscenarios)!=0)
	resultPlotMB = []
	returnPrecios = []
	
	if (tienePrecio):
		for i in range(count):
			fname.append(os.path.join(listaDir[i], "Summary.OUT"))
			costN_list.append(precioFertilizanteEscenarios[i])
			costI_list.append(costoRiegoEscenarios[i])
			costG_list.append(gastosGeneralesEscenarios[i])
			price_list.append(precioGranoEscenarios[i])
			scename.append(nombreEscenarios[i])
			nyears.append(aniosEscenarios[i])
			
		max_nyears=int(max(nyears))
		returnPrecios = [costN_list, costI_list, costG_list, price_list];
		#create an empty matrix
		GMargin_data = np.empty((max_nyears,count))
		GMargin_data[:] = np.NAN
		#Read Summary.out from all scenario output
		for x in range(0, count):
			fr = open(fname[x],"r") #opens summary.out to read
			price=price_list[x]   #$/ton
			cost_N=costN_list[x] #$/kg N
			cost_I=costI_list[x] #$/mm irrigation cost
			cost_G=costG_list[x] #$/ha general cost
			for line in range(0,4): #read headers
				temp_str=fr.readline()
			for line in range(0,int(nyears[x])): #read actual simulated data
				temp_str=fr.readline()
				yield_out=float(temp_str[164:170])
				fert_amount=float(temp_str[278:284])  #NICM   Tot N app kg/ha Inorganic N applied (kg [N]/ha)    
				irr_amount=float(temp_str[224:230])   #IRCM   Irrig mm        Season irrigation (mm)   
				GMargin_data[line,x]=yield_out*float(price)*0.001 - float(cost_N)*fert_amount - float(cost_I)*irr_amount - float(cost_G)#$/ha
			fr.close()

		#X data for plot
	   # myXList=[i+1 for i in range(3)]
		myXList=[i+1 for i in range(count)]

		#Plotting
		fig = plt.figure()
		fig.suptitle('Margen Bruto', fontsize=14, fontweight='bold')

		ax = fig.add_subplot(111)
		#fig.subplots_adjust(top=0.85)
		#ax.set_title('Yield Forecast')
		ax.set_xlabel('Escenario',fontsize=14)
		ax.set_ylabel('Margen Bruto[US$/ha]',fontsize=14)
		
		# Plot a line between the means of each dataset
		#plt.plot(myXList, obs, 'go-')
		resultB2 = ax.boxplot(GMargin_data,labels=scename, showmeans=True, meanline=True, meanprops ={'color':'green'}) #, notch=True, bootstrap=10000)
		plt.savefig(os.path.join(pathCompleto, 'margenBruto.png'))
		
		print("boxplot result:")			
			
		print("whiscku")	
		print(resultB2["whiskers"][0].get_data()[1][0])	
		listMedianaMB = []
		listWhiskersMenorMB = []
		print(count)
		#faltan 4 valores mas
		for x in range(0, count):			
			listMedianaMB.append(int(round(resultB2["medians"][x].get_data()[1][0],-1)))
			listWhiskersMenorMB.append(int(round(resultB2["whiskers"][x*2].get_data()[1][0],-1)))	
		print("prueba2")
		print (listMedianaMB)
		print (listWhiskersMenorMB)
		resultPlotMB = [listMedianaMB,listWhiskersMenorMB]		
	
	#Se pasan etiquetas de cultivos y riego
	cultivos = Cultivo.objects.all()
	riegos = Riego.objects.all()

	return render(request, 'webapp/margen_bruto.html', {'dir': dirEscenario.replace("\\","/"),'nombreEscenarios': nombreEscenarios,'aniosEscenarios':aniosEscenarios,'resultPlot':resultPlotMB,'cultivos':cultivos, 'returnPrecios':returnPrecios})
