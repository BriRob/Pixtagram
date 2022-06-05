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
    comment10 = Comment(
        user_id=4, post_id=22, text='Nice first post!')
    comment11 = Comment(
        user_id=4, post_id=23, text='I love this!')
    comment12 = Comment(
        user_id=4, post_id=18, text='Too relatable')
    comment13 = Comment(
        user_id=5, post_id=18, text='OMG')
    comment14 = Comment(
        user_id=5, post_id=2, text='Good one!!')
    comment15 = Comment(
        user_id=6, post_id=3, text='😂😂')
    comment16 = Comment(
        user_id=6, post_id=12, text='50th?!')
    comment17 = Comment(
        user_id=7, post_id=19, text="😱 the moment you realize you'll being working on that error for a good few hours.. or more")
    comment18 = Comment(
        user_id=7, post_id=20, text="Nice photo!")
    comment19 = Comment(
        user_id=8, post_id=3, text="WOAH")
    comment20 = Comment(
        user_id=8, post_id=1, text="What is this?! 😂")
    comment21 = Comment(
        user_id=9, post_id=16, text="Why not today?")
    comment22 = Comment(
        user_id=10, post_id=9, text="Absolutely!")



    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
