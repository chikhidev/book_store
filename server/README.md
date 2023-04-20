# Project Name

Project description goes here.

## Getting Started

Instructions on how to get a copy of the project up and running on a local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository
2. Navigate to the project folder in your terminal
3. Install dependencies with `npm install`
4. Create a `.env` file in the project root and add necessary environment variables (e.g. PORT, DATABASE_URL)

### Running

- Start the development server with `npm run dev`
- Build the project with `npm run build`
- Start the built project with `npm start`

## API Reference

### User Routes

| Route | Method | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| `/auth/register` | POST | Creates a new user | `{ "username": string, "email": string, "password": string }` | `200 OK` if successful |
| `/auth/login` | POST | Logs in a user | `{ "email": string, "password": string }` | `200 OK` if successful |
| `/auth/drop` | DELETE | Deletes a user | `{ "email": string, "password": string }` | `200 OK` if successful |

## Built With

- Node.js
- Express.js
- Mongoose


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
