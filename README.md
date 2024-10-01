
# Sangeet :A Music Streaming WebApp

Sangeet is a Music Streaming Application. Sangeet Provides three spaces to its clients. User Space, Creator Space, Admin Space as per their roles. In User Space, a user can stream any music. add to its playlist and even like or flag songs as favourites. In Creator Space, a creator can perform All (CRUD) operations on his/her created songs and albums., plus he can generate reports as well. In Admin Space, Admin has a full privilege to perform All (CRUD) operations all songs and albums. He/she has even access to generate pdf/html reports via mail or simple download and swagger API documentation as well.




## Authors

* Name:- Vivek Singh Rao  
* Roll No:-21f3002861
* EmailId:- 21f3002861@ds.study.iitm.ac.in  
* Term:- AppDev2 Project Sep 2023 Term


## Installation

1.Clone and unzip the  project  
2.Go inside the 21f3002861/SangeetApp folder  
3.Open command prompt in this folder  
4.Create a Virtual environment using
```bash
 python -m venv {{venvName}}
```  
5.Now activate the virtual environment  
6. After activation, install all the depenciences using 
  ```bash
 pip install -r requirements.txt
```   

  
    
## Running Application

To run this project run

```bash
  flask run
```
To run this redis server run[Linux Terminal]

```bash
  redis-server
```
To run this celery worker  run[Linux Terminal]

```bash
 celery -A app.celery_app worker --loglevel DEBUG
```
To run this celery beat run [Linux Terminal]

```bash
celery -A app.celery_app beat --loglevel DEBUG
```

To run MailHog SMTP Sever [Linux Terminal]

```bash
 ~/go/bin/MailHog
```


## Video Link
https://drive.google.com/file/d/1_XHiT3aK4RYAqA84Jqn0BGZO2ej9SIn-/view?usp=sharing

## App PDF Link
https://drive.google.com/file/d/1qzJZauYadRT1BMHwMEzXoWC--UtZRajX/view
## License
All rights are reserved by the Author of the project or IITM organization


