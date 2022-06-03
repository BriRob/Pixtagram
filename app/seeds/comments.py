from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
       user_id=2, post_id=1, text='woah woah woah, lookin good')
    comment2 = Comment(
       user_id=3, post_id=2, text='This is awesome!')
    comment3 = Comment(
       user_id=2, post_id=1, text='REALLY GOOD.')
    comment4 = Comment(
       user_id=1, post_id=2, text='This is a test comment.')
    comment5 = Comment(
       user_id=1, post_id=3, text='Thank you Bri for being amazing')
    comment6 = Comment(
       user_id=1, post_id=1, text='Thank you Anthony for being amazing')
    comment7 = Comment(
       user_id=1, post_id=1, text='Thank you Agus for being amazing')
    comment8 = Comment(
        user_id=1, post_id=3, text='HELLO???')
    comment9 = Comment(
        user_id=2, post_id=3, text='Much wow beautiful')


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
