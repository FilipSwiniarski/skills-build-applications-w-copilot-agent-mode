from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_activity_creation(self):
        activity = Activity.objects.create(user='test', type='run', duration=10)
        self.assertEqual(str(activity), 'test - run')

    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(user='test', score=42)
        self.assertEqual(str(lb), 'test: 42')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test', description='desc')
        self.assertEqual(str(workout), 'Test')
