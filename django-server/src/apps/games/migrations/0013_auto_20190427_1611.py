# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-27 14:11
from __future__ import unicode_literals

from django.db import migrations, models
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0012_auto_20190323_1218'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='shift',
            options={'verbose_name': 'cr\xe9neau horaire', 'verbose_name_plural': 'planning'},
        ),
        migrations.AddField(
            model_name='user',
            name='photo',
            field=easy_thumbnails.fields.ThumbnailerImageField(blank=True, upload_to='avatars'),
        ),
        migrations.AlterField(
            model_name='shift',
            name='end',
            field=models.DateTimeField(verbose_name='Fin'),
        ),
        migrations.AlterField(
            model_name='shift',
            name='name',
            field=models.TextField(unique=True, verbose_name='Nom'),
        ),
        migrations.AlterField(
            model_name='shift',
            name='start',
            field=models.DateTimeField(verbose_name='D\xe9but'),
        ),
    ]
