# Generated by Django 4.2 on 2023-04-21 13:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("todo", "0002_test"),
    ]

    operations = [
        migrations.RenameField(model_name="test", old_name="title", new_name="test",),
    ]
