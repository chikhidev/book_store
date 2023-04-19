Server API Documentation
Auth Route
POST /auth
Generates an authentication token based on email and password input.

Request

http
Copy code
POST /auth HTTP/1.1
Content-Type: application/json

{
  "email": "example@ex.com",
  "password": "example$123"
}
Parameter	Type	Required	Description
email	string	yes	User email.
password	string	yes	User password.
Response

http
Copy code
HTTP/1.1 200 OK
Content-Type: application/json
Authorization: Bearer <auth_token>
Status code	Description
200	Authentication successful.
401	Authentication failed.
400	Invalid input.
User Routes
GET /user
Get a user by their email.

Request

http
Copy code
GET /user HTTP/1.1
Content-Type: application/json

{
  "email": "example@ex.com"
}
Parameter	Type	Required	Description
email	string	yes	User email.
Response

http
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "username": "example",
  "email": "example@ex.com",
  "id": "12345"
}
Status code	Description
200	User found.
404	User not found.
400	Invalid input.
POST /user/create
Create a new user.

Request

http
Copy code
POST /user/create HTTP/1.1
Content-Type: application/json

{
  "username": "example",
  "email": "example@ex.com",
  "password": "example$123"
}
Parameter	Type	Required	Description
username	string	yes	User username.
email	string	yes	User email.
password	string	yes	User password.
Response

http
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "username": "example",
  "email": "example@ex.com",
  "id": "12345"
}
Status code	Description
200	User created successfully.
400	Invalid input.
DELETE /user/drop
Drop a user.

Request

http
Copy code
DELETE /user/drop HTTP/1.1
Content-Type: application/json

{
  "email": "example@ex.com",
  "password": "example$123"
}
Parameter	Type	Required	Description
email	string	yes	User email.
password	string	yes	User password.
Response

http
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "User successfully deleted."
}
Status code	Description
200	User successfully deleted.
401	Authentication failed.
400	
