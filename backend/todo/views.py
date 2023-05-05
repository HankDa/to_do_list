from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo


# Create your views here.

class TodoView(viewsets.ModelViewSet):
    """
    The ModelViewSet class provides built-in CRUD 
    (Create, Retrieve, Update, Delete) functionality for the model.

    queryset is used to determine which objects are used by the view.
    In this case, we want all of the objects in the Todo model.
    We could also use .filter() to filter the objects.
    For instance, we want all of the objects that are not completed.
    queryset = Todo.objects.filter(completed=False)
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer