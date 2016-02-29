DROP TABLE if EXISTS users CASCADE;
DROP TABLE if EXISTS users_lists CASCADE;
DROP TABLE if EXISTS items CASCADE;

CREATE TABLE users (
       users_id SERIAL PRIMARY KEY UNIQUE,
       name VARCHAR(255),
       email VARCHAR(255),
       password_digest TEXT
);

CREATE TABLE users_lists (
       list_id SERIAL PRIMARY KEY UNIQUE,
       name VARCHAR(255),
       users_id integer REFERENCES users(users_id)
);

CREATE TABLE items (
      item_id SERIAL PRIMARY KEY UNIQUE,
      item_name VARCHAR(255),
      quantity VARCHAR(255),
      comments varchar(255),
      brought boolean,
      price money,
      list_id integer REFERENCES users_lists(list_id)
);
