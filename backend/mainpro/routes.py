from flask import Response, request, jsonify
from mainpro import  api, db, bcrypt
from mainpro.models import User, Number
from flask_login import current_user, login_user, logout_user, login_required

import flask

@api.route('/login', methods=['POST'])
def main():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email, password)
    with api.app_context():
        users = db.session.query(
            User
        ).all()
        found = check_credentials(email, password, users)
        if found:
            print(current_user)
            return jsonify({"message": "success"}), 200
            # payload = {'email': email}
            # token = jwt.encode(payload, api.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
            # return jsonify({"token": token}), 200
        else:
            return jsonify({"message": "invalid credentials"}), 401

def check_credentials(email, password, users):
    for user in users:
        if user.email == email and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return True
    return False


@api.route('/get_numbers', methods=['GET'])
# @login_required
def get_numbers():
    with api.app_context():
        numbers = db.session.query(
            Number
        ).all()
        numbers_dict = [num.to_dict() for num in numbers]
        return jsonify(numbers_dict), 200
    
    
@api.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "logged out"}), 200


@api.route('/add_number', methods=['POST'])
def add_number():
    data = request.get_json()
    new_num = data.get('new_number')
    with api.app_context():
        new_entry = Number(num = new_num)
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({"message":"okay"}), 200

        
@api.route('/delete_number', methods=['DELETE'])
def delete_number():
    # data = request.get_json()
    # deleted_num = data.get('num')
    deleted_num = request.args.get('num')
    with api.app_context():
        new_entry = db.session.query(
            Number
        )\
        .filter(Number.num == deleted_num)\
        .first()
        db.session.delete(new_entry)
        db.session.commit()
        return jsonify({"message":"deleted"}), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    passwd = data.get('password')
    with api.app_context():
        emails = db.session.query(
            User
        ).all()
        found = check_email(email, emails)
        if not found:
            new_user = User(email = email, password = bcrypt.generate_password_hash(passwd).decode('utf-8'))
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message":"added"}), 200
        else:
            return jsonify({"message":"email taken"}), 400

def check_email(new_email, emails):
    for mail in emails:
        if new_email == mail.email:
            return True
    return False
