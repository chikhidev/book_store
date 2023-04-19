# Project Name

## Description

Briefly describe what your project does.

## Installation

Describe the installation process in detail.

## Usage

### Server

#### Auth Route

Route: `/auth`

This route takes `email` and `password` as inputs, validates them, generates a token, and sends it in the `Authorization` header. The token expires in 2 days.

#### User Routes

##### Get User Information

Route: `/user`

This route returns user information (`username`, `email`, `id`) by sending the `email` in the body request as `{email:"example@ex.com"}` with method `GET`.

##### Create a User

Route: `/user/create`

This route creates a user by sending `username`, `email`, and `password` in the body request as `{email:"example@ex.com", username: "example", password: "example$123"}` with method `POST`.

##### Drop a User

Route: `/user/drop`

This route drops a user by sending `email` and `password` in the body request as `{email:"example@ex.com", password: "example$123"}` with method `DELETE`.

##### Get User Information by ID

Route: `/user/{id}`

This route returns user information (`_id`, `username`, `email`, `avatar`, `bio`, `createdAt`) by putting the `id` with method `GET`.

##### Get Full User Information by ID

Route: `/user/{id}/full`

This route returns full user information (every user information except password) by putting the `id` with method `GET`.

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License

The code in this project is licensed under MIT license.```
