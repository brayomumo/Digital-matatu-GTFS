# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-11-01 09:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0008_timelines'),
    ]

    operations = [
        migrations.AddField(
            model_name='timelines',
            name='timeline_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]