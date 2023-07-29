from mainpro import db, api, login_manager, bcrypt
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User (db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

class Number(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {'num': self.num}


# with api.app_context():
#     db.create_all()
#     new_users = [
#         {"email": 'foo1@gmail.com', "password": bcrypt.generate_password_hash("@Foo1").decode('utf-8')},
#         {"email": 'foo2@gmail.com', "password": bcrypt.generate_password_hash("@Foo2").decode('utf-8')},
#         {"email": 'foo3@gmail.com', "password": bcrypt.generate_password_hash("@Foo3").decode('utf-8')}
#     ]
#     new_numbers = [
#         {"num": 30},
#         {"num": 20},
#         {"num": 75},
#         {"num": 3}
#     ]
#     users = [User(email = user['email'], password = user['password']) for user in new_users]
#     numbers = [Number(num = new_number['num']) for new_number in new_numbers]
#     db.session.add_all(users)
#     db.session.add_all(numbers)
#     db.session.commit()
