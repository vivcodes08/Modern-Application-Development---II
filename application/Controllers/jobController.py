from flask import current_app as app,Blueprint, jsonify, request, send_file,render_template,json

from application.sec import datastore
from application.models import User, db,RolesUsers,Song
from werkzeug.security import generate_password_hash,check_password_hash
import flask_excel as excel
from celery.result import AsyncResult
import flask_excel as excel
from application.tasks import send_app_stats_email
jobBluePrint=Blueprint('jobBluePrint',__name__,url_prefix='/job')






@jobBluePrint.route("/download-csv",methods=["GET"])
def download_csv():

    if request.method == "GET":
        song_res=Song.query.with_entities(
            Song.id,Song.name
        ).all()

        print(song_res)

        csv_output=excel.make_response_from_query_sets(song_res,["id","name"],"csv",status=200,file_name="text1.csv")
        print(csv_output,"csv output")
        return csv_output


@jobBluePrint.route("/download-csv2",methods=["GET"])
def download_csv2():

    if request.method == "GET":
        query_sets=Song.query.filter_by(id=1).with_entities(Song.id,Song.name).all()
        column_names=['id','name']
        print(query_sets)
        return excel.make_response_from_array(
            [["1","Mat Kar Maya Ko ankhar"],["2","Suraj"]],
            column_names,
            "xls",
            file_name="output.xls"
        )
        

@jobBluePrint.route("/all/app/report",methods=["GET"])
def allAppReport():
    taskId=send_app_stats_email.delay()
    return jsonify({
        "TaskId":taskId.id,
    })        
    
      
@jobBluePrint.get('/get-csv/<task_id>')
def get_csv(task_id):
    res = AsyncResult(task_id)
    if res.ready():
        filename = res.result
        print("Filename",filename)
        return send_file(filename, as_attachment=True)
    else:
        return jsonify({"message": "Task Pending"}), 404


