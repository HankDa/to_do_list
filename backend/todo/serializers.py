from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """
    class meta is a special keyword that allows us to define a 
    configuration for our serializer.
    Here we are telling the serializer to use the Todo model
    and use the fields id, title, description, completed
    """
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')