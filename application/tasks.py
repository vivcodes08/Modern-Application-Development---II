from celery import shared_task
from .models import Song
import flask_excel as excel
from application.models import  Song,User,UserFeedback,db
from application.mail_service import send_message,send_email2
from sqlalchemy import text
from flask import render_template_string
from datetime import datetime
@shared_task(ignore_result=True)
def sayhello():
    return "Hello"

@shared_task()
def create_resource_csv():
    song_res=Song.query.with_entities(
        Song.id,Song.name
    ).all()
    

    csv_output=excel.make_response_from_query_sets(
        song_res,["id","name"],"csv"
    )
    filename="Vivek.csv"

    with open(filename,'wb') as f:
        f.write(csv_output.data)
    return filename

@shared_task()
def create_song_res(ignore_result=False):
    song_res=Song.query.with_entities(
        Song.id,Song.name
    ).all()

    csv_output=excel.make_response_from_query_sets(
        song_res,["id","name"],"csv"
    )
    filename="Vivek.csv"

    return csv_output



@shared_task(ignore_result=False)
def daily_remainder(to,subject,body):
    send_message(to,subject,body)
    return "OK"


@shared_task(ignore_result=False)
def send_app_stats_email():

    query2= text("select id,username,email, (SELECT count(1) from song where creator_id=user.id) as song_count,(select count(1) from album a where a.creator_id=user.id) as album_count,(SELECT count(1) from playlist p where p.creator_id=user.id) as playlist_count,(select count(1) from user_feedback uf where uf.user_id=user.id ) as feedack_count,(select count(1) from likes l where l.user_id=user.id) as liked_count,(select GROUP_CONCAT(name, ',') as roles  from roles_users ru inner join role r ON ru.role_id=r.id and ru.user_id=user.id) as roles from user")        
    
    result=db.session.execute(query2).fetchall()
   

    mail_template=render_template_string(
        '''
            <html>
<head>
   <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <h1 class="text-3xl p-4 font-bold font-serif ">Monthly Report :- OverAll Statistics of Sangeet</h1>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-cyan-400 text-white border-2 border-black ">
                    Id
                </th>
                <th scope="col" class="px-6 py-3 bg-cyan-400 text-white border-2 border-black">
                    UserName
                </th>
                <th scope="col" class="px-6 py-3 border-2 border-black bg-cyan-400 text-white ">
                    Email Id
                </th>
                 <th scope="col" class=" border-2 border-black px-6 py-3 bg-cyan-400 text-white">
                    Roles
                </th>
                <th scope="col" class=" border-2 border-black px-6 py-3 bg-cyan-400 text-white">
                    Songs Created
                </th>
                 <th scope="col" class=" border-2 border-black px-6 py-3 bg-cyan-400 text-white">
                    Album Created
                </th>
                 <th scope="col" class=" border-2 border-black px-6 py-3 bg-cyan-400 text-white">
                    Playlist Created
                </th>
                 <th scope="col" class=" border-2 border-black px-6 py-3 bg-cyan-400 text-white">
                    Feedback Given
                </th>
                 <th scope="col" class=" border-2 border-black px-6 py-3 bg-cyan-400 text-white">
                    Liked Songs
                </th>

            </tr>
        </thead>
        <tbody>
          <!-- Iteration Start -->
          <!-- {% for detail in data %}-->
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {{detail[0] }}
                </th>
                <td class="px-6 py-4">
                    {{detail[1] }}
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                   {{detail[2] }}
                </td>
                <td class="px-6 py-4">
                   {{detail[8] }}
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                   {{detail[3] }}
                </td>
                <td class="px-6 py-4">
                    {{detail[4] }}
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {{detail[5] }}
                </td>
                <td class="px-6 py-4">
                  {{detail[6] }}
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {{detail[7] }}
                </td>
               
              
            </tr>
          <!-- {% endfor %} -->
            <!-- Iteration End -->
        
        </tbody>
    </table>
</div>
  
</body>
</html>
        ''',
        data=result
    )
    greetings="Monthly Report of App Actvities "
    current_date = datetime.now().strftime("%Y-%m-%d")
    subject = f"{greetings}, today is {current_date}"
 
    send_email2(
                to_address='Admin@sangeet.com',
                subject=subject,
                message=mail_template,
                content="html",
            )

    return "OK"



# @shared_task(ignore_result=False)
# def daily_remainder(message):
#     return message