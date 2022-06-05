from app.models import db, User, Post


# Adds a demo user, you can add other users here if you want


def seeder():
    demo = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/demo_profile_pic.png', full_name='Pixta Demo', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        full_name='Marnie Friend', username='marnie', email='marnie@aa.io', password='password')
    beyonce = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/bey_profile_seeder.jpeg', full_name='Beyonce', username='bey', email='bey@aa.io', password='queenB', bio='All the single ladies!', verified=True)
    maica = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/Maica_seeder.jpg', full_name='Maica Santos', username='maicaS', email='maica@maica.io', bio="!false: it's funny because it's true.", verified=True, password='pixtagram')
    anthony = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/anthony_profile_pic_seeder.png', full_name='Anthony Bronca', username='anthonybronca', email='abronca@admin.io', bio='Can you find the 3 easter eggs in this site?', verified=True, password='pixtagram')
    agustin = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/agustin_seeder.jpg', full_name='Agustin Zucca', username='agustinZ', email='agustin@agus.io', bio='Argentine in Texas', verified=True, password='pixtagramagus')
    briana = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/bri_profile_seeder.jpeg', full_name='Briana Robinson', username='brianaR', email='briana@bri.io', bio='ATLien that loves music and french fries', verified=True, password='pixtagrambri')
    leah = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/leah_profile_pic_seeder.png', full_name='Leah Stern', username='leah_s', email='leah@leah.io', bio='Python enthusiast and Mod Lead extraordinaire', verified=True, password='LeahIsTheBest')
    stee = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/stee_profile_seeder.jpeg', full_name='Stee', username='stee301', email='stee@stee.io', bio='DIT traveling everywhere, Where should I go next?', verified=False, password='stee301')
    chere = User(
        profile_pic_url='https://pixtagrambucket.s3.amazonaws.com/coco_cherry_seeder.png', full_name='Chere-Anne Luscina', username='coco_cherry', email='chere@chere.io', bio="making my way downtown walking fast faces past and I'm home bound", verified=False, password='CaptainAmerica')


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

    post_1 = Post(
        user_id=1, img_url='https://pixtagrambucket.s3.amazonaws.com/Chris_chuckie.png', caption='Hello?!?!'
    )
    post_2 = Post(
        user_id=1, img_url='https://pixtagrambucket.s3.amazonaws.com/Meme-dev.png', caption='this is great'
    )
    post_3 = Post(
        user_id=2, img_url='https://pixtagrambucket.s3.amazonaws.com/meme_anotha.png'
    )
    post_4 = Post(
        user_id=2, img_url='https://pixtagrambucket.s3.amazonaws.com/code_view_seeder.jpeg', caption='My view everyday! 😍'
    )
    post_5 = Post(
        user_id=3, img_url='https://pixtagrambucket.s3.amazonaws.com/bey_seeder2.jpeg'
    )
    post_6 = Post(
        user_id=3, img_url='https://pixtagrambucket.s3.amazonaws.com/bey_seeder3.jpeg'
    )
    post_7 = Post(
        user_id=3, img_url='https://pixtagrambucket.s3.amazonaws.com/bey_seeder.jpeg'
    )
    post_8 = Post(
        user_id=4, img_url='https://pixtagrambucket.s3.amazonaws.com/wow_coffee.jpeg', caption='Story of my life!'
    )
    post_9 = Post(
        user_id=4, img_url='https://pixtagrambucket.s3.amazonaws.com/milk_seeder.jpeg', caption='The best milk'
    )
    post_10 = Post(
        user_id=5, img_url='https://pixtagrambucket.s3.amazonaws.com/scuba_seeder.jpeg', caption='What a time to be alive!'
    )
    post_11 = Post(
        user_id=5, img_url='https://pixtagrambucket.s3.amazonaws.com/nessie_anthony.png', caption='The one and only!'
    )
    post_12 = Post(
        user_id=2, img_url='https://pixtagrambucket.s3.amazonaws.com/disney_seeder.jpeg', caption='My 50th time at Disney!!'
    )
    post_13 = Post(
        user_id=6, img_url='https://pixtagrambucket.s3.amazonaws.com/doggy_seeder.jpeg', caption='Thought someone would like this'
    )
    post_14 = Post(
        user_id=6, img_url='https://pixtagrambucket.s3.amazonaws.com/lanterns_seeder.jpeg'
    )
    post_15 = Post(
        user_id=7, img_url='https://pixtagrambucket.s3.amazonaws.com/bri_violin.jpeg', caption="It's electric! Boogie woogie woogie"
    )
    post_16 = Post(
        user_id=7, img_url='https://pixtagrambucket.s3.amazonaws.com/cat_bri.jpeg', caption='One day 😍'
    )
    post_17 = Post(
        user_id=7, img_url='https://pixtagrambucket.s3.amazonaws.com/french_fries_bri.jpeg', caption='Fries is life!'
    )
    post_18 = Post(
        user_id=8, img_url='https://pixtagrambucket.s3.amazonaws.com/dev_meme.jpeg'
    )
    post_19 = Post(
        user_id=8, img_url='https://pixtagrambucket.s3.amazonaws.com/dev_meme2.jpeg', caption='Lol'
    )
    post_20 = Post(
        user_id=9, img_url='https://pixtagrambucket.s3.amazonaws.com/mountain_water.png', caption='Beautiful scenery!'
    )
    post_21 = Post(
        user_id=9, img_url='https://pixtagrambucket.s3.amazonaws.com/beautiful_flowers_mountain.png', caption='another gem'
    )
    post_22 = Post(
        user_id=10, img_url='https://pixtagrambucket.s3.amazonaws.com/coco_cherry_seeder_post1.png'
    )
    post_23 = Post(
        user_id=10, img_url='https://pixtagrambucket.s3.amazonaws.com/coco_cherry_seeder_post2.png', caption='Only blues, greens, and a little yellow'
    )
    post_24 = Post(
        user_id=6, img_url='https://pixtagrambucket.s3.amazonaws.com/giphy.gif', caption='Did you mean: recursion'
    )



    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.add(post_6)
    db.session.add(post_7)
    db.session.add(post_8)
    db.session.add(post_9)
    db.session.add(post_10)
    db.session.add(post_11)
    db.session.add(post_12)
    db.session.add(post_13)
    db.session.add(post_14)
    db.session.add(post_15)
    db.session.add(post_16)
    db.session.add(post_17)
    db.session.add(post_18)
    db.session.add(post_19)
    db.session.add(post_20)
    db.session.add(post_21)
    db.session.add(post_22)
    db.session.add(post_23)
    db.session.add(post_24)

    demo.user_likes.extend([post_1, post_2, post_3, post_5, post_6, post_7, post_24])
    marnie.user_likes.extend([post_2, post_3, post_5, post_6, post_7, post_24])
    beyonce.user_likes.extend([post_3])
    maica.user_likes.extend([post_22, post_23, post_15, post_10, post_18, post_5, post_6, post_7, post_24])
    anthony.user_likes.extend([post_7, post_14, post_18, post_5, post_6, post_24])
    agustin.user_likes.extend([post_22, post_23, post_18, post_19, post_5, post_6, post_7])
    briana.user_likes.extend([post_20, post_21, post_18, post_19, post_9, post_5, post_6, post_7, post_24])
    leah.user_likes.extend([post_22, post_23, post_9, post_11, post_5, post_6, post_7])
    stee.user_likes.extend([post_15, post_16, post_17, post_13, post_5, post_6])
    chere.user_likes.extend([post_8, post_9, post_10, post_11, post_5, post_6,])


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_seeder():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
