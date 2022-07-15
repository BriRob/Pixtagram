from flask.cli import AppGroup

from .follows import seed_follows, undo_follows
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments,undo_comments
from .post_user_seeder import seeder, undo_seeder
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seeder()
    # seed_users()
    # Add other seed functions here
    # seed_posts()
    seed_follows()
    seed_comments()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_seeder()
    # undo_users()
    # Add other undo functions here
    # undo_posts()
    undo_follows()
    undo_comments()
