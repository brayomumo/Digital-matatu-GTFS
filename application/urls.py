from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', views.index, name="home"),
    url(r'^getdata', views.getData, name="getData"),
    url(r'^ResponceOnClick/(\d+)', views.ResponceOnClick, name="ResponceOnClick"),
    url(r'^response//$', views.getResponse, name='getResponse'),
]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)