from mainpro import db, api
from mainpro.models import User, Post
import sys

# Create Database
def create_db():
    with api.app_context():
        # you will have instance folder with site.db inside
        db.create_all()

# def create_users():
#     with api.app_context():
#         new_user = User(username='Yahia2', email='Yahia2@gmail.com', password='123')
#         db.session.add(new_user)
#         db.session.commit()

if __name__ == '__main__':
    globals()[sys.argv[1]]()