from app.models import db, likes


# Adds a demo user, you can add other users here if you want
def seed_likes():
    likes1 = likes(user_id=2, post_id=1)
    likes2 = likes(user_id=3, post_id=2)
    likes3 = likes(user_id=2, post_id=1)
    likes4 = likes(user_id=1, post_id=2)
    


    db.session.add(likes1)
    db.session.add(likes2)
    db.session.add(likes3)
    db.session.add(likes4)
    db.session.commit()
   


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()