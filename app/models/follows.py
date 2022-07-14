from .db import db

class Follow(db.Model): 
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower_user = db.relationship("User", back_populates="follower", foreign_keys=[follower_id])
    following_user = db.relationship("User", back_populates='following', foreign_keys=[following_id])

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'following_id': self.following_id
        }
