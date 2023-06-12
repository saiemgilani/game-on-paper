import json
import random
import logging
import sportsdataverse as sdv
import sys
import traceback


from locust import HttpUser, task, between
logging.basicConfig(level=logging.INFO, filename = 'lc.log')

class PerformanceTests(HttpUser):
    wait_time = between(0.2, 0.5)

    @task(1)
    def testFastApi(self):
        sample = sdv.cfb.load_cfb_schedule(2022)
        item = random.choice(sample['game_id'])
        headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
        with self.client.get(f"/py/cfb/game/{item}", headers=headers, catch_response=True) as resp:
            logging.info(f"{resp.status_code}")
