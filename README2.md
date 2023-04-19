<h1>Server</h1>

# Atuh route:
    /auth
   takes (email, password) it uses validation and it generates token and send it in "Authorization" header expires in 2 days


# user routes:
      /user
   gives u user (username, email, id) by sending email in body request {email:"example@ex.com"} method: GET

      /user/create
   creates a user by sending (username, email, password) in body request {email:"example@ex.com", username: "example", password: "example$123"} method: POST

      /user/drop
   drops a user by sending (email) and (password) in body request {email:"example@ex.com", password: "example$123"} method: DELETE

      /user/{id}
   returns user (_id, username, email, avatar, bio, createdAt) by putting id method: GET
    
      /user/{id}/full
   returns user every (every user information except password) by putting id method: GET
    
      /user/{id}/store
   returns user every (username, avatar, store) by putting id method: GET
