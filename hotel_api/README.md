
# Hotel Inventory API

This Project uses a MongoDB database with aws and serverless.

API has beem divided into two micro-services set & get install and deploy seperately

## Use Cases

- NoSQL CRUD API

## Setup

```
npm install

aws cofigure

sls login

serverless deploy
or
serverless deploy -v

sls deploy -f functionName
```

## Usage

In `.env` update the `MONGO_URI` with your mongoDB url & `SECRET`.
```
Example

MONGO_URI= your mongo uri.....

SECRET= abcdef......

```
**CREATE and UPDATE has been added to 'set' service and all LIST, READ and DELETE has been added to 'get' service**
## User
*Create*

```bash
curl -X POST \
  'https://2c8cx5whk0.execute-api.us-east-1.amazonaws.com/dev/user' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: e6933c2b-f71a-4a5d-ae5b-e75d1789bd1c' \
  -H 'cache-control: no-cache' \
  -d '{
   "email" : "aman@email.com",
   "password" : "aman123",
   "name":"aman",
   "city":"nyc",
   "number":9665445455,
   "username":"aman123"
}'
```
```json
{"id": "590b52ff086041000142cedd"}
```

*READ*

```bash
curl -XGET -H "Content-type: application/json" 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/user/590b52ff086041000142cedd'
```
```json
[
  {
    "_id": "5905e2fbdb55f20001334b3e",
    "name": "John",
    "birth": null,
    "city": "Toronto",
    "number":9665445455,
    "username":"aman123",
    "__v": 0
  }
]
```

*UPDATE*
```bash
curl -XPUT -H "Content-type: application/json" -d '{
   "businessName" : "hotel",
   "city" : "Miami",
}' 'https://2c8cx5whk0.execute-api.us-east-1.amazonaws.com/dev/user/590b52ff086041000142cedd'
```
```json
"Ok"
```

*DELETE*

```bash
curl -XDELETE -H "Content-type: application/json" 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/user/590b52ff086041000142cedd'
```

```json
"Ok"
```
## Booking
*List*
```bash
curl -X GET \
  https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/booking/list \
  -H 'Postman-Token: 0baa4e14-8107-414f-b9b0-30be7c0e88d2' \
  -H 'cache-control: no-cache'
```
```json
"[Array]"
```
*Create*
```bash
curl -X POST \
  https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/booking \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 7ce4a62f-4681-4c71-8370-3e9c06ffd146' \
  -H 'cache-control: no-cache' \
  -d '{
	"cID": "5d3de0f305794563fdd075b9",
	"userID": "5d2e2924e8072fd43732c9c8",
	"cInDate": "2019-08-03T18:30:00.000Z",
	"cOutDate": "2019-08-03T18:30:00.000Z",
	"roomList": [ "5d3166f2de6a54ead4477ddf", "5d314bd5e5a28d46bd1b35cc" ]

}'
```
```json
{"id": "590b52ff086041000142cedff"}
```
*Read*

```bash
curl --request GET  --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/booking/{id}'
```
*UPDATE*
```bash
curl --request PUT --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/booking/{id}'
```

