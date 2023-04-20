# User Authentication API

This is a Node.js API that provides user authentication features using JWT (JSON Web Tokens). It includes endpoints for registering, logging in, and deleting users.

## Installation

To run the application, you need to have Node.js and MongoDB installed on your machine.

1. Clone the repository
2. Install the dependencies using `npm install`
3. Start the application using `npm start`

## Usage

The API provides the following endpoints:


br
## POST /user/register

This endpoint registers a new user with the provided username, email, and password.

### Request

POST /user/register
Content-Type: application/json

{
"username": "testuser",
"email": "testuser@example.com",
"password": "testpassword"
}


### Response

Status: 200 OK
Content-Type: application/json

{
"success": true,
"data": {
"message": "Created successfully"
}
}




## POST /user/login

This endpoint logs in a user with the provided email and password, and returns a JWT token.

### Request

POST /user/login
Content-Type: application/json

{
"email": "testuser@example.com",
"password": "testpassword"
}


### Response

Status: 200 OK
Content-Type: application/json
Authorization: <JWT token>

{
"success": true,
"data": {
"message": "Logged in successfully"
}
}



  
## DELETE /user/drop
  
This endpoint deletes a user with the provided email and password.

### Request

DELETE /user/drop
Content-Type: application/json
Authorization: <JWT token>

{
"email": "testuser@example.com",
"password": "testpassword"
}


  
### Response

Status: 200 OK
Content-Type: application/json

{
"success": true,
"data": {
"message": "User deleted successfully"
}
}



## License

This project is licensed under the MIT License.
