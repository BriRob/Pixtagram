from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


# will need error handling for text input that has more than one space and no other characters
# def no_spaces_caption(form, field):
#    # if input given is ONLY spaces
#   # .custom((value) => !/^ *$/.test(value))
#   # .withMessage("Comment must contain characters"),

#     caption = field.data
#     # user = User.query.filter(User.email == email).first()
#     if (re.match("/^ *$/", caption)):
#         pass
#     # if user:
#         raise ValidationError('Email address is already in use.')

class CreatePostForm(FlaskForm):
    img_url = StringField("img_url", validators=[DataRequired(message='Cannot share post without image')])
    caption = TextAreaField("caption")

class EditPostForm(FlaskForm):
    caption = StringField("caption")
    # caption = StringField("caption", validators=[no_spaces_caption])
