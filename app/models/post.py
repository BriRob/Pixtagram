import datetime
from sqlalchemy import ForeignKey
from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    '''
    The table for Posts
    - leaving out Mixins
    - associations:
        A post belongs to a single user.
        A post has many likes.
        A post has many comments.
    '''
    user = db.relationship('User', back_populates = 'posts')
    comments = db.relationship('Comment', back_populates = 'posts', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'img_url': self.img_url,
            # 'post': [post.to_dict() for post in self.posts],
            'caption': self.caption,
            'created_at': self.created_at
        }
