from mainpro import api

# instead of using FLASK_DEBUG=1 -> python start.py
if __name__ == '__main__':
    api.run(debug=True)