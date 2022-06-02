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


Leah questions(monday):
Does flask read all the way down first and then hop pages? Or does it hop pages once it hits line 32, then comes back to finish the page?

Flask runs everything in init and then when it hits the import lines, it hops and reads everything in those files and then it makes it available to the rest of the init

Do we need to add the parameters in the function (see line 30 in user routes)

YES! We can do this /<id>/<username> to pull multiple.
Example:
@route('/<id>/<username>')
def user(id, username)



Python Regex library:  https://docs.python.org/3/library/re.html

s3 is a feature of AWS. Cloud storage for buckets.
There are other features such as VM in the cloud, but s3 is for media

-------------------------


Flask Notes:


step 1: Set up a new api file/route depending on what you are doing:
If you are setting up a new file make sure to add boiler plate:
- models
- any forms you might need
- flask imports (blueprint, request, etc.)

Then create a variable for route name as an instance of blueprint:
ex:   -    user_routes = Blueprint('users', __name__)

Then create the route as needed:
Methods allowed = 'GET', 'POST', 'PUT', 'DELETE'
Routes that require user to be signed in will need a wrapper (@login_required, imported from flask_login)


step 2:
Flask reads the root __init__ file. Here we import a blueprint route (ex: from .api.auth_routes import auth_routes )

step 3: Register the blueprint as part of app. Parameter 1 = file name, param 2 = url_prefix('/api/whatever')


***back_populates: connects one relaitonship to other tables



IN CASE HEROKU DB DOESN'T WANT TO WORK
    heroku run -a pixtagramapp flask db upgrade
    heroku run -a pixtagramapp flask seed undo
    heroku run -a pixtagramapp flask seed all

    heroku pg:psql -a pixtagramapp
    heroku logs -a pixtagramapp

