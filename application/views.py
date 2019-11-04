from django.shortcuts import render
from opencage.geocoder import OpenCageGeocode
from.models import *
import json, random
from django.http import JsonResponse

# Create your views here.
'''
Getting locations
'''
key = '924eb5531844414cbfacb5d56b13a7b9'
geocoder = OpenCageGeocode(key)
locations = []
cleanedData = []
places = areaQuestionData.objects.all()
for i in places:
   cleanedData.append(i.Choice_text)

organisedData = set(cleanedData)


#getting coordinates
def findCoordinate(PlaceName):
    query = PlaceName + ' ,kenya'
    results = geocoder.geocode(query)
    coordinates = results[0]['geometry']['lat'] , results[0]['geometry']['lng']
    return coordinates


def index(request):
    count = 0
    questions = allData.objects.all()
    allQuestions = []
    for i in questions:
        p1 = i.question_text
        p6 = i.question_id
        zipped = (p6,p1)
        # zipped = list(zip(p1,p6))
        allQuestions.append(zipped)
    
    allQuestions =list(set(allQuestions))
    for u in organisedData:
        count +=1

    nam = "pekejeng"
    
   
    return render(request, 'index.html', {"questions":allQuestions}, {"totalLocations":count})

# def parca_kayit(request):
#     print("Accessing parca_kayit")
#     if request.method == 'POST':
#         pass
#     elif request.method == 'GET':
#         parca_turu = request.GET.get('parcaAdi') # we are getting selected item with this line. we defined 'parcaAdi' in ajax file
#         print(parca_turu) # write selected item to the terminal
#         # form = ParcaForm()
#         # context = {'form': form}
#         return render(request, 'Index.html')

def getData(request):
   
    geocoordinates = []    
    
    

    radius = []
    data = []
    for p in organisedData:
        coordinates = findCoordinate(p)
        count = cleanedData.count(p)
        p1 = finalData(p, coordinates,count)
        data.append(p1)
        radius.append(count)

  

    print("Getting data .....")
    areaData = json.dumps([ob.__dict__ for ob in data])
    loaded = json.loads(areaData)
    
  
   
    return JsonResponse(loaded, safe=False)



def ResponceOnClick(request, id):
    placeNames = list(organisedData)

    print(type(placeNames))
    print("Initializing second part-------------------------")
    choice_object = []
    majibu = choices.objects.filter(question_id = id)
    machoices = []
    for i in majibu:
        machoices.append(i.choice_text)

    for u in machoices:
        placeName = random.choice(placeNames)
        choicess = u
        coordinates = findCoordinate(placeName)
        appended = clickData(placeName,coordinates,choicess)
        choice_object.append(appended)
        print(type(choice_object))
        print("please wait ------------")
    
    choice_data = json.dumps([ob.__dict__ for ob in choice_object])
    print(choice_data)
    finalLoad = json.loads(choice_data)
    return JsonResponse(finalLoad, safe=False)



def getResponse(request, question):
    questions = datatable.objects.filter(question_text = question)
    print(questions)
    q_id = questions[0].question_id    
    responses = timelines.objects.filter(question_id=q_id)
    allResponse = []
    for i in responses:
        timeline = i.date_added
        choice = i.choice_id
        zote = zip(timeline, choice)
        allResponse.append(zote)



    print(allResponse)
    return question 