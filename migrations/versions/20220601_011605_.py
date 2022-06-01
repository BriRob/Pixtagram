"""empty message

Revision ID: 66abdb93620c
Revises: 769fc6d12950
Create Date: 2022-06-01 01:16:05.329047

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66abdb93620c'
down_revision = '769fc6d12950'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('user', sa.Integer(), nullable=False))
    op.add_column('comments', sa.Column('post', sa.Integer(), nullable=False))
    op.drop_constraint('comments_user_id_fkey', 'comments', type_='foreignkey')
    op.drop_constraint('comments_post_id_fkey', 'comments', type_='foreignkey')
    op.create_foreign_key(None, 'comments', 'posts', ['post'], ['id'])
    op.create_foreign_key(None, 'comments', 'users', ['user'], ['id'])
    op.drop_column('comments', 'post_id')
    op.drop_column('comments', 'user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('comments', sa.Column('post_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.create_foreign_key('comments_post_id_fkey', 'comments', 'posts', ['post_id'], ['id'])
    op.create_foreign_key('comments_user_id_fkey', 'comments', 'users', ['user_id'], ['id'])
    op.drop_column('comments', 'post')
    op.drop_column('comments', 'user')
    # ### end Alembic commands ###