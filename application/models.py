from django.db import models

# Create your models here.

class datatable(models.Model):
    choice_id = models.IntegerField()
    question_id = models.CharField(max_length=200)
    choice_text = models.CharField( max_length= 50)
    question_text = models.CharField( max_length= 200)
    total_count = models.IntegerField( )