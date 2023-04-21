from django.contrib import admin
from .models import Todo


# this will create a tab for todo model in admin page
class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')


# Register your models here.
# this will register the todo model with admin page
admin.site.register(Todo, TodoAdmin)
