from django.contrib import admin
from .models import Post, EstacionMeteorologica, Cultivo, Suelo, TipoCultivar, InicialH20, InicialNO3, Riego, Fertilizante, AplicacionF
from .models import Administrativo_procesamiento, Administrativo_contador

admin.site.register(Post)
admin.site.register(EstacionMeteorologica)
admin.site.register(Cultivo)
admin.site.register(Suelo)
admin.site.register(TipoCultivar)
admin.site.register(InicialH20)
admin.site.register(InicialNO3)
admin.site.register(Riego)
admin.site.register(Fertilizante)
admin.site.register(AplicacionF)
admin.site.register(Administrativo_procesamiento)
admin.site.register(Administrativo_contador)