import requests
data = open('request-data.json', 'rb').read()
response = requests.post(url='http://54.167.189.27:3000/api?key=1234567890',
    data=data,
    headers={'Content-Type': 'application/json'})
print response.text