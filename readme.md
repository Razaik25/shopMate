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
|1|Show application login/signup page | GET  | `/` | `index.ejs` |
|2|If the user signs up, take them to welcome page | POST | |`/welcome`| |`welcome.ejs`|
|3|If the user logs in, take them to welcome page | GET | |`/welcome`| |`welcome.ejs`|
|4|Show myaccount page, after step 2 or 3, this will show all the lists specific to each user | GET | |`myaccount`| |`users_one.ejs`|
|5|If the user clicks on add list then let the user add list name and items to it|GET,POST |myaccount\lists\add| |`users_one.ejs`|
|6|When the user clicks on a edit/delete specific list, it will show all the items in the list | GET | |`lists\:list_id`| |`users_one_list.ejs`|
|7|If it is edit, show all the items in the list  | GET | |`lists\:list_id`| |`users_one_list.ejs`|
|8|If it is delete | delete | |`lists\:list_id`| |delete the list and show all my lists view `users_one.ejs`|
|9|If the user clicks on the specific item, take them to that item page |GET| |`lists\:list_id\items\:item_id`| |`users_one_list_item.ejs`|
|10|If the user clicks on update item, take them to the parent list page with updated information| PUT | |`lists\:list_id`| |`users_one_list.ejs`|
|11|If the user clicks on delete item, take them to the parent list |DELETE| |`users_one_list.ejs`|
