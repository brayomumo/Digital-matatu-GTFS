# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-10-29 19:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0002_auto_20191029_1948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datatable',
            name='choice_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='datatable',
            name='question_id',
            field=models.IntegerField(),
        ),
    ]
