from numpy.core.fromnumeric import mean
import pandas as pd
import numpy as np
import xgboost as xgb
import os
import re
import json
import time
import http
import urllib
from urllib.error import URLError, HTTPError, ContentTooShortError
from datetime import datetime
from itertools import chain, starmap

class ScheduleProcess(object):

    season = ''
    dates = ''
    week = ''

    path_to_json = '/'

    def __init__(self, season = 0, dates = '', week = '', path_to_json = '/'):
        self.season = int(season)
        self.dates = dates
        self.week = week
        self.path_to_json = path_to_json

    def download(self, url, num_retries=5):
        try:
            html = urllib.request.urlopen(url).read()
        except (URLError, HTTPError, ContentTooShortError, http.client.HTTPException, http.client.IncompleteRead) as e:            
            html = None
            if num_retries > 0:
                if hasattr(e, 'code') and 500 <= e.code < 600:
                    # recursively retry 5xx HTTP errors
                    return self.download(url, num_retries - 1)
            if num_retries > 0:
                if e == http.client.IncompleteRead:
                    return self.download(url, num_retries - 1)
        return html

    def cfb_calendar(self):
        season = self.season
        url = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates={}".format(season)
        resp = self.download(url=url)
        txt = json.loads(resp)['leagues'][0]['calendar']
        datenum = list(map(lambda x: x[:10].replace("-",""),txt))
        date = list(map(lambda x: x[:10],txt))

        year = list(map(lambda x: x[:4],txt))
        month = list(map(lambda x: x[5:7],txt))
        day = list(map(lambda x: x[8:10],txt))

        data = {"season": season,
                "datetime" : txt,
                "date" : date,
                "year": year,
                "month": month,
                "day": day,
                "dateURL": datenum
        }
        df = pd.DataFrame(data)
        df['url']="http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates="
        df['url']= df['url'] + df['dateURL']
        return df

    def cfb_schedule(self):
        season = self.season
        dates = self.dates
        week = self.week
        if week is None:
            week = ''
        if dates is None:
            dates = ''
        ev = pd.DataFrame()
        url = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates={}&week={}".format(dates,week)
        resp = self.download(url=url)
        if resp is not None:
            events_txt = json.loads(resp)

            events = events_txt['events']
            for event in events:
                if 'links' in event['competitions'][0]['competitors'][0]['team'].keys():
                    del event['competitions'][0]['competitors'][0]['team']['links']
                if 'links' in event['competitions'][0]['competitors'][1]['team'].keys():
                    del event['competitions'][0]['competitors'][1]['team']['links']    
                if event['competitions'][0]['competitors'][0]['homeAway']=='home':
                    event['competitions'][0]['home'] = event['competitions'][0]['competitors'][0]['team']    
                else: 
                    event['competitions'][0]['away'] = event['competitions'][0]['competitors'][0]['team']
                if event['competitions'][0]['competitors'][1]['homeAway']=='away':
                    event['competitions'][0]['away'] = event['competitions'][0]['competitors'][1]['team']
                else: 
                    event['competitions'][0]['home'] = event['competitions'][0]['competitors'][1]['team']

                del_keys = ['broadcasts','geoBroadcasts', 'headlines']
                for k in del_keys:
                    if k in event['competitions'][0].keys():
                        del event['competitions'][0][k]

                ev = ev.append(pd.json_normalize(event['competitions'][0]))
        ev = json.loads(pd.DataFrame(ev).to_json(orient='records'))
        return ev

    def mbb_calendar(self):

        season = self.season
        dates = self.dates
        if dates is None:
            dates = ''
        url = "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates={}".format(dates)
        resp = self.download(url=url)
        txt = json.loads(resp)['leagues'][0]['calendar']
        datenum = list(map(lambda x: x[:10].replace("-",""),txt))
        date = list(map(lambda x: x[:10],txt))

        year = list(map(lambda x: x[:4],txt))
        month = list(map(lambda x: x[5:7],txt))
        day = list(map(lambda x: x[8:10],txt))

        data = {
            "season": season,
            "datetime" : txt,
            "date" : date,
            "year": year,
            "month": month,
            "day": day,
            "dateURL": datenum
        }
        df = pd.DataFrame(data)
        df['url']="http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates="
        df['url']= df['url'] + df['dateURL']
        return df

    def mbb_schedule(self):
        season = self.season
        dates = self.dates
        if dates is None:
            dates = ''
        url = "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?limit=1000&dates={}".format(dates)
        resp = self.download(url=url)
        txt = json.loads(resp)['leagues'][0]['calendar']
    #     print(len(txt))
        txt = list(map(lambda x: x[:10].replace("-",""),txt))

        ev = pd.DataFrame()
        if resp is not None:
            events_txt = json.loads(resp)

            events = events_txt['events']
            for event in events:
                if 'links' in event['competitions'][0]['competitors'][0]['team'].keys():
                    del event['competitions'][0]['competitors'][0]['team']['links']
                if 'links' in event['competitions'][0]['competitors'][1]['team'].keys():
                    del event['competitions'][0]['competitors'][1]['team']['links']    
                if event['competitions'][0]['competitors'][0]['homeAway']=='home':
                    event['competitions'][0]['home'] = event['competitions'][0]['competitors'][0]['team']    
                else: 
                    event['competitions'][0]['away'] = event['competitions'][0]['competitors'][0]['team']
                if event['competitions'][0]['competitors'][1]['homeAway']=='away':
                    event['competitions'][0]['away'] = event['competitions'][0]['competitors'][1]['team']
                else: 
                    event['competitions'][0]['home'] = event['competitions'][0]['competitors'][1]['team']

                del_keys = ['broadcasts','geoBroadcasts', 'headlines']
                for k in del_keys:
                    if k in event['competitions'][0].keys():
                        del event['competitions'][0][k]

                ev = ev.append(pd.json_normalize(event['competitions'][0]))
        ev = json.loads(pd.DataFrame(ev).to_json(orient='records'))

        return ev

    def nba_calendar(self):
        season = self.season
        dates = self.dates
        if dates is None:
            dates = ''
        url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates={}".format(season)
        resp = self.download(url=url)
        txt = json.loads(resp)['leagues'][0]['calendar']
        datenum = list(map(lambda x: x[:10].replace("-",""),txt))
        date = list(map(lambda x: x[:10],txt))

        year = list(map(lambda x: x[:4],txt))
        month = list(map(lambda x: x[5:7],txt))
        day = list(map(lambda x: x[8:10],txt))

        data = {"season": season,
                "datetime" : txt,
                "date" : date,
                "year": year,
                "month": month,
                "day": day,
                "dateURL": datenum
        }
        df = pd.DataFrame(data)
        df['url']="http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates="
        df['url']= df['url'] + df['dateURL']
        return df

    def nba_schedule(self):
        season = self.season
        dates = self.dates
        if dates is None:
            dates = ''

        url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?limit=1000&dates={}".format(dates)
        ev = pd.DataFrame()
        resp = self.download(url=url)

        if resp is not None:
            events_txt = json.loads(resp)

            events = events_txt['events']
            for event in events:
                if 'links' in event['competitions'][0]['competitors'][0]['team'].keys():
                    del event['competitions'][0]['competitors'][0]['team']['links']
                if 'links' in event['competitions'][0]['competitors'][1]['team'].keys():
                    del event['competitions'][0]['competitors'][1]['team']['links']
                if event['competitions'][0]['competitors'][0]['homeAway']=='home':
                    event['competitions'][0]['home'] = event['competitions'][0]['competitors'][0]['team']
                else:
                    event['competitions'][0]['away'] = event['competitions'][0]['competitors'][0]['team']
                if event['competitions'][0]['competitors'][1]['homeAway']=='away':
                    event['competitions'][0]['away'] = event['competitions'][0]['competitors'][1]['team']
                else:
                    event['competitions'][0]['home'] = event['competitions'][0]['competitors'][1]['team']

                del_keys = ['broadcasts','geoBroadcasts', 'headlines']
                for k in del_keys:
                    if k in event['competitions'][0].keys():
                        del event['competitions'][0][k]

                ev = ev.append(pd.json_normalize(event['competitions'][0]))
        ev = json.loads(pd.DataFrame(ev).to_json(orient='records'))
        return ev
