from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="home"),
    url(r'^getdata', views.getData, name="home"),
]
