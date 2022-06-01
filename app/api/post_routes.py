from crypt import methods
from app.api.auth_routes import logout
from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, Post, db
from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.forms.edit_user_form import EditUserForm

post_routes = Blueprint('posts',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


#Get All Posts
@post_routes.route('/')
# @login_required
def get_all_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}
    # print(posts[2].to_dict())
    # return '<h1>HELLO MAICA</h1>'

# Get One Post
@post_routes.route('/<int:id>', methods=['GET']) #alligator brackets pull params for'id'
# @login_required
def get_one_post(id):
    post = Post.query.get(id)
    return post.to_dict()

# Create a Post
@post_routes.route('/new', methods=["GET","POST"])
@login_required
def create_post():
    pass
'''
ms/br - still need to make a form

'''