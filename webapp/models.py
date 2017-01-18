from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from django import forms

class Post(models.Model):
	author = models.ForeignKey('auth.User')
	title = models.CharField(max_length=100)
	text = models.TextField()
	created_date = models.DateTimeField(
			default=timezone.now, null=True)
	published_date = models.DateTimeField(
			blank=True, null=True)
	def publish(self):
		self.published_date = timezone.now()
		self.save()
	def __str__(self):
		return self.title

class EstacionMeteorologica(models.Model):
	nombre = models.TextField()
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	desde = models.IntegerField()
	hasta = models.IntegerField()	
	def __str__(self):
		return self.nombre						
		
class Suelo(models.Model):
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre
		
class TipoCultivar(models.Model):
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre	

class InicialNO3(models.Model):	
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)	
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre
		
class InicialH20(models.Model):
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre	

class Cultivo(models.Model):
	nombre = models.CharField(max_length=100)	
	value = models.CharField(max_length=5)	
	suelos = models.ManyToManyField(Suelo)	
	tipo_cultivares = models.ManyToManyField(TipoCultivar)
	h2os = models.ManyToManyField(InicialH20)
	no3s = models.ManyToManyField(InicialNO3)
	def __str__(self):
		return self.nombre	

class Riego(models.Model):
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre	
		
class Fertilizante(models.Model):
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre	
		
class AplicacionF(models.Model):
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	valor = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre

class Administrativo_procesamiento(models.Model):	
	procesamiento = models.IntegerField()
	def __str__(self):
		return str(self.procesamiento)

class Administrativo_contador(models.Model):	
	contador = models.IntegerField()
	usado = models.IntegerField()
	def __str__(self):
		return str(self.contador)
            
class Tipo_suelo_f1(models.Model):	
	nombre = models.CharField(max_length=1000)
	etiqueta = models.CharField(max_length=1000)
	def __str__(self):
		return self.nombre
            
class Tipo_suelo_f2(models.Model):	
	nombre = models.CharField(max_length=100)
	etiqueta = models.CharField(max_length=100)
	def __str__(self):
		return self.nombre
