from flask import Blueprint,request,jsonify
from sqlalchemy import text
from application.models import Song, db, Role,User,Playlist, MapSongPlaylist
from time import time
from datetime import datetime
import json
from application.instance import cache
from flask_security import auth_required, roles_required,roles_accepted, login_user,current_user
songBluePrint=Blueprint('songBluePrint',__name__,url_prefix='/song')

def row2dict(row):
    print("-----Row-----\n")
    print(row)
    return{
        "id":row[0],
        "name":row[1],
        "lyrics":row[2],
        "imageURL":row[3],
        "creator_id":row[4],
        "creator_name":row[5],
        "artist_name":row[6],
        "labels":row[7],
        "genre":row[8],
        "rating":row[9],
        "views":row[10],
        "duration":row[11],
        "filename":"/uploads/"+row[12],
        "album_id":row[13],
        "isActive":row[14]    

    }

@songBluePrint.route('/v1/api', methods=['POST'])
def createSong():

    if request.method=='POST':
      
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})
    
    
        upload_folder = 'static/uploads'
        file.save(f'{upload_folder}/{file.filename}')
       
        new_song=Song(
            name=request.form["name"],
            lyrics=request.form["lyrics"],
            image=request.form["image"],
            creator_id=request.form["creator_id"],
            creator_name=request.form["creator_name"],
            artist_name=request.form["artist_name"],
            genere=request.form["genere"],
            labels=request.form["labels"],
            durations=request.form["durations"],
            isActive=True,
            album_id=request.form["album_id"],
            filename=file.filename
        )
        
        db.session.add(new_song)
        db.session.commit()

        return jsonify({
            "status":201,
            "Message":"Song Created Successfully"
        })
  
@songBluePrint.route('/v1/api',methods=['GET'])
@cache.cached(timeout=30)
def getAllSongs():
    sql=text('select * from song')
    result = db.session.execute(sql)
    names = [row2dict(row) for row in result]

    
    print("names",names)

    return jsonify({
        "status":200,
        "Data":names
    })

@songBluePrint.route('/v1/api/edit/<SongId>', methods=['PATCH'])
def updateSong(SongId):

    data=request.get_json();
    name=data.get('name')
    artist_name=data.get('artist_name')
    durations=data.get('durations')
    genere=data.get('genre')
    imageURL=data.get('imageURL')
    lyrics=data.get('lyrics')
    labels=data.get('labels')
    album_id=data.get('album_id')

  

    song=Song.query.filter_by(id=int(SongId)).first()
    song.name=name
    song.artist_name=artist_name
    song.image=imageURL
    song.genere=genere
    song.labels=labels
    song.lyrics=lyrics
    song.album_id=album_id
    song.durations=durations
    db.session.commit()


    return jsonify({
        "Status":200,
        "Message":"Updated Successfully"
    })


    return

@songBluePrint.route('/v1/api/user/<userId>',methods=['GET'])
def getUserSong(userId):
    sql=text(f'select * from song where creator_id={userId}')
    result = db.session.execute(sql)
    names = [row2dict(row) for row in result]

    
    print("names",names)

    return jsonify({
        "status":200,
        "Data":names
    })


@songBluePrint.route('/v1/api/<SongId>',methods=['GET'])
def getSongId(SongId):

    id=int(SongId)
    sql=text(f"select * from song where id={SongId}")
    result = db.session.execute(sql)
    names = [row2dict(row) for row in result]

    
    print("names",names)

    return jsonify({
        "status":200,
        "Data":names
    })
  
@songBluePrint.route("/v1/song/<song_id>",methods=["DELETE"])
def deleteSongById(song_id):
    
    if request.method == "DELETE":
        query=text(f"DELETE FROM MAP_SONG_PLAYLIST WHERE SONG_ID={song_id}")
        result=db.session.execute(query)
        db.session.commit()
        query=text(f"delete from song  where id={song_id}")
        result2=db.session.execute(query)
        db.session.commit()

        return jsonify({
            "Status":200,
            "Message":"Song Deleted successfully"
            })



@songBluePrint.route('/v1/plays',methods=['PATCH'])
def updateViews():
    
    if request.method == 'PATCH':

        songData=request.get_json();
        print(songData)
        songid=songData.get('song_id');
        sql=text(f"select * from song where id={songid}")
        result = db.session.execute(sql)
        names = [(row) for row in result]
        current_plays=names[0][10]
        updateplays=current_plays+1;
        print
        sql=text(f"update song set plays={updateplays} where id={songid} returning id,name,plays")
        updatedRes=db.session.execute(sql).fetchone();
        db.session.commit();
        print('updatedRes',updatedRes)
        


        



        return jsonify({
            "Message":"Views updated successfully",
            "SongId":updatedRes[0],
            "songName":updatedRes[1],
            "current_count":updatedRes[2]
        })
  

