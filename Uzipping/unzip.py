import csv, json
# def shape():
data = {}
with open('trips.txt', mode='r') as cvs_file:
    cvs_reader = csv.DictReader(cvs_file)
    for rows in cvs_reader:
        shape_id = rows['shape_id']
        data[shape_id] = rows

with open('shapes.json', 'w') as jsonfile:
    jsonfile.write(json.dumps(data, indent=4))


# def trips():
#     data = {}
#     with open('trips.txt', mode='r') as cvs_file:
#         cvs_reader = csv.DictReader(cvs_file)
#         for rows in cvs_reader:
#             shape_id = rows['shape_id']
#             data[shape_id] = rows

#     with open('trips.json', 'w') as jsonfile:
#         jsonfile.write(json.dumps(data, indent=4))


# def routes():
#     data = {}
#     with open('routes.txt', mode='r') as cvs_file:
#         cvs_reader = csv.DictReader(cvs_file)
#         for rows in cvs_reader:
#             shape_id = rows['shape_id']
#             data[shape_id] = rows

#     with open('routes.json', 'w') as jsonfile:
#         jsonfile.write(json.dumps(data, indent=4))


# def stops():
#     data = {}
#     with open('stops.txt', mode='r') as cvs_file:
#         cvs_reader = csv.DictReader(cvs_file)
#         for rows in cvs_reader:
#             shape_id = rows['shape_id']
#             data[shape_id] = rows

    # with open('stops.json', 'w') as jsonfile:
    #     jsonfile.write(json.dumps(data, indent=4))


# def agency():
#     data = {}
#     with open('agency.txt', mode='r') as cvs_file:
#         cvs_reader = csv.DictReader(cvs_file)
#         for rows in cvs_reader:
#             shape_id = rows['shape_id']
#             data[shape_id] = rows

#     with open('agency.json', 'w') as jsonfile:
#         jsonfile.write(json.dumps(data, indent=4))



# # shape()
# trips()
# routes()
# stops()
# agency()