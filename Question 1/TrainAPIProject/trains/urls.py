from django.urls import path
from .views import TrainScheduleView, TrainAvailabilityView

urlpatterns = [
    path("train-schedule/", TrainScheduleView.as_view(), name="train-schedule"),
    path(
        "train-availability/",
        TrainAvailabilityView.as_view(),
        name="train-availability",
    ),
]
