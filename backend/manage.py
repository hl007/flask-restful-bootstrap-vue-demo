from app import *
from app.resources.task_api import TaskList,Tasks
from app.resources.user_api import Account,Token,UserList
from app.common.MySQLconnect import *


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@auth.error_handler
def unauth():
    return make_response(jsonify({"message": "认证失败"}), 401)


app = create_app()
api = Api(app)

api.add_resource(Account,"/account")
api.add_resource(UserList,"/users")
api.add_resource(Token,"/token")
api.add_resource(TaskList, "/tasks", endpoint="tasks")
api.add_resource(Tasks, "/tasks/<int:task_id>", endpoint="task")


if __name__ == "__main__":
    app.run(debug=True)
