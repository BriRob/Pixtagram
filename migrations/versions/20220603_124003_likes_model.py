"""likes model

Revision ID: 136561e19348
Revises: f4fe1cff8b05
Create Date: 2022-06-03 12:40:03.878577

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '136561e19348'
down_revision = 'f4fe1cff8b05'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('likes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'post_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    # ### end Alembic commands ###
