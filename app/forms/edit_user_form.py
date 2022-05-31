from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
# from app.models import User


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


def full_name_exists(form, field):
    # Checking for full name, it cannot be blank
    full_name = field.data
    if full_name == null or full_name == '':
        raise ValidationError('Full name cannot be empty')



class EditUserForm(FlaskForm):
    profile_pic_url = StringField("profile_pic_url")
    full_name = StringField("full_name", validators=[DataRequired()])
    bio = StringField("bio")
