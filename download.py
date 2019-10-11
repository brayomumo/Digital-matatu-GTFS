from google.transit import gtfs_realtime_pb2
import requests



# feed = gtfs_realtime_pb2.FeedMessage()
# response = requests.get('http://www.digitalmatatus.com/data/GTFS_FEED_2019.zip')
# feed.ParseFromString(response.content)
# for entity in feed.entity:
#     if entity.HAsField('trip_update'):
#         print(entity.trip_update)
feed = gtfs_realtime_pb2.FeedMessage()
response = requests.get('http://www.digitalmatatus.com/data/GTFS_FEED_2019.zip',allow_redirects=True)
feed.ParseFromString(response.content)


