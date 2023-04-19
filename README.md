# Book store

##UML
@startuml
class Book {
  +title: string
  +author: string
  +price: float
  +category: string
  +description: string
  +image: string
  +quantity: int
  +getDetails(): string
}

class Customer {
  +name: string
  +email: string
  +password: string
  +cart: List<Book>
  +orders: List<Order>
  +register(): void
  +login(): void
  +searchBooks(): List<Book>
  +addToCart(): void
  +placeOrder(): void
  +viewOrder(): Order
  +cancelOrder(): void
}

class Order {
  +orderNumber: int
  +books: List<Book>
  +totalAmount: float
  +status: string
  +date: Date
  +getDetails(): string
}

class Admin {
  +name: string
  +email: string
  +password: string
  +addBook(): void
  +editBook(): void
  +removeBook(): void
  +viewOrders(): List<Order>
  +updateOrderStatus(): void
}

Book --> Order
Customer --> Book
Customer --> Order
Admin --> Book
Admin --> Order
@enduml

  ---------------------------------------------------------------------

## Description

server for book store client

## Server start
<kbd>npx nodemon app.js</kbd>

## Usage

### Server

| Route | Description | Method | Input | Output |
|-------|-------------|--------|-------|--------|
| `/auth` | This route takes `email` and `password` as inputs, validates them, generates a token, and sends it in the `Authorization` header. The token expires in 2 days. | `POST` | `{ email: string, password: string }` | `{ token: string }` |
| `/user` | This route returns user information (`username`, `email`, `id`) by sending the `email` in the body request as `{email:"example@ex.com"}` with method `GET`. | `GET` | `{ email: string }` | `{ _id: string, username: string, email: string, id: string }` |
| `/user/create` | This route creates a user by sending `username`, `email`, and `password` in the body request as `{email:"example@ex.com", username: "example", password: "example$123"}` with method `POST`. | `POST` | `{ email: string, username: string, password: string }` | `{ _id: string, username: string, email: string }` |
| `/user/drop` | This route drops a user by sending `email` and `password` in the body request as `{email:"example@ex.com", password: "example$123"}` with method `DELETE`. | `DELETE` | `{ email: string, password: string }` | `{ message: string }` |
| `/user/{id}` | This route returns user information (`_id`, `username`, `email`, `avatar`, `bio`, `createdAt`) by putting the `id` with method `GET`. | `GET` | `N/A` | `{ _id: string, username: string, email: string, avatar: string, bio: string, createdAt: Date }` |
| `/user/{id}/full` | This route returns full user information (every user information except password) by putting the `id` with method `GET`. | `GET` | `N/A` | `{ _id: string, username: string, email: string, avatar: string, bio: string, createdAt: Date, store: [] }` |

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License

The code in this project is licensed under MIT license.
