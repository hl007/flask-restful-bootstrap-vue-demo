# author: hualiang
# created on: 2019-09-05 16:02

from app import *
from app.common.MySQLconnect import *


class Account(Resource):
    def post(self):
        username = request.json.get("username")
        password = request.json.get("password")
        if username is None or password is None:
            abort(400)  # missing arguments
        if User.query.filter_by(username=username).first() is not None:
            abort(400)  # existing user
        user = User(username=username)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        return {"username": user.username}, 201


class UserList(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("index", type=int, required=True,
                                   help="No index provided or index is not a number",
                                   location="args")
        self.reqparse.add_argument("size", type=int, required=True,
                                   help="No size provided or size is not a number",
                                   location="args")
        super(UserList, self).__init__()

    def get(self):
        args = self.reqparse.parse_args()
        index = int(args["index"])
        size = int(args["size"])

        res=User.query.filter_by().limit(size).offset((index-1)*15).all()
        user_list=[]
        for i in res:
            item={}
            item["id"]=i.id
            item["username"]=i.username
            item["password"]=i.password
            user_list.append(item)
        return {"user_list": user_list}, 200


class Token(Resource):
    decorators = [auth.login_required]

    def get(self):
        token = g.user.generate_auth_token(60*2)
        return {"token": token.decode("ascii"), "duration": 60*2}



