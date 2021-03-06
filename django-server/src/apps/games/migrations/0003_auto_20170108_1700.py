# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-08 17:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20161217_1759'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='game',
            options={'ordering': ('name',), 'verbose_name': 'jeu', 'verbose_name_plural': 'jeux'},
        ),
        migrations.RemoveField(
            model_name='game',
            name='knowers',
        ),
        migrations.RemoveField(
            model_name='game',
            name='owners',
        ),
        migrations.AddField(
            model_name='user',
            name='known_games',
            field=models.ManyToManyField(related_name='knowers', through='games.Knower', to='games.Game'),
        ),
        migrations.AddField(
            model_name='user',
            name='owned_games',
            field=models.ManyToManyField(related_name='owners', through='games.Owner', to='games.Game'),
        ),
        migrations.AlterField(
            model_name='owner',
            name='is_bringing',
            field=models.BooleanField(default=False, verbose_name='Apporte'),
        ),
    ]
