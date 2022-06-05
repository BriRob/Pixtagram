from app.models import db, User


# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        full_name='Pixta Demo', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        full_name='Marnie Friend', username='marnie', email='marnie@aa.io', password='password')
    beyonce = User(
        full_name='Beyonce', username='bey', email='bey@aa.io', password='queenB', bio='All the single ladies!', verified=True)
    maica = User(
        profile_pic_url='', full_name='Maica Santos', username='maicaS', email='maica@maica.io', bio="!false: it's funny because it's true.", verified=True, password='pixtagram')
    anthony = User(
        profile_pic_url='', full_name='Anthony Bronca', username='anthonybronca', email='abronca@admin.io', bio='Can you find the 3 easter eggs in this site?', verified=True, password='pixtagram')
    agustin = User(
        profile_pic_url='', full_name='Agustin Zucca', username='agustinZ', email='agustin@agus.io', bio='Argentine in Texas', verified=True, password='pixtagramagus')
    briana = User(
        profile_pic_url='', full_name='Briana Robinson', username='brianaR', email='briana@bri.io', bio='ATLien that loves music and french fries', verified=True, password='pixtagrambri')
    leah = User(
        profile_pic_url='', full_name='Leah Stern', username='leahS', email='leah@leah.io', bio='Python enthusiast and Mod Lead extraordinaire', verified=True, password='LeahIsTheBest')
    stee = User(
        profile_pic_url='', full_name='Stee', username='stee301', email='stee@stee.io', bio='DIT traveling everywhere, Where should I go next?', verified=False, password='stee301')
    chere = User(
        profile_pic_url='', full_name='Chere-Anne Luscina', username='coco_cherry', email='chere@chere.io', bio="making my way downtown walking fast faces past and I'm home bound", verified=False, password='CaptainAmerica')

    

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(beyonce)
    db.session.add(maica)
    db.session.add(anthony)
    db.session.add(agustin)
    db.session.add(briana)
    db.session.add(leah)
    db.session.add(stee)
    db.session.add(chere)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
