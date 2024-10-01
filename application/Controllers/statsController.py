import matplotlib as mpt
import matplotlib.pyplot as plt
import numpy as np
from flask import Blueprint,request,jsonify,send_file
from sqlalchemy import text
from application.models import Song, db, Role,User,Playlist, MapSongPlaylist
from time import time
from datetime import datetime
import json
from application.instance import cache
from flask_security import auth_required, roles_required, login_user,current_user
statsBluePrint=Blueprint('statsBluePrint',__name__,url_prefix='/stats')
from io import BytesIO


def generate_plot(x,y,xlabel,ylabel):
    # Create a dummy bar plot
    data = [1, 3, 5, 7, 9]
    labels = ['A', 'B', 'C', 'D', 'E']

    plt.bar(x, y)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title('Song Vs Plays')

    # Save the plot as a PDF file
    pdf_output = BytesIO()
    plt.savefig(pdf_output, format='pdf')
    plt.close()

    return pdf_output

@statsBluePrint.route('/creator/songs/views/<creatorId>',methods=['GET'])
def creatorSongsViews(creatorId):

    if request.method == 'GET':

        query=text(f"SELECT Name,PLAYS FROM SONG WHERE CREATOR_ID={creatorId}")
        result=db.session.execute(query).fetchall()
        song_name_arr=[]
        song_views_arr=[]
        for res in result:
            song_name_arr.append(res[0])
            song_views_arr.append(res[1])

        x=np.array(song_name_arr)
        y=np.array(song_views_arr)

        pdf_output = generate_plot(x,y,'SongName','No. of Plays')

    # Return the PDF file as a response
        pdf_output.seek(0)

        return send_file(pdf_output,download_name='plot_stats.pdf',as_attachment=True)
    
    
@statsBluePrint.route('/creator/songs/views',methods=['GET'])
def AllSongsViewsReports():

    if request.method == 'GET':

        query=text(f"SELECT Name,PLAYS FROM SONG")
        result=db.session.execute(query).fetchall()
        song_name_arr=[]
        song_views_arr=[]
        for res in result:
            song_name_arr.append(res[0])
            song_views_arr.append(res[1])

        x=np.array(song_name_arr)
        y=np.array(song_views_arr)

        pdf_output = generate_plot(x,y,'SongName','No. of Plays')

    # Return the PDF file as a response
        pdf_output.seek(0)

        return send_file(pdf_output,download_name='plot_stats.pdf',as_attachment=True)


