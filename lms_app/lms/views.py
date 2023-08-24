from .models import *
from .serializers import *
from rest_framework import generics

class LeaveList(generics.ListCreateAPIView):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer


class LeaveDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer  

class Leave_typeList(generics.ListCreateAPIView):
    queryset = Leave_type.objects.all()
    serializer_class = Leave_typeSerializer


class Leave_typeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leave_type.objects.all()
    serializer_class = Leave_typeSerializer 

class EmployeeList(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer  

