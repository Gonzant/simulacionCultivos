from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.post_list),
	url(r'^dssat$', views.run_dssat),	
	url(r'^btnDSSAT$', views.btnDSSAT),
	url(r'^margenBruto$', views.margenBruto),
]