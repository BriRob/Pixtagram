from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
# from app.models import User

v = []
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


def length_check(form, field):
    # Checking for full name, it cannot be blank
    input = field.data
    if (field.label.text == "Full Name"):
        if len(input) > 50:
            raise ValidationError(f'{field.label.text} must be less than 50 characters')
    if (field.label.text == "Bio"):
        if len(input) > 150:
            raise ValidationError(f'{field.label.text} must be less than 150 characters')


class EditUserForm(FlaskForm): # flask form auto does (Req.body)
    profile_pic_url = StringField("profile_pic_url")
    full_name = StringField("Full Name", validators=[DataRequired(message='Full name must not be empty'), length_check]) #pass in msg = ''
    bio = StringField("Bio", validators=[length_check])
