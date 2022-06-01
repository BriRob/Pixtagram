from email.policy import default
import datetime
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    profile_pic_url = db.Column(db.String, default="https://pixtagrambucket.s3.amazonaws.com/empty_pixter.png")
    full_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.Text, default='')
    verified = db.Column(db.Boolean, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    '''
    cascading ex:
    '''

    posts = db.relationship('Post', cascade = 'all, delete', back_populates = 'user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'profile_pic_url': self.profile_pic_url,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'verified': self.verified,
        }
