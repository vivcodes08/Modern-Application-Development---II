from flask import Blueprint,request,jsonify
from sqlalchemy import text
from application.models import Song, db, Role,User,UserFeedback
from time import time
from datetime import datetime

import json
from flask_security import auth_required, roles_required, login_user,current_user
feedBackPrint=Blueprint('feedbackPrint',__name__,url_prefix='/feedback')



@feedBackPrint.route('/v1/register',methods=['POST'])
def feedbackRegister():
    if request.method == 'POST':

                

        feedback=request.get_json()
        user_id=feedback.get('user_id')
        creator_id=feedback.get('creator_id')
        comment=feedback.get('comment')
        rating=feedback.get('rating')
        song_id=feedback.get('song_id')

        query=text(f"SELECT count(1) as count from user_feedback where song_id={song_id} and user_id={user_id}")
        result=db.session.execute(query).fetchone()
        count=result[0];
        print("count",count)
        if count>0:
            return jsonify({
                "Status":400,
                "Message":"Comment already exists"
            })

        userFeedback=UserFeedback(
            creator_id=creator_id,
            user_id=user_id,
            comment=comment,
            song_id=song_id,
            rating=rating

            )
        db.session.add(userFeedback)
        db.session.commit()




    return jsonify({
        "Status":200,
        "Messgae":"Commented Posted Successfully"
    })


