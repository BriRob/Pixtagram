from crypt import methods

from wsgiref.handlers import format_date_time
from app.api.auth_routes import logout
from app.forms.create_post_form import CreatePostForm, EditPostForm

from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, Post, db
from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.helpers import dates_converter, post_e


post_routes = Blueprint('posts',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    # print("HERE ARE ERROR MESSAGES \n\n", errorMessages)
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


#Get All Posts
@post_routes.route('/')
@login_required
def get_all_posts():
    posts = Post.query.order_by(Post.id.desc()).all()
    returnedPosts = {'posts': [post.to_dict() for post in posts]}
    # print('THIS IS THE RETURNED POSTS \n\n', returnedPosts)
    return {'posts': [post.to_dict() for post in posts]}

# Get One Post
@post_routes.route('/<int:id>', methods=['GET']) #alligator brackets pull params for'id'
@login_required
def get_one_post(id):
    query_post = Post.query.get(id)
    query_dict = query_post.to_dict()
    date_created = query_dict['created_at']
    date_string = date_created.strftime("%Y,%-m,%-d")
    post = dates_converter(date_string)
    post_e()
    query_dict['days_since'] = post
    return query_dict

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
        if "img_url" in request.files:

            image = request.files["img_url"]
            # print("image ======== \n\n", image)

            if not allowed_file(image.filename):
                return {"errors": ["Image file type not permitted"]}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]

        # print('CREATE HAS BEEN VALIDATED')

        new_post = Post(
            user_id=userId,
            # img_url=form.data["img_url"],
            img_url=url,
            caption=form.data["caption"]
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    # print('END OF ROUTE')
    # print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit post route, only editing the caption
@post_routes.route('/<int:postId>/edit', methods=["GET","PUT"])
@login_required
def edit_post(postId):
    print("IN EDIT POST ROUTE")

    post = Post.query.get(postId)
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('EDIT HAS BEEN VALIDATED')

        post.caption = form.data["caption"]

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
        # return {"user": user.to_dict()}   example from user_routes edit
    # print('END OF ROUTE')
    # print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete one Post
@post_routes.route('/<int:post_id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    # get_one_post(post_id)
    return post.to_dict()
    # return


# add like to post, PUT
@post_routes.route('/<int:post_id>/<int:user_id>', methods=['PUT'])
@login_required
def like_post(post_id, user_id):
    post = Post.query.get(post_id)
    user = User.query.get(user_id)

    post.post_likes.append(user)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:post_id>/<int:user_id>/remove', methods=['PUT'])
@login_required
def remove_like(post_id, user_id):
    post = Post.query.get(post_id)
    user = User.query.get(user_id)

    # print("post likes before!!!! \n\n", post.post_likes)
    post.post_likes.remove(user)
    db.session.commit()
    # print("post likes after!!!! \n\n", post.post_likes)

    return post.to_dict()
