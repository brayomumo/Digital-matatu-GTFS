from django.shortcuts import render
from opencage.geocoder import OpenCageGeocode
from.models import datatable,areaQuestionData,finalData,allData
import json
from django.http import JsonResponse

# Create your views here.


def index(request):
    questions = allData.objects.all()
    allQuestions = []
    for i in questions:
        p1 = i.question_text
        allQuestions.append(p1)

    allQuestions =list(set(allQuestions))
    ids = []
    count = 0
    for x in allQuestions:
        count +=1
        ids.append(count)

    data = zip(allQuestions, ids)
    return render(request, 'index.html', {"questions":data})


def getData(request):
    data =  (
        "Mathare", "Kawangware",  "Babadogo",  "Kibera")
    geocoordinates = []
    key = '924eb5531844414cbfacb5d56b13a7b9'
    geocoder = OpenCageGeocode(key)
    for d in data:
        query = d + ' ,kenya'
        # print(query)
        results = geocoder.geocode(query)
        NewList = results[0]['geometry']['lat'] , results[0]['geometry']['lng']
        geocoordinates.append(NewList)
    
    cleanedData = []
    places = areaQuestionData.objects.all()
    for i in places:
       cleanedData.append(i.Choice_text)

    organisedData = set(cleanedData)

    radius = []
    data = []
    for p in organisedData:
        query = p + ' ,kenya'
        results = geocoder.geocode(query)
        coordinates = results[0]['geometry']['lat'] , results[0]['geometry']['lng']
        count = cleanedData.count(p)
        p1 = finalData(p, coordinates,count)
        data.append(p1)
        radius.append(count)

    print("Getting data .....")
    areaData = json.dumps([ob.__dict__ for ob in data])

    # print(radius)
    # zipObject = zip(organisedData, radius)
    # dataDictionary = dict(zipObject)
    # print(dataDictionary)

    # areaData = json.dumps(dataDictionary)
    loaded = json.loads(areaData)
    return JsonResponse(loaded, safe=False)


