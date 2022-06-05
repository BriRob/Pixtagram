from crypt import methods # idk

from wsgiref.handlers import format_date_time
from app.api.auth_routes import logout
# from app.forms.create_post_form import CreatePostForm, EditPostForm

from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.forms.create_comment_form import CreateCommentForm
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

@comment_routes.route('/<int:commentId>/single-comment')
# @login_required
def get_splash_comments(commentId):
    comment=Comment.query.get(commentId)
    # query_dict = query_comment.to_dict()

    # print("THIS IS THE ROUTE FOR GETTING ALL COMMENTS \n\n", comment)
    return comment.to_dict()
    # pass

# Get All Comments, for specific post, need postId from frontend, filter?
@comment_routes.route('/<int:postId>')
@login_required
def get_post_comments(postId):
    comments = Comment.query.filter(Comment.post_id == postId).order_by(Comment.id.asc()).all()
    # print("\n\n", comments)
    # print("one comment", comments[0])
    return {"comments_list": [comment.to_dict() for comment in comments]}

# Create a comment for one post, will need postId
@comment_routes.route('/<int:postId>/<int:userId>/new', methods=['GET','POST'])
@login_required
def create_comment(postId, userId):
    print('HELLO FROM THE CREATE COMMENT ROUTE \n\n')
    # print("request \n\n", request.data)
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # if 'text' in request.files:

        new_comment = Comment(
            user_id=userId,
            post_id=postId,
            text=form.data["text"],
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# Delete comment, get one comment then delete it
@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    post_id = comment.post_id
    db.session.delete(comment)
    db.session.commit()
    # After deleting get all the comments? - ms
    get_post_comments(post_id)
    return comment.to_dict()
