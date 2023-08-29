from django.urls import path
from lms import views


urlpatterns = [
    path('lms/apply/', views.LeaveList.as_view(),),
    path('lms/update/<int:pk>', views.LeaveDetail.as_view()),
    path('lms/leave_type/', views.Leave_typeList.as_view(),),
    path('lms/leave_type/update/<int:pk>', views.Leave_typeDetail.as_view()),
    path('lms/employee/', views.EmployeeList.as_view(),),
    path('lms/employee/update/<int:pk>', views.EmployeeDetail.as_view()),
  

]