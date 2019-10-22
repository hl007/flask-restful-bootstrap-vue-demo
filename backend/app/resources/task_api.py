# author: hualiang
# created on: 2019-09-05 12:51

from app import *
from app.common.MySQLconnect import *


class TaskList(Resource):
    decorators = [auth.login_required]

    def get(self):
        index = int(request.args.get("index"))
        size = int(request.args.get("size"))

        res=Task.query.filter_by().limit(size).offset((index-1)*size).all()
        count=Task.query.filter_by().count()
        task_list=[]
        for i in res:
            item={}
            item["task_id"]=i.task_id
            item["title"]=i.title
            item["content"]=i.content
            task_list.append(item)

        return {"task_list": task_list, "index": index, "size": size, "count": count}, 200

    def post(self):
        data= request.get_json("data")
        title = data["title"]
        content = data["content"]

        t=Task()
        t.title = title
        t.content = content
        db.session.add(t)
        db.session.commit()

        return {"message":"操作成功"}, 200


class Tasks(Resource):
    decorators = [auth.login_required]

    def put(self,task_id):
        data = request.get_json("data")
        title = data["title"]
        content = data["content"]

        Task.query.filter_by(task_id=int(task_id)).update({
            Task.title: title,
            Task.content: content
        })
        db.session.commit()

        return {"message":"操作成功"},200

    def delete(self,task_id):
        Task.query.filter_by(task_id=int(task_id)).delete()
        db.session.commit()

        return {"message": "操作成功"}, 200



