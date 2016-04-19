### ShopMate
---

#![](https://static.mgmresorts.com/content/dam/MGM/monte-carlo/retail/shopping-hero-image/monte-carlo-amenities-shopping-bags.tiff.image.1440.550.high.jpg)
---

### Introduction - How to use it?
---

This application will allow the users to maintain a **simple shopping list**. Do you often make shopping list, then this is exactly the app for you. On the app homepage, once you log in it will show you all the items you have added to your shopping list. If you have don't have an account you can sign up for it.You can organize your shopping needs in different lists. You can input an item in the list from keyboard. You can mark it as bought. Hopefully, this app makes it easy for you to manage and customize you shopping needs.

### Technologies and Dependencies used:
---
#### Technologies

* HTML5/CSS5
* JavaScript
* PostgresSQL
* RESTful Routes

#### Dependencies

* Node.js
* Express.js
* brcrypt
* pg
* body-parser
* dotenv
* morgan
* express-session
* connect-pg-simple
* method-override
* favicon
* path
* pryjs  
* ejs templating engine

### Instructions:
---
Please visit at http://shopmate.herokuapp.com/

### User Stories:
---
* As a guest, there should be a welcome page
* As a guest, the welcome page should let me  sign up if I don't have an account
* As a member, the welcome page should let me log in to the application
* As a member, after I log-in, the page should be inviting and it should let me complete most of the application functions from this page.
* As a member, I should be able to see all the lists that I have created.
* As a member, I should able to make a new list.
* As a member, I should be able to able to  add/update/delete items to a list.


### DataBase Design:
---
#### Entity Relationship Diagram:
#![](ERD.png)

### Wireframes:
#![](wireframes.png)

### Views Used:
---
* index - Renders the signup page along with log in button
* login- Renders the login page for the user
* users_lists - Renders all the lists specific to each user with an option to view lists , display each list in card view with all the names of the items in the list
* users_one_list_edit - Renders one list for the user with items to edit
* user_add_list - Add a new list
* user_one_list_item - Add item to the list

### RESTful Routes:
||Description| Method | Route Name | View rendered |
|---|---|---|---|---|
|1|Show application login/signup page | GET | `/` | `index.ejs` |
|2|Show lists page, this will show all the lists specific to each user | GET |`/lists` |`users_lists.ejs`|
|3|If the user clicks on add list then let the user add list name and add the list to corresponding to user_id|GET,POST |`lists/new` |`users_add_list.ejs`|
|4|After user adds the list, let the user add the items to the list |GET,POST| `/lists/listname/items`|`users_one_list_item.ejs`
|5|When the user clicks on a edit/delete specific list, it will show all the items in the list | GET  |`lists/:list_id`|`users_one_list.ejs`|
|6|If it is edit, show all the items in the list  | GET  |`lists\:list_id`|`users_one_list.ejs`|
|7|If it is delete list |DELETE | |`lists\:list_id` |delete the list and show all my lists view `users_one.ejs`|
|8|If the user clicks on the specific item, take them to that item page |GET|`lists\:list_id\items\:item_id` |`users_one_list_item.ejs`|
|9|If the user clicks on update item, take them to the parent list page with updated information| GET,PUT  |`lists\:list_id\items\edit`|`users_one_list.ejs`|
|10|If the user clicks on delete item, take them to the parent list |DELETE| `lists\:list_id\items\edit`|`users_one_list.ejs`|

### Future Implementations:
* Implement the showing error messages to the users
* Implement user roles (Admin and customers)
* Query google api to get the first image of the item the user enters
* Include Jquery to add animations for the user interface
* Improve the application interface
* Make the website responsive
* Give an option to user where they are able to create groups and share lists with other users
