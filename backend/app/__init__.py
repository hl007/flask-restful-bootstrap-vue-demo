# author: hualiang
# created on: 2019-09-05 12:44

from flask import Flask, make_response, jsonify, g, request
from flask_restful import fields, Api, Resource, reqparse, marshal, abort
from flask_httpauth import HTTPBasicAuth
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import *


db = SQLAlchemy()
auth = HTTPBasicAuth()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    db.init_app(app)
    return app