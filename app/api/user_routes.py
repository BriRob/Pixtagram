from flask import Blueprint, jsonify, request
from flask_login import login_required
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
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/edit', methods=["GET","PUT"])
@login_required
def edit_user(id):
    """
    Edit a user route
    """

    # data=request.json
    # print("What is Data.json??", data)

    user = User.query.get(id)
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.full_name = form.data['full_name']
        user.profile_pic_url = form.data['profile_pic_url']
        user.bio = form.data['bio']
        db.session.add(user)
        print("HELLO FROM EDIT ROUTE")
        db.session.commit()

        return {"user": user.to_dict()}
        # return {"user": [user]}
    # return {"user": "Blue"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
