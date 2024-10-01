from flask import Flask,redirect,url_for,jsonify
from config import DevelopmentConfig
from flask_security import Security
from application.models import db, User, Role ,RolesUsers,UserFeedback,Song
from config import DevelopmentConfig
from application.sec import datastore
from application.Controllers.songController import songBluePrint
from application.Controllers.mainController import mainBluePrint
from application.Controllers.feedBackController import feedBackPrint
from application.Controllers.albumController import albumBluePrint
from application.Controllers.likeController import likeBluePrint
from application.Controllers.jobController import jobBluePrint
from application.Controllers.statsController import statsBluePrint
from application.Controllers.swaggerController import swaggeruiBluePrint
from application.instance import cache
from application.worker import  celery_init_app
from celery.result import AsyncResult
import flask_excel as excel
# from application.Controllers.swaggerController import swaggerui_blueprint
from application.tasks import sayhello
from celery.schedules import crontab
from application.tasks import  daily_remainder,send_app_stats_email
def registerbluePrints(app):
    app.register_blueprint(songBluePrint)
    app.register_blueprint(mainBluePrint)
    app.register_blueprint(feedBackPrint)
    app.register_blueprint(albumBluePrint)
    app.register_blueprint(likeBluePrint)
    app.register_blueprint(jobBluePrint)
    app.register_blueprint(statsBluePrint)
    app.register_blueprint(swaggeruiBluePrint)
from datetime import timedelta    

def create_app():
    app = Flask(__name__, static_url_path='')
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    cache.init_app(app)
    excel.init_excel(app)
    app.security = Security(app, datastore)
    registerbluePrints(app)
    # with app.app_context():
    #     db.create_all()
    return app

app=create_app()
celery_app=celery_init_app(app)

@app.get('/say-hello')
def say_hello_view():
    #Trigger Task
    res=sayhello.delay()
    return jsonify({
        "Task-id":res.id
    })

@app.route("/celeryTask/status/<id>")
def check_status(id):
    res=AsyncResult(id)
    print("res",res)
    if res.ready():
        return jsonify({
            "Task-id":id,
            "Status":"Compeleted"
        })
    elif res.failed():
        return jsonify({
            "Task-id":id,
            "Status":"failed"
        })
    else:
        return jsonify({
            "Task-id":id,
            "Status":"Pending or Not Started"
        })

    return jsonify({
        "Task_id":res.id or "",
        "Task_state":res.state or "",
        "Task_result":res.result or ""
    })


@celery_app.on_after_configure.connect
def send_email(sender,**kwargs):

    sender.add_periodic_task(
        10.0,
        send_app_stats_email.s(),
        name="send every 10 seconds"
    )


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('mainBluePrint.index'))

if __name__ =='__main__':
    app.run(debug=True)
