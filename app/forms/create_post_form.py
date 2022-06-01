from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


# will need error handling for text input that has more than one space and no other characters
# def no_spaces_caption(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')

class CreatePostForm(FlaskForm):
    img_url = StringField("img_url", validators=[DataRequired(message='Cannot post without image.')])
    caption = TextAreaField("caption")
