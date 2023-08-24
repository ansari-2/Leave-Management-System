from django.db import models



class Employee(models.Model):

    emp_id = models.IntegerField(default=0)
    emp_name = models.CharField(max_length=50)
    designation = models.CharField(max_length=50)

    def __str__(self):
        return self.emp_name

class Leave_type(models.Model):

    employee = models.ForeignKey(Employee,on_delete=models.PROTECT)
    annual_leave = models.IntegerField(default=12)
    sick_leave = models.IntegerField(default=8)
    bereavement_leave = models.IntegerField(default=8)
    maternity_leave = models.IntegerField(default=15)
    paternity_leave = models.IntegerField(default=5)
    study_leave = models.IntegerField(default=5)

    def __str__(self):
        return self.annual_leave

class Leave(models.Model):

    emp = models.ForeignKey(Employee,on_delete=models.PROTECT,null=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    leave_type = models.CharField(max_length=50)
    reason = models.TextField(max_length=100)
    status = models.CharField(max_length=25,null=True)
    days = models.IntegerField(default=0)
    # available = models.ForeignKey(Leave_type,on_delete=models.PROTECT)
    # Add custom fields here, if needed

    def __str__(self):
        return self.leave_type


