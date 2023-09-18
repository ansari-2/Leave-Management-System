from rest_framework import serializers
from .models import *

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields ="__all__"

class Leave_typeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave_type
        fields ="__all__"        

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields ="__all__"
       