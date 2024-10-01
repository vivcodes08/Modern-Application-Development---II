from flask import current_app as app,Blueprint, jsonify, request, render_template,json
from application.sec import datastore
from application.models import User, db,RolesUsers
from werkzeug.security import generate_password_hash,check_password_hash
mainBluePrint=Blueprint('mainBluePrint',__name__)

@mainBluePrint.route('/',methods=['GET'])
def index():
    return  render_template("index.html")

@mainBluePrint.route("/user-login",methods=['POST'])
def login():
     
    userData=request.get_json();
    email=userData.get('email');
    password=userData.get('password');
    print("userData",userData)

    user=datastore.find_user(email=email)
    if user is None:
         return jsonify({
             "status":"401",
             "message":"Invalid Credentials"
         })
     
    passCheck=check_password_hash(user.password, password)
    print("passCheck",passCheck)
    
    roles=[]
    for role in user.roles:
        roles.append(role.name)

    print(roles,"roles")    
    if passCheck:
       return jsonify({
           "status":200,
           "token": user.get_auth_token(),
           "email": user.email,
           "id":user.id,
           "roles":roles,
           "username":user.username
           }) 
    else:
        return jsonify({
             "status":"401",
             "message":"Invalid Credentials"
         })
        
    

@mainBluePrint.route("/register",methods=['POST'])
def register():
     userData=request.get_json();
     email=userData.get('email');
     username=userData.get('username');
     password=userData.get('password');
     role=userData.get('role');
     isActive=True
     roles=['User']
     if(role=='User'):
         roles=['User']
     else:
         roles=['Creator','User']    
     find_user=datastore.find_user(email=email)

     if find_user:
        return jsonify({
            "status":"403",
            "Message":"User Already Exists",
        })     
     else:
        datastore.create_user(
          email=email,
          username=username,
          password=generate_password_hash(password,method='sha256'),
          active=isActive,
          roles=roles
        )
        db.session.commit();
        return jsonify({"status":200, "data":"User Created Successfully"})


@mainBluePrint.route("/")
def swagger():

    with open('../swagger.json','r') as f:
        return jsonify(json.load(f))
    