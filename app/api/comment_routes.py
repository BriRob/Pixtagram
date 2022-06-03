from crypt import methods # idk

from wsgiref.handlers import format_date_time
from app.api.auth_routes import logout
# from app.forms.create_post_form import CreatePostForm, EditPostForm

from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, Post, db, Comment
# from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.helpers import dates_converter, post_e

comment_routes = Blueprint("comments", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages



# Get All Comments, for specific post, need postId from frontend, filter?
@comment_routes.route('/<int:postId>/')
@login_required
def get_post_comments(postId):
    comments = Comment.query.filter(Comment.post_id == postId).all()
    # print("\n\n", comments)
    # print("one comment", comments[0])
    return {"comments": [comment.to_dict() for comment in comments]}

# Create a comment for one post, will need postId
@comment_routes.route('/<int:postId>/new', methods=['POST'])
@login_required
def create_comment(postId):
    pass


# Delete comment, get one comment then delete it
@comment_routes.route('/<int:commentId>/delete', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    pass
