# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-10-30 14:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0006_alldata'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alldata',
            name='choice_id',
        ),
    ]