*DELETE*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/booking/delete/{id}'
```
## Customer
*List*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/customer/list'
```
```json
[
    {
        "_id": "5d3de0f305794563fdd075b9",
        "name": "Aman Adhikari",
        "email": "aman@mail.com",
        "number": 9557672252,
        "__v": 0
    },
    {
        "_id": "5d42ade0fdad0f81bdf89710",
        "name": "Samyak Jain",
        "email": "samyak@jain.com",
        "number": 9000012345,
        "__v": 0
    },
    {
        "_id": "5d42b90afdad0f5ed3f8971c",
        "name": "Rahul",
        "email": "rahul@email.com",
        "number": 1234567890,
        "__v": 0
    }
]
```
*Create*
```bash
curl --request POST --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/customer' \
-d '{
  name:"Aman",
  number:989848449,
  email:"aman@email.com"
}'
```
```json
{"id": "590b52ff086041000142cedgf"}
```
*READ*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/customer/{id}'
```
*UPDATE*
```bash
curl --request PUT  --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/customer/{id}' \
-d '{
  name:"Aman",
  number:989848449,
  email:"aman@email.com"
}'
```
*DELETE*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/customer/delete/{id}'
```
```json
"ok"
```
## Room
*List*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/customer/list'
```
```json
[
    {
        "_id": "5d314bd5e5a28d46bd1b35cc",
        "roomNo": "123",
        "rating": 3,
        "roomType": "single",
        "description": "Best",
        "__v": 0,
        "imageList": [],
        "isReserved": false
    },
    {
        "_id": "5d3166f2de6a54ead4477ddf",
        "roomNo": "555",
        "rating": 2,
        "roomType": "double",
        "description": "Amazing",
        "__v": 0,
        "imageList": [],
        "isReserved": false
    }
]
```
*Create*
```bash
curl --request POST --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/room' \
-d '{
  "roomNo": "123",
  "rating": 3,
  "roomType": "single",
  "description": "Best",
  "imageList": [],
}'
```
*READ*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/room/{id}'
```
*UPDATE*
```bash
curl --request PUT --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/room/{id}' \
-d '{
  "roomNo": "123",
  "rating": 3,
  "roomType": "single",
  "description": "Best",
}'
```
*DELETE*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/room/delete/{id}'
```
## Staff
*List*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/staff/list'
```
```json
[
    {
        "_id": "5d3809390f3ffe3aee6acca8",
        "name": "Ramesh",
        "job": "Waiter",
        "number": 1234567890,
        "salary": "5000",
        "__v": 0,
        "joinDate": "2019-07-24T07:46:07.327Z",
        "isActive": true
    },
    {
        "_id": "5d380ce449955fe1f5976164",
        "name": "Suresh",
        "job": "Bell Boy",
        "number": 5559995550,
        "salary": "6000",
        "__v": 0,
        "joinDate": "2019-07-24T07:46:44.366Z",
        "isActive": true
    }
]
```
```bash
curl --request POST --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/staff'\
-d '{
  "name": "Ramesh",
  "job": "Waiter",
  "number": 1234567890,
  "salary": "5000",
}'
```
*READ*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/staff/{id}'
```
*UPDATE*
```bash
curl --request PUT --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/staff/{id}' \
-d '{
  "name": "Ramesh",
  "job": "Waiter",
  "number": 1234567890,
  "salary": "5000",
}'
```
*DELETE*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/staff/delete/{id}'
```
## Grocery
*List*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/grocery/list'
```
```json
[
    {
        "_id": "5d38217a40fed5d6091f314b",
        "name": "Flour",
        "quantity": 50,
        "unit": "Kg",
        "__v": 0
    }
]
```
```bash
curl --request POST --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/grocery' \
-d '{
  "name": "Flour",
  "quantity": 50,
  "unit": "Kg",
}'

```
*READ*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/grocery/{id}'
```
*UPDATE*
```bash
curl --request PUT  --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/grocery/{id}' \
-d '{
  "name": "Flour",
  "quantity": 50,
  "unit": "Kg",
}'
```
*DELETE*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/grocery/delete/{id}'
```
## Amenity
*List*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/amenity/list'
```
```json
[
    {
        "_id": "5d38237c56599383cd7eff7e",
        "name": "Bed Sheets",
        "quantity": 20,
        "unit": "Number",
        "__v": 0
    }
]
```
```bash
curl --request POST --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/amenity' \
-d '{
  "name": "Flour",
  "quantity": 50,
  "unit": "Kg",
}'

```
*READ*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/amenity/{id}'
```
*UPDATE*
```bash
curl --request PUT  --url 'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev/amenity/{id}' \
-d '{
  "name": "Flour",
  "quantity": 50,
  "unit": "Kg",
}'
```
*DELETE*
```bash
curl --request GET --url 'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev/amenity/delete/{id}'
```
