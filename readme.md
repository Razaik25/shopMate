### Project #2: ShopMate

#![](https://static.mgmresorts.com/content/dam/MGM/monte-carlo/retail/shopping-hero-image/monte-carlo-amenities-shopping-bags.tiff.image.1440.550.high.jpg)

### Introduction - How to use it?

This application will allow the users to maintain a **simple shopping list**. Do you often make shopping list, then this is exactly the app for you. On the app homepage, once you log in it will show you all the items you have added to your shopping list. If you have don't have an account you can sign up for it.You can organize your shopping needs in different lists. You can input an item in the list from keyboard. You can mark it as bought. Hopefully, this app makes it easy for you to manage and customize you shopping needs.

### Technologies Used:
* HTML/CSS
* JavaScript
* Node.js
* Express.js
* Postgres/SQL
* bcrypt node module
* pg node module
* body-parser node module
* dotenv node module
* morgan node module
* express-session node module
* connect-pg-simple node module
* method-override node module
* path node module
* pryjs node module
* ejs templating engine

### User Stories:
* As a user, there should be a welcome page that allows me to sign up for the application or log in if i already have an account.
* As a user, after I log-in, the page should be inviting and it should let me complete most of the application functions from this page.
* As a user, I should able to make a new list and add/update/delete items to it.
* As a user, I should be able to see all of my shopping lists.

### DataBase Design:
#### Entity Relationship Diagram version 1:
#![](ERD.png)

### Wireframes version 1:
#![](wireframes.png)


### RESTful Routes:
||Description| Method | Route Name | View rendered |
|---|---|---|---|---|
|1|Show welcome page | GET  | `/` | `index.ejs` |
|2|Click on sign up | POST  | `/` | _none_, redirects to view 4 |
|3|Login page| POST | `/users/login` | _none_, redirects to view 4|
|4|Show lists specific to each user|GET|`/users/:user_id`|`users_one.ejs`|
|6|Edit lists specific to each user |POST or PUT?|`/users/:user_id/:list_id/edit`| users_one.ejs|
|7|Edit Items in lists specific to each user |POST or PUT?|`/users/:user_id/:list_id/edit/:item_id`| users_one.ejs|
|8|Delete Items in a list |DELETE|`/users/:user_id/:list_id/edit/:item_id`| none, redirects to the users_one.ejs|
|9|Show create new list form |GET| `/users/:user_id/:list_id/new| |users_edit.ejs|
