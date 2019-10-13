import csv, json


data = {}
with open('shapes.txt', mode='r') as cvs_file:
    cvs_reader = csv.DictReader(cvs_file)
    i=0
    for rows in cvs_reader:
        shape_id = i
        data[shape_id] = rows
        i+=1

with open('shapes.json', 'w') as jsonfile:
    jsonfile.write(json.dumps(data, indent=4))



# with open('shapes.json') as json_file:
#     data = (json_file)
#     # u = 0
#     for p in data:
#        print(p[1])


#converting to geojson
