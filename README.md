<h1 align="center">Project Name</h1>


<p align="center">
  <b>Server</b>
</p>

<p align="center">
  <i>Auth route</i><br>
  <code>/auth</code><br>
  This route takes an email and a password, validates the inputs, generates an authentication token, and sends it in the "Authorization" header. The token expires in 2 days.
</p>

<p align="">
  <i>User routes</i><br>
  <code>/user</code><br>
  This route returns the user's username, email, and id by sending the email in the request body using the GET method.
</p>

<p align="">
  <code>/user/create</code><br>
  This route creates a user by sending the username, email, and password in the request body using the POST method.
</p>

<p align="">
  <code>/user/drop</code><br>
  This route deletes a user by sending the email and password in the request body using the DELETE method.
</p>

<p align="">
  <code>/user/{id}</code><br>
  This route returns the user's _id, username, email, avatar, bio, and createdAt by putting the id in the request URL using the GET method.
</p>

<p align="">
  <code>/user/{id}/full</code><br>
  This route returns the user's information (except password) by putting the id in the request URL using the GET method.
</p>

<p align="">
  <code>/user/{id}/store</code><br>
  This route returns the user's username, avatar, and store by putting the id in the request URL using the GET method.
</p>
