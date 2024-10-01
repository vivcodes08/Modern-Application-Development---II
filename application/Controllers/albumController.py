from flask import Blueprint,request,jsonify
from sqlalchemy import text
from application.models import Song, db, Role,User,Album
from time import time
from datetime import datetime
import json
from flask_security import auth_required, roles_required, login_user,current_user
albumBluePrint=Blueprint('albumBluePrint',__name__,url_prefix='/album')


@albumBluePrint.route('/v1/register',methods=['POST'])
def register():

    if request.method == 'POST':
        albumData=request.get_json();

        name=albumData.get('name')
        description=albumData.get('description')
        imageURL=albumData.get('imageURL')
        creator_id=albumData.get('creator_id')
        creator_name=albumData.get('creator_name')
        isActive=True

        newAlbum=Album(
            name=name,
            description=description,
            image=imageURL,
            creator_id=creator_id,
            creator_name=creator_name,
            isActive=isActive
        )
        
        db.session.add(newAlbum)
        db.session.commit()

        return jsonify({
            "Status":200,
            "Message":"Created successfully"
        })
    

@albumBluePrint.route('/v1/list/<creator_id>' ,methods=['GET'])
def getAlbums(creator_id):

    if request.method == 'GET':
    
        sql=text(f"select * from album where creator_id={creator_id}")
        result=db.session.execute(sql).fetchall()

        print("result",result)
        albums=[]
        for album in result:
            dict={
                "id":album[0],
                "name":album[1],
                "description":album[2],
                "imageURL":album[3],
                "creator_id":album[4],
                "creator_name":album[5],
                "isActive":album[6]

            }
            albums.append(dict)


        
        return jsonify({
            "status":200,
            "Data":albums
        })
    
@albumBluePrint.route("/v1/<album_id>",methods=['DELETE','PATCH'])
def delete_album(album_id):

    if request.method == 'DELETE':

        query=text(f"DELETE FROM song where album_id={album_id}")
        result=db.session.execute(query)
        db.session.commit()

        query=text(f"DELETE FROM album WHERE id={album_id}")
        result2=db.session.execute(query)
        db.session.commit()

        return jsonify({
            "Status":200,
            "Data":"Deleted album successfully"
        })
    
    if request.method == "PATCH":

        id=album_id;
        data=request.get_json();
        name=data.get('name')
        imageURL=data.get('imageURL')
        description=data.get('description')

        query=text(f"UPDATE ALBUM SET name='{name}', description='{description}', image='{imageURL}' WHERE id={id}")
        result=db.session.execute(query)
        db.session.commit()

        return jsonify({
            "Status":200,
            "Data":"Album successfully updated"
        })

@albumBluePrint.route('/v1/list' ,methods=['GET'])
def getAllAlbums():

    if request.method == 'GET':
    
        sql=text(f"select * from album")
        result=db.session.execute(sql).fetchall()

        print("result",result)
        albums=[]
        for album in result:
            dict={
                "id":album[0],
                "name":album[1],
                "description":album[2],
                "imageURL":album[3],
                "creator_id":album[4],
                "creator_name":album[5],
                "isActive":album[6]

            }
            albums.append(dict)


        
        return jsonify({
            "status":200,
            "Data":albums
        })



