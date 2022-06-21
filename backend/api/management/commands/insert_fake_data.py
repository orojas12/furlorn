import random

from api.models import Pet, Post, User
from api.tests.fake_data import FakePet, FakePost
from django.core.management.base import BaseCommand, CommandError
from faker import Faker

fake = Faker()


def get_random_type():
    pet_types = ["Cat", "Dog"]
    return random.choice(pet_types)


class Command(BaseCommand):
    help = "Populates database with fake data for testing purposes"

    def handle(self, *args, **options):
        # create users, pets and posts
        for _ in range(40):
            profile = fake.profile(fields=["username", "name", "mail"])
            user_data = {
                "username": profile["username"],
                "email": profile["mail"],
                "password": "testpassword1",
                "first_name": fake.first_name(),
                "last_name": fake.last_name(),
            }
            user = User.objects.create_user(**user_data)
            pet = Pet.objects.create(
                name=fake.first_name(),
                type=get_random_type(),
                age=random.randrange(15),
                sex=random.randrange(1),
            )
            post = Post.objects.create(user=user, pet=pet, **FakePost().data)
        self.stdout.write(self.style.SUCCESS("Successfully populated database."))
