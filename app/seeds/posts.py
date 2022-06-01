from app.models import db, Post

def seed_posts():
    post_1 = Post(
        user_id=1, img_url='https://pixtagrambucket.s3.amazonaws.com/Chris_chuckie.png', caption='Hello?!?!'
    )
    post_1 = Post(
        user_id=1, img_url='https://pixtagrambucket.s3.amazonaws.com/Meme-dev.png', caption='test'
    )
    post_1 = Post(
        user_id=2, img_url='https://pixtagrambucket.s3.amazonaws.com/meme_anotha.png', caption='test'
    )
    post_1 = Post(
        user_id=3, img_url='', caption='test'
    )
    post_1 = Post(
        user_id=6, img_url='', caption='test'
    )
    post_1 = Post(
        user_id=10, img_url='', caption='test'
    )
    post_1 = Post(
        user_id=4, img_url='', caption='test'
    )
    post_1 = Post(
        user_id=7, img_url='', caption='test'
    )
    post_1 = Post(
        user_id=5, img_url='', caption='test'
    )
