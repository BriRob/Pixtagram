from crypt import methods
from app.api.auth_routes import logout
from app.forms.create_post_form import CreatePostForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, Post, db
from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename


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
@login_required
def get_all_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}
    # print(posts[2].to_dict())
    # return '<h1>HELLO MAICA</h1>'

# Get One Post
@post_routes.route('/<int:id>', methods=['GET']) #alligator brackets pull params for'id'
@login_required
def get_one_post(id):
    post = Post.query.get(id)
    return post.to_dict()

# Create a Post
@post_routes.route('/<int:userId>/new', methods=["POST"])
@login_required
def create_post(userId):
    # currUser = User.query.get(userId)
    # print('BEFORE CREATEPOST INSTIANZTS')
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print('INSIDE OF THE NEW POST ROUTE' )
    # print('\n\n')


    if form.validate_on_submit():
        # AWS needed - magic
        # validate incoming url
        # get new url from AWS
        print('CREATE HAS BEEN VALIDATED')
        new_post = Post(
            user_id=userId,
            img_url=form.data["img_url"],
            # img_url=url,
            caption=form.data["caption"]
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    # print('END OF ROUTE')
    # print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
