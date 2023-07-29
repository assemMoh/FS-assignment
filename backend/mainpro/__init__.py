from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

api = Flask(__name__)
api.config['SECRET_KEY'] = 'T2xKNZBXZQEmwSpqJ5yv1SWrIwjXgeNQ'
api.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://assem:okay08@localhost/fs_assignment_db'
api.config['JWT_DEFAULT_REALM'] = 'your_realm_name_here'

db = SQLAlchemy(api)
bcrypt = Bcrypt(api)
login_manager = LoginManager(api)

CORS(api)


from mainpro import routes
