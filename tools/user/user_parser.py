import csv
import os
import re
import requests

serverURL = 'https://pathfinder-4ntr.onrender.com'

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

def read_csv_with_line_breaks(file_path):
    with open(file_path, 'r', newline='') as csvfile:
        csv_data = csvfile.read()
        # Use a regular expression to find line breaks within double quotes
        csv_data_fixed = re.sub(r'(?<!\r)\n', '`', csv_data)
        reader = csv.reader(csv_data_fixed.splitlines(), delimiter=',', quotechar='"')
        rows = [[s.replace('`', '\n') for s in row ] for row in reader]
        return rows
imageIndex = [1]
def postMentor(utimestamp, firstname, lastname, grad_class, major, email, phone, password, short_desc, long_desc, npic, fpic, tags, logo_rate):
    #timestamp, firstname, lastname, grad_class, major, email, phone, password, short_desc, long_desc, npic, fpic, tags, logo_rate
    register = {
    "username": firstname + " " + lastname,
    "email": email,
    "password": password
    }   
    res = requests.post(serverURL+'/api/auth/register', data = register)
    print(res)
    json_res = res.json()
    print(json_res)
    updateInfo = {
        "userId" : json_res['_id'],
        "grad_class": grad_class,
        "long_desc": long_desc,
        "major" : major,
        "description" : short_desc,
        "tags": tags,
        "userType" : 2
    }
    res = requests.put(serverURL+'/api/users/update-user/' + json_res['_id'], data = updateInfo)
    file_path = os.path.join(__location__, f'images\{imageIndex[0]}.jpg')
    files = {
        'image':open(file_path, 'rb'),
    }
    data = {
        'userId': json_res['_id'],
        'category': 'profile',
    }
    res = requests.post(serverURL + '/api/upload-profile-pic',data= data, files = files)
    imageIndex[0]+=1



input_path = os.path.join(__location__, 'user_input.csv')
data_list = read_csv_with_line_breaks(input_path)
data_list.pop(0)
for row in data_list:
    postMentor(*row)
