from crypt import methods
from app.api.auth_routes import logout
from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user
from app.models import User, db
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
    user = User.query.get(id)
    form = EditUserForm() #form is coming from thunk? we can print form.data after this
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.full_name = form.data['full_name']
        user.profile_pic_url = form.data['profile_pic_url']
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

# Get individual user for profile page
@user_routes.route('/<int:id>/delete', methods=['GET', 'DELETE']) #alligator brackets pull params for'id'
@login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    logout()
    return user.to_dict()
