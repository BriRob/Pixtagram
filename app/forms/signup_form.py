from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')

def name_length_check(form, field):
    # print(dir(field.label))
    # print(field.label.text)
    name = field.data
    if (field.label.text == "Full Name"):
        if len(name) > 50:
            raise ValidationError(f'{field.label.text} must be less than 50 characters')
    # if (field.label.text == "Username"):
    #     if len(name) > 40:
    #         raise ValidationError(f'{field.label.text} must be less than 40 characters')
    if (field.label.text == "Password" or field.label.text == "Username"):
        if len(name) > 30:
            raise ValidationError(f'{field.label.text} must be less than 30 characters')


class SignUpForm(FlaskForm):
    full_name = StringField("Full Name", validators=[DataRequired(message="Full Name is required"), name_length_check])
    username = StringField(
        'Username', validators=[DataRequired(message="Username is required"), name_length_check, username_exists])
    email = StringField('Email', validators=[DataRequired("Email is required"), Email(message="Invalid email address"), user_exists])
    password = StringField('Password', validators=[DataRequired(message="Password is required"), name_length_check])
