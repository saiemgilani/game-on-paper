import json
import random
import sportsdataverse as sdv
from locust import HttpUser, task, between

class PerformanceTests(HttpUser):
    wait_time = between(1, 2)

    @task(1)
    def testFastApi(self):
        sample = sdv.cfb.load_cfb_schedule(2022)
        item = random.choice(sample['game_id'])
        headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
        self.client.get(f"/cfb/game/{item}?json=1", headers=headers)