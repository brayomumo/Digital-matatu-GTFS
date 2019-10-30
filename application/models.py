from django.db import models

# Create your models here.

class datatable(models.Model):
    choice_id = models.IntegerField()
    question_id = models.CharField(max_length=200)
    choice_text = models.CharField( max_length= 50)
    question_text = models.CharField( max_length= 200)
    total_count = models.IntegerField( )

    def __str__(self):
        return self.choice_id

class allData(models.Model):
    choice_id = models.IntegerField()
    choice_text = models.CharField(max_length=200)
    question_text = models.CharField(max_length=200)
    question_id = models.IntegerField()


    def __str__(self):
        return self.choice_id

    

class areaQuestionData(models.Model):
    Question_text = models.CharField(max_length=200)
    Choice_text = models.CharField(max_length=200)


    def __str__(self):
        return self.Choice_text

class finalData:
    def __init__(self,name,coordinates,radius):
        self.name = name
        self.coordinates = coordinates
        self.radius = radius

