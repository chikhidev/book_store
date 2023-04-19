<h1>Server</h1>

# Atuh route:
   <span style="color: blue">/auth</span>
    takes (email, password) it uses validation and it generates token and send it in "Authorization" header expires in 2 days

# user routes:
    /* password hashed*/

   <span style="color: blue">/user</span>
    gives u user (username, email, id) by sending email in body request {email:"example@ex.com"} method: GET

   <span style="color: blue">/user/create</span>
    creates a user by sending (username, email, password) in body request {email:"example@ex.com", username: "example", password: "example$123"} method: POST

   <span style="color: blue">/user/drop</span>
    drops a user by sending (email) and (password) in body request {email:"example@ex.com", password: "example$123"} method: DELETE

   <span style="color: blue">/user/{id}</span>
    returns user (_id, username, email, avatar, bio, createdAt) by putting id method: GET
    
   <span style="color: blue">/user/{id}/full</span>
    returns user every (every user information except password) by putting id method: GET
    
   <span style="color: blue">/user/{id}/store</span>
    returns user every (username, avatar, store) by putting id method: GET
