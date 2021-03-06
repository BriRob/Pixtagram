"""new users

Revision ID: 64d53bed114c
Revises: ffdc0a98111c
Create Date: 2022-05-27 12:22:50.198603

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64d53bed114c'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('profile_pic_url', sa.String(), nullable=True))
    op.add_column('users', sa.Column('full_name', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('bio', sa.Text(), nullable=True))
    op.add_column('users', sa.Column('verified', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'created_at')
    op.drop_column('users', 'verified')
    op.drop_column('users', 'bio')
    op.drop_column('users', 'full_name')
    op.drop_column('users', 'profile_pic_url')
    # ### end Alembic commands ###
