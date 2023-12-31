# Generated by Django 4.1.2 on 2023-08-15 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Train',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('train_name', models.CharField(max_length=100)),
                ('train_number', models.CharField(max_length=10)),
                ('departure_time', models.TimeField()),
                ('seats_sleeper', models.PositiveIntegerField()),
                ('seats_ac', models.PositiveIntegerField()),
                ('price_sleeper', models.DecimalField(decimal_places=2, max_digits=10)),
                ('price_ac', models.DecimalField(decimal_places=2, max_digits=10)),
                ('delayed_by', models.PositiveIntegerField()),
            ],
        ),
    ]
