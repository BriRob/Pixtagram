from crypt import methods
from app.api.auth_routes import logout
from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, db
from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.forms.edit_user_form import EditUserForm

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
                return {"errors": "file type not permitted"}, 400

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
