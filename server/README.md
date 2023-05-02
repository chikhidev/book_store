# Project Name

Project description goes here.

## API Reference
----------------------------------------------------------------------
### Auth Routes

| Route | Method | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| `/auth/register` | POST | Creates a new user | `{ "username": string, "email": string, "password": string }` | `200 OK` if successful |
| `/auth/login` | POST | Logs in a user | `{ "email": string, "password": string }` | `200 OK` if successful |
| `/auth/drop` | DELETE | Deletes a user | `{ "email": string, "password": string }` | `200 OK` if successful |

----------------------------------------------------------------------