@songBluePrint.route('/v1/playlist',methods=['POST','PATCH'])
def playlist():
    if request.method == 'POST':

        playData=request.get_json();
        name=playData.get('name')
        description=playData.get('description')
        creator_id=playData.get('creator_id')
        creator_name=playData.get('creator_name')
        isActive=True


        newPlaylist=Playlist(
            name=name,
            description=description,
            creator_id=creator_id,
            creator_name=creator_name,
            isActive=isActive
        )

        db.session.add(newPlaylist)
        db.session.commit();

        return jsonify({
            "Status":201,
            "Message":"Successfully created"
        })
    
    if request.method == "PATCH":

        data=request.get_json();
        id=data.get("id")
        name=data.get("name")
        description=data.get("description")

        query=text(f"UPDATE PLAYLIST SET NAME='{name}' ,description='{description}' WHERE ID={id}")
        res=db.session.execute(query)
        db.session.commit()


        return jsonify({
            "Status":200,
            "Message":"Update Successfully"
        })

@songBluePrint.route("/v1/map", methods=["POST"])
def mapSongPlaylist():

    if request.method == "POST":

        mapData=request.get_json();
        playlist_id=mapData.get("playlist_id")
        user_id=mapData.get("user_id")
        song_id=mapData.get("song_id")

        sql=text(f"select count(1) as count from map_song_playlist where song_id={song_id} and playlist_id={playlist_id}")

        result=db.session.execute(sql).fetchone()
        count=result[0];
        print("count",count)
        if count>0:
            return jsonify({
                "Status":400,
                "Message":" Already Addded to Playlist"
            })

        newMapping=MapSongPlaylist(
            playlist_id=playlist_id,
            user_id=user_id,
            song_id=song_id,
        )
        db.session.add(newMapping)
        db.session.commit();




        return jsonify({
            "status":200,
            "Message":"Mapped Successfully"
        })        
    
@songBluePrint.route("/v1/playlist/list/<Id>", methods=["GET"])
def listPlaylistByUserId(Id):
    
    sql=text(f"select * from playlist where creator_id={Id}")
    result=db.session.execute(sql).fetchall()

    print("result",result)
    playlist=[]
    for play in result:
            dict={
                "id":play[0],
                "name":play[1],
                "description":play[2],
                "creator_id":play[3],
                "creator_name":play[4],
                "isActive":play[5]

            }
            playlist.append(dict)


        
    return jsonify({
            "status":200,
            "Data":playlist
        })
    
    
    
    return

@songBluePrint.route("/v1/playlist/<Id>/songs", methods=["GET"])
def getAllSongsByPlaylistId(Id):

    if request.method == "GET":

        query=text(f"SELECT * FROM MAP_SONG_PLAYLIST WHERE playlist_id={Id}")
        print("query",query)
        result=db.session.execute(query).fetchall();
        print("Result views",result)

        songPlaylistArray=[]

        for row in result:
            songId=int(row[1])
            print("---SongId---------",songId)
            result1=getSongId(songId).get_json()
            print("Result1",result1)
            print("Result----\n",result1['Data'][0])
            songPlaylistArray.append(result1['Data'][0])




        return jsonify({
            "Status":200,
            "Data":songPlaylistArray
        })


@songBluePrint.route('/v1/song/playlist',methods=['DELETE'])
def deleteSongFromPlaylist():

    if request.method == 'DELETE':

        data=request.get_json();
        user_id=int(data.get('user_id'))
        song_id=int(data.get('song_id'))
        playlist_id=int(data.get('playlist_id'))

        query=text(f"DELETE FROM MAP_SONG_PLAYLIST WHERE SONG_ID={song_id} AND USER_ID={user_id} AND PLAYLIST_ID={playlist_id}")
        result=db.session.execute(query)
        db.session.commit()

        return jsonify({
            "Status":"200",
            "Message":"Deleted Successfully",
        })
    

@songBluePrint.route('/v1/playlist/<playlist_id>',methods=['DELETE'])
def deletePlaylist(playlist_id):

    if request.method == 'DELETE':

        query=text(f"DELETE FROM MAP_SONG_PLAYLIST WHERE PLAYLIST_ID={playlist_id}")
        result=db.session.execute(query)
        db.session.commit()
        query=text(f"DELETE FROM PLAYLIST WHERE ID={playlist_id}")
        result2=db.session.execute(query)
        db.session.commit()

        return jsonify({
            "Status":"200",
            "Message":"Playlist Deleted Successfully",
        })

