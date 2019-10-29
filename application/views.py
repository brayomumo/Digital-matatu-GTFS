from django.shortcuts import render
from opencage.geocoder import OpenCageGeocode
from.models import datatable

# Create your views here.


def index(request):
    return render(request, 'index.html')


def getData(request):
    data =  (
        "Mathare", "Kawangware",  "Babadogo",  "Kibera")
    geocoordinates = []
    key = '924eb5531844414cbfacb5d56b13a7b9'
    geocoder = OpenCageGeocode(key)
    for d in data:
        query = d + ' ,kenya'
        print(query)
        results = geocoder.geocode(query)
        NewList = results[0]['geometry']['lat'] , results[0]['geometry']['lng']
        geocoordinates.append(NewList)
        
    print(geocoordinates)
    return geocoordinates