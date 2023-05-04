#/user

##GET /user: a route for searching users, which takes a query parameter q and returns an array of users whose username or email contains the specified search term.
##POST /user: a route for getting the user information by passing an authentication token in the request header. It returns the user's basic information (username, email, avatar, bio, and creation date).
##GET /user/:id: a route for getting a user by their ID. It returns the user's basic information.
##POST /user/:id/make_admin: a route for making a user an admin by passing their ID. This route requires an authentication token and checks if the authenticated user is an admin.
##GET /user/:id/full: a route for getting a user by their ID, including all fields except password.
##GET /user/:id/store: a route for getting a user's store by their ID. It returns the user's store object (if any), including store name and avatar.
##GET /user/:id/card: a route for getting a user's card by their ID. This route requires an authentication token and returns the user's card object (if any).
