from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Pixta Demo', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        full_name='Marnie Friend', username='marnie', email='marnie@aa.io', password='password')
    beyonce = User(
        full_name='Beyonce', username='bey', email='bey@aa.io', password='queenB', bio='All the single ladies!', verified=True)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(beyonce)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
