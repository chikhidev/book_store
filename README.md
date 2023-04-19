# Book store

##UML

<table><thead><tr><th>Class</th><th>Properties</th><th>Methods</th></tr></thead><tbody><tr><td>Book</td><td>title: string&lt;br&gt;author: string&lt;br&gt;price: float&lt;br&gt;category: string&lt;br&gt;description: string&lt;br&gt;image: string&lt;br&gt;quantity: int</td><td>getDetails(): string</td></tr><tr><td>Customer</td><td>name: string&lt;br&gt;email: string&lt;br&gt;password: string&lt;br&gt;cart: List&lt;Book&gt;&lt;br&gt;orders: List&lt;Order&gt;</td><td>register(): void&lt;br&gt;login(): void&lt;br&gt;searchBooks(): List&lt;Book&gt;&lt;br&gt;addToCart(): void&lt;br&gt;placeOrder(): void&lt;br&gt;viewOrder(): Order&lt;br&gt;cancelOrder(): void</td></tr><tr><td>Order</td><td>orderNumber: int&lt;br&gt;books: List&lt;Book&gt;&lt;br&gt;totalAmount: float&lt;br&gt;status: string&lt;br&gt;date: Date</td><td>getDetails(): string</td></tr><tr><td>Admin</td><td>name: string&lt;br&gt;email: string&lt;br&gt;password: string</td><td>addBook(): void&lt;br&gt;editBook(): void&lt;br&gt;removeBook(): void&lt;br&gt;viewOrders(): List&lt;Order&gt;&lt;br&gt;updateOrderStatus(): void</td></tr></tbody></table>

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
