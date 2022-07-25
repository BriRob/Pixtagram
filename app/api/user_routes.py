from crypt import methods
from app.api.auth_routes import logout
from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, db
from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.forms.edit_user_form import EditUserForm
from app.models.follows import Follow

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


#Get all users for home feed page
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


#Get individual user for profile page
@user_routes.route('/<int:id>', methods=['GET']) #alligator brackets pull params for'id'
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


#Edit User Route
@user_routes.route('/<int:id>/edit', methods=["GET","PUT"])
@login_required
def edit_user(id):

    # print("request.files!!!! ================== \n\n", request.files)
    # data = request.data
    # profile_pic_url = request.json["profile_pic_url"]
    # image = request.json["profile_pic_url"]
    # print("profile pic \n\n", profile_pic_url)
    user = User.query.get(id)
    form = EditUserForm() #form is coming from thunk? we can print form.data after this

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        # url = form.data['profile_pic_url']

        if "profile_pic_url" in request.files:
        #     return {"errors": "image required"}, 400
            image = request.files["profile_pic_url"]
            print("image ======== \n\n", image)
            if not allowed_file(image.filename):
                return {"errors": ["Image file type not permitted"]}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return upload, 400

            url = upload["url"]
            print("url \n\n", url)
            user.profile_pic_url = url


        user.full_name = form.data['full_name']
        # user.profile_pic_url = form.data['profile_pic_url']
        # user.profile_pic_url = url
        user.bio = form.data['bio']
        db.session.add(user)
        db.session.commit()

        return {"user": user.to_dict()} #to_dict translates a user class to dic (fake json)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


'''
    example for possible follower/s query
    users = User.query.all().filter(userId == followerId)
'''

'''
example delete query

    person = user.query.get(id)
    if person == True: person.delete()

'''


# Delete one User

@user_routes.route('/<int:id>/delete', methods=['GET', 'DELETE']) #alligator brackets pull params for'id'
@login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    logout()
    return user.to_dict()


#Get all users for Search feature

@user_routes.route('/all', methods=['GET'])
@login_required
def get_all_users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/admins', methods=['GET'])
@login_required
def get_all_admins():
    users = User.query.all()
    admins = {}
    for user in users:
        if user.verified == True and user.email !='leah@leah.io' and user.email != 'bey@aa.io':
            admins[f"{user.full_name}"] = user.to_dict()
    return admins

# getting all followers for one user
@user_routes.route('/followers/<int:user_id>', methods=['GET'])
@login_required
def get_all_followers(user_id):
    # followers = Follow.query.filter(Follow.following_id == user_id).join(User, User.id == Follow.follower_id).all()
    followers = Follow.query.filter(Follow.following_id == user_id).all()
    # print("\n\n followers id \n\n", followers[0].id)
    # print("\n\n followers \n\n", followers)

    # larry = User.query.get(followers[0].follower_id)


    # print("HELLO \n\n", isinstance(User.query.get(followers[0].id), type(None))
    # print("HELLO LARRY \n\n", larry)


    # print("TRUE OR FALSE \n\n",User.query.get(followers[0].id) is None)


    user_followers = {follower.id: User.query.get(follower.follower_id).to_dict() for follower in followers}
    # user_followers_li = [User.query.get(follower.id) for follower in followers]
    # print("Userfollowers_li", user_followers_li);
    # user_followers = {fol.id: fol.to_dict() for fol in user_followers_li }

    # user_followers = {follower.id: follower.to_dict() for follower in followers}
    # print("\n\n user_followers", user_followers)
    return user_followers
    # pass

# this user is following...
@user_routes.route('/following/<int:user_id>', methods=['GET'])
@login_required
def get_all_following(user_id):
    # followers = Follow.query.filter(Follow.following_id == user_id).join(User, User.id == Follow.follower_id).all()
    followings = Follow.query.filter(Follow.follower_id == user_id).all()
    user_following = {follow.id: User.query.get(follow.following_id).to_dict() for follow in followings}

    # print("\n\n followers \n\n", followers)
    # user_followers = {follower.id: follower.to_dict() for follower in followers}
    # print("\n\n user_followers", user_following)
    return user_following

@user_routes.route('/follow/<int:user_id>/<int:following_user_id>', methods=['PUT'])
@login_required
def follow(user_id, following_user_id):
    new_follow = Follow(follower_id=user_id, following_id=following_user_id)
    print("Just in case - api \n\n", new_follow.to_dict())


    db.session.add(new_follow)
    db.session.commit()

    return new_follow.to_dict()

@user_routes.route('/unfollow/<int:user_id>/<int:following_user_id>', methods=['DELETE'])
@login_required
# def unfollow(user_id, following_user_id):
def unfollow(user_id, following_user_id):
    # print("HELLO????? \n\n")
    ids = Follow.query.filter(Follow.follower_id == user_id).all()
    print("SHOW ME IDs \n\n", ids)
    # follow = Follow.query.filter(Follow.follower_id == )
    # print("Just in case - api \n\n", new_follow.to_dict())

    um = filter(lambda x: x.following_id == following_user_id, ids)

    final_follows_list = list(um)
    # print("THIS IS UM \n\n", final_follows_list)
    # db.session.add(new_follow)
    # db.session.commit()
    for follow in final_follows_list :
        db.session.delete(follow)

    db.session.commit()

    # print("FINAL FOLLOWS LIST \n\n", {"final_follows":final_follows_list})
    return {"final_follows":"YOU DID IT ---->"};
    # return new_follow.to_dict()


    # pass
