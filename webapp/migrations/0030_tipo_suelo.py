# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-01-16 13:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0029_auto_20160719_1116'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tipo_suelo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('etiqueta', models.CharField(max_length=100)),
                ('valor', models.CharField(max_length=100)),
            ],
        ),
    ]
