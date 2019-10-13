#converting to geojson
# from sys import argv
from os.path import exists
import json

# script, in_file, out_file = argv

data = json.load(open("shapes.json"))

geojson = {
    "type": "Locations",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [value["shape_pt_lat"], value["shape_pt_lon"]],
            },
        "properties" : key,
     } for key,value in data.items()]
}

with open('shapes.geojson', 'w') as geofile:
    geofile.write(json.dumps(geojson, indent=4))
# json.dump(geojson, output)

# print (geojson)