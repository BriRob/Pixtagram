PSQL
create user pixta_user with password 'pixtapassword' createdb;
create database pixtagram_app with owner pixta_user;

pipenv shell
flask db migrate
flask db upgrade
flask seed all
flask run

just in case
flask seed undo

Associations
Users Table
    Users has many posts.
    Users has many comments.
    Users has many likes.
Posts Table
    A post belongs to a single user.
    A post has many likes.
    A post has many comments.
Comments Table
    A comment belongs to one user.
    A comment belongs to one post.
Likes Table
    A like belongs to one user.
    A like belongs to one post.
