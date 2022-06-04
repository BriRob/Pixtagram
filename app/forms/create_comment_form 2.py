import imp
from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

# Trying input required might need to changeto DataRequired later -ms
class CreateCommentForm(FlaskForm):
    text = TextAreaField("text", validators=[DataRequired(message='Cannot post empty comment.')])
