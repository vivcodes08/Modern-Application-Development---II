from flask import current_app as app,Blueprint, jsonify, request,json
from application.models import Likes,db
from sqlalchemy import text
from application.Controllers.songController import getSongId
from flask_security import auth_required
likeBluePrint=Blueprint('likeBluePrint',__name__,url_prefix='/like')


@likeBluePrint.route('/v1/upsert',methods=['PATCH'])
def likeSong():
    if request.method == 'PATCH':

        likeData=request.get_json();
        SongId=likeData.get('song_id');
        UserId=likeData.get('user_id');
        isLiked=likeData.get('is_liked');

        isExist=text(f'SELECT COUNT(1) AS COUNT FROM LIKES WHERE SONG_ID={SongId} AND USER_ID={UserId}')
        result=db.session.execute(isExist).fetchone()
        count=result[0];
        print("count",count)

        if count >0:
            query=text(f"UPDATE LIKES SET ISLIKED={isLiked} WHERE USER_ID={UserId} AND SONG_ID={SongId} returning *")
            updatedLikes=db.session.execute(query).fetchone()
            db.session.commit()
            print("updatedLikes",updatedLikes)

            return jsonify({
                "status":201,
                "likeId":updatedLikes[0],
                "songId":updatedLikes[1],
                "userId":updatedLikes[2],
                "isLiked":updatedLikes[3],
                "Message":"Updated"

            })   
        else:
            query=text(f"INSERT INTO LIKES (USER_ID, SONG_ID, ISLIKED) VALUES({UserId},{SongId},{isLiked}) returning *")
            insertedLikes=db.session.execute(query).fetchone()
            db.session.commit()
            print("insertedLikes",insertedLikes)


            return jsonify({
                "status":201,
                "likeId":insertedLikes[0],
                "songId":insertedLikes[1],
                "userId":insertedLikes[2],
                "isLiked":insertedLikes[3],
                "Message":"Inserted"
        })


@likeBluePrint.route('/v1/<SongId>/<UserId>',methods=['GET'])

def getLike(SongId, UserId):

    print("SongId",SongId)
    print("UserId",UserId)
    query=text(f"SELECT COUNT(1) AS count ,ISLIKED FROM Likes WHERE USER_ID={UserId} AND SONG_ID={SongId}")
    result=db.session.execute(query).fetchone()
    count=result[0]
    like=result[1]

    if count >= 0 :
        return jsonify({
            "isLiked":like
        })
    else:
        return jsonify({
            "isLiked":0
        })

    return jsonify({
        "isLiked":""
    })

@likeBluePrint.route("/v1/list/song/<userId>", methods=["GET"])
def listLikedSongs(userId):

    query=text(f"SELECT * FROM likes where isLiked=1 and user_id={userId}")
    result=db.session.execute(query).fetchall()

    songLikedArray=[]

    for row in result:
            songId=int(row[1])
            print("---SongId---------",songId)
            result1=getSongId(songId).get_json()
            print("Result----\n",result1['Data'][0])
            songLikedArray.append(result1['Data'][0])

    return jsonify({
            "Status":200,
            "Data":songLikedArray
        })

