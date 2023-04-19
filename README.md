# Book store

##UML

<div class="markdown prose w-full break-words dark:prose-invert dark"><h1>Class Diagram</h1><p>This is a class diagram for a simple online bookstore system.</p><h2>Book Class</h2><p>The <code>Book</code> class represents a book in the online bookstore system. It has the following attributes:</p><ul><li><code>title</code>: the title of the book (string)</li><li><code>author</code>: the author of the book (string)</li><li><code>price</code>: the price of the book (float)</li><li><code>category</code>: the category of the book (string)</li><li><code>description</code>: the description of the book (string)</li><li><code>image</code>: the image URL of the book (string)</li><li><code>quantity</code>: the quantity of the book in stock (integer)</li></ul><p>In addition, it has the following method:</p><ul><li><code>getDetails()</code>: returns the details of the book as a formatted string.</li></ul><h2>Customer Class</h2><p>The <code>Customer</code> class represents a customer in the online bookstore system. It has the following attributes:</p><ul><li><code>name</code>: the name of the customer (string)</li><li><code>email</code>: the email of the customer (string)</li><li><code>password</code>: the password of the customer (string)</li><li><code>cart</code>: a list of <code>Book</code> objects that the customer has added to their cart</li><li><code>orders</code>: a list of <code>Order</code> objects that the customer has placed</li></ul><p>It also has the following methods:</p><ul><li><code>register()</code>: allows the customer to register an account.</li><li><code>login()</code>: allows the customer to log in to their account.</li><li><code>searchBooks()</code>: allows the customer to search for books by title, author, or category and returns a list of <code>Book</code> objects that match the search query.</li><li><code>addToCart()</code>: allows the customer to add a <code>Book</code> object to their cart.</li><li><code>placeOrder()</code>: allows the customer to place an order for all the books in their cart.</li><li><code>viewOrder()</code>: allows the customer to view a specific <code>Order</code> object.</li><li><code>cancelOrder()</code>: allows the customer to cancel a specific <code>Order</code> object.</li></ul><h2>Order Class</h2><p>The <code>Order</code> class represents an order in the online bookstore system. It has the following attributes:</p><ul><li><code>orderNumber</code>: the unique identifier of the order (integer)</li><li><code>books</code>: a list of <code>Book</code> objects that the customer has ordered</li><li><code>totalAmount</code>: the total amount of the order (float)</li><li><code>status</code>: the status of the order (string)</li><li><code>date</code>: the date the order was placed (Date)</li></ul><p>It also has the following method:</p><ul><li><code>getDetails()</code>: returns the details of the order as a formatted string.</li></ul><h2>Admin Class</h2><p>The <code>Admin</code> class represents an administrator in the online bookstore system. It has the following attributes:</p><ul><li><code>name</code>: the name of the administrator (string)</li><li><code>email</code>: the email of the administrator (string)</li><li><code>password</code>: the password of the administrator (string)</li></ul><p>It also has the following methods:</p><ul><li><code>addBook()</code>: allows the administrator to add a new <code>Book</code> object to the system.</li><li><code>editBook()</code>: allows the administrator to edit the details of an existing <code>Book</code> object.</li><li><code>removeBook()</code>: allows the administrator to remove an existing <code>Book</code> object from the system.</li><li><code>viewOrders()</code>: allows the administrator to view a list of all <code>Order</code> objects in the system.</li><li><code>updateOrderStatus()</code>: allows the administrator to update the status of an existing <code>Order</code> object.</li></ul><p><img src="https://raw.githubusercontent.com/example/online-bookstore/main/class-diagram.png" alt="class diagram"></p></div>
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
