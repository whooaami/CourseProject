import time
import serial
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

DB_URI = "mysql+pymysql://root:qwertyYarko@localhost/kursova_db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'thisisasecretkey'

db = SQLAlchemy(app)
ma = Marshmallow(app)
#

arduino_serial = serial.Serial("COM2", 9600, timeout=1)
cors = CORS(app)


class Example(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    example = db.Column(db.String(255), nullable=False)

    def __init__(self, example):
        self.example = example

    def __repr__(self):
        return f"id: {self.id}, example: {self.example}"


class ExampleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'example')


example_schema = ExampleSchema()
examples_schema = ExampleSchema(many=True)


@app.route("/calculator", methods=["GET"])
def get_me():
    examples = Example.query.all()
    result = examples_schema.dump(examples)
    return jsonify(result)


@app.route("/calculator", methods=["POST"])
def post_request():
    command = request.get_json()
    print(command)
    send_command(command)
    if command == "button_equals":
        # print(arduino_serial.read(30))
        time.sleep(3)
        send_data(arduino_serial.readline().decode('Ascii'))
        print(arduino_serial.readline().decode('Ascii'))
        arduino_serial.read()

    print(f"Command: {command}, List: {command}")
    return 'Success', 200


def send_data(example):
    test = example[-5:]
    data_set = {"example": test}
    json_dump = json.dumps(data_set)
    print(json_dump)
    data = ExampleSchema().loads(json_dump)

    new_example = Example(**data)

    print(new_example)
    db.session.add(new_example)
    db.session.commit()


def send_command(command):
    arduino_serial.write(command.encode())


db.create_all()

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
