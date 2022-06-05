import imp
from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

# Trying input required might need to changeto DataRequired later -ms
def length_check(form, field):
    # print(dir(field.label))
    # print(field.label.text)
    comment = field.data
    # print("TRYING IF LENGTH CHECK")
    if len(comment) > 140:
        # print("SUPER LONG COMMENT!!!!!! \n\n")
        raise ValidationError(f'{field.label.text} must be less than 140 characters')

class CreateCommentForm(FlaskForm):
    text = TextAreaField("Comment", validators=[DataRequired(message='Cannot post empty comment.'), length_check])
