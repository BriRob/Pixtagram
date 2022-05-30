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





for aws
pipenv install boto3


------------------------------------------------------
    GIT FLOW

    TO pull from a team members branch:
    - They have to add and commit changes first
    - Make a new Branch with  ---> ``` git checkout -b <name of your branch> ```
    - Pull INTO YOUR NEW BRANCH with ---> ``` git pull origin <teammates branch> ```

------------------------------------------------------


Colors
4c516d - independence


potential pallet
https://coolors.co/palette/000100-2a3439-4c516d-979aaa-f8f8f8-f18f01


navbar color - #cfd0d4
