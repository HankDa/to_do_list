# Generated by Django 4.2 on 2023-04-21 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("todo", "0003_rename_title_test_test"),
    ]

    operations = [
        migrations.DeleteModel(name="Test",),
    ]
