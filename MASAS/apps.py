from __future__ import unicode_literals

from django.apps import AppConfig
from django.db.models.signals import post_migrate


def create_initial(sender, **kwargs):
    TimeInterval = sender.get_model('TimeInterval')

    intervals = [
        (0, 3),
        (6, 9),
        (9, 12),
        (13, 16),
        (17, 20),
        (21, 0),
    ]

    for i, j in intervals:
        TimeInterval.objects.get_or_create(start=i, end=j)


class Default(AppConfig):
    name = 'MASAS'

    def ready(self):
        post_migrate.connect(
            create_initial,
            sender=self
        )
