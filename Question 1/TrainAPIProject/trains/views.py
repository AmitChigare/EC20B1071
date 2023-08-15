import requests
from datetime import datetime, timedelta
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Train
from .serializers import TrainSerializer
from django.conf import settings


class TrainScheduleView(generics.ListAPIView):
    serializer_class = TrainSerializer

    def get_queryset(self):
        now = datetime.now()
        next_12_hours = now + timedelta(hours=12)

        auth_data = {
            "companyName": "Train Central",
            "clientID": settings.JOHN_DOE_API["client_id"],
            "clientSecret": settings.JOHN_DOE_API["client_secret"],
        }

        auth_response = requests.post(settings.JOHN_DOE_API["auth_url"], json=auth_data)

        if auth_response.status_code == status.HTTP_200_OK:
            train_info_url = "http://20.244.56.144/train/trains"
            train_response = requests.get(train_info_url)

            if train_response.status_code == status.HTTP_200_OK:
                train_data = train_response.json()
                trains = []

                for train in train_data:
                    departure_time = datetime.now().replace(
                        hour=train["departureTime"]["Hours"],
                        minute=train["departureTime"]["Minutes"],
                        second=train["departureTime"]["Seconds"],
                    )
                    if now <= departure_time <= next_12_hours:
                        trains.append(
                            Train(
                                train_name=train["trainName"],
                                train_number=train["trainNumber"],
                                departure_time=departure_time,
                                seats_sleeper=train["seatsAvailable"]["sleeper"],
                                seats_ac=train["seatsAvailable"]["AC"],
                                price_sleeper=train["price"]["sleeper"],
                                price_ac=train["price"]["AC"],
                                delayed_by=train["delayedBy"],
                            )
                        )

                return trains
            else:
                return []
        else:
            return []


class TrainAvailabilityView(generics.ListAPIView):
    serializer_class = TrainSerializer

    def get_queryset(self):
        now = datetime.now()
        next_12_hours = now + timedelta(hours=12)

        auth_data = {
            "companyName": "Train Central",
            "clientID": settings.JOHN_DOE_API["client_id"],
            "clientSecret": settings.JOHN_DOE_API["client_secret"],
        }

        auth_response = requests.post(settings.JOHN_DOE_API["auth_url"], json=auth_data)

        if auth_response.status_code == status.HTTP_200_OK:
            train_info_url = "http://20.244.56.144/train/trains"
            train_response = requests.get(train_info_url)

            if train_response.status_code == status.HTTP_200_OK:
                train_data = train_response.json()
                trains = []

                for train in train_data:
                    departure_time = now.replace(
                        hour=train["departureTime"]["Hours"],
                        minute=train["departureTime"]["Minutes"],
                        second=train["departureTime"]["Seconds"],
                    ) + timedelta(minutes=train["delayedBy"])

                    if now + timedelta(minutes=30) <= departure_time <= next_12_hours:
                        train_entry = {
                            "train_name": train["trainName"],
                            "train_number": train["trainNumber"],
                            "departure_time": departure_time,
                            "seats_sleeper": train["seatsAvailable"]["sleeper"],
                            "seats_ac": train["seatsAvailable"]["AC"],
                            "price_sleeper": train["price"]["sleeper"],
                            "price_ac": train["price"]["AC"],
                        }
                        trains.append(train_entry)

                sorted_trains = sorted(
                    trains,
                    key=lambda x: (
                        x["price_sleeper"],
                        x["price_ac"],
                        -x["seats_sleeper"],
                        -x["seats_ac"],
                        -x["departure_time"],
                    ),
                )

                return sorted_trains
            else:
                return []
        else:
            return []
