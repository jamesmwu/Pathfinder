import requests
import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
register = {
    "username": "mentee3@test.com",
    "email": "mentee3@test.com",
    "password": "password"
}

res = requests.post('http://localhost:8800/api/auth/register', data = register)
json_res = res.json()
updateInfo = {
    "userId" : json_res['_id'],
    "long_desc": "long",
    "short_desc" : "short",
    "tags": ['Computer Science']
}

res = requests.put('http://localhost:8800/api/users/update-user/' + json_res['_id'], data = updateInfo)
print(res.json())
file_path = os.path.join(__location__, 'images\image.jpg')
files = {
    'image':open(file_path, 'rb'),
}
data = {
    'userId': json_res['_id'],
    'category': 'profile',
}
res = requests.post('http://localhost:8800/api/upload-profile-pic',data= data, files = files)