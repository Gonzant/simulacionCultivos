# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-19 14:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0028_auto_20160714_1217'),
    ]

    operations = [
        migrations.CreateModel(
            name='Administrativo_procesamiento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('procesamiento', models.IntegerField()),
            ],
        ),
        migrations.RenameModel(
            old_name='Administrativo',
            new_name='Administrativo_contador',
        ),
        migrations.RenameField(
            model_name='administrativo_contador',
            old_name='procesamiento',
            new_name='usado',
        ),
    ]
