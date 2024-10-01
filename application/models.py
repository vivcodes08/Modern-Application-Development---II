from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
db = SQLAlchemy()
from datetime import datetime

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))

class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary='roles_users',
                         backref=db.backref('users', lazy='dynamic'))
    
class Role(db.Model,RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lyrics = db.Column(db.String, nullable=False)
    image= db.Column(db.String, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creator_name = db.Column(db.String, nullable=False)
    artist_name=db.Column(db.String, nullable=False)
    labels=db.Column(db.String,nullable=True)
    genere=db.Column(db.String,nullable=True)
    ratings=db.Column(db.String,nullable=True)
    plays=db.Column(db.Integer,nullable=True,default=0)
    durations=db.Column(db.String,nullable=True)
    filename=db.Column(db.String,nullable=True)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=True)
    isActive=db.Column(db.Boolean(), default=True)

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image= db.Column(db.String, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creator_name = db.Column(db.String, nullable=False)
    isActive = db.Column(db.Boolean(), default=True)

class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description= db.Column(db.String, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creator_name = db.Column(db.String, nullable=False)
    isActive = db.Column(db.Boolean(), default=True)  

class MapSongPlaylist(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    song_id=db.Column(db.Integer, db.ForeignKey('song.id'),nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    playlist_id=db.Column(db.Integer, db.ForeignKey('playlist.id'),nullable=False)

class Likes(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    song_id=db.Column(db.Integer, db.ForeignKey('song.id'),nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    isLiked = db.Column(db.Boolean(), default=True)  

class UserFeedback(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    creator_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    song_id=db.Column(db.Integer,db.ForeignKey('song.id'))
    rating=db.Column(db.Integer, nullable=False)
    comment=db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


