from django.db import models


class Train(models.Model):
    train_name = models.CharField(max_length=100)
    train_number = models.CharField(max_length=10)
    departure_time = models.TimeField()
    seats_sleeper = models.PositiveIntegerField()
    seats_ac = models.PositiveIntegerField()
    price_sleeper = models.DecimalField(max_digits=10, decimal_places=2)
    price_ac = models.DecimalField(max_digits=10, decimal_places=2)
    delayed_by = models.PositiveIntegerField()
