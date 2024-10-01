from smtplib import SMTP
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
from email.mime.base import MIMEBase




SMTP_HOST = "localhost"
SMTP_PORT = 1025
SENDER_EMAIL = 'Admin@sangeet.com'
SENDER_PASSWORD = 'Admin'


def send_message(to, subject, content_body):
    print("Inside send_message method")
    msg = MIMEMultipart()
    msg["To"] = to
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg.attach(MIMEText(content_body, 'html'))
    client = SMTP(host=SMTP_HOST, port=SMTP_PORT)
    client.send_message(msg=msg)
    client.quit()


def send_email2(to_address,subject,message,content="text",attachment_file=None):
    msg=MIMEMultipart()
    msg["From"]='Admin@sangeet.com'
    msg["To"]=to_address
    msg["Subject"]=subject
    if content=="html":      
        msg.attach(MIMEText(message,"html"))
    else:
        msg.attach(MIMEText(message,"plain"))
        
    if attachment_file:
        with open(attachment_file,"rb") as attachment:
            
            part =MIMEBase("application","octet-stream")
            part.set_payload(attachment.read())
            encoders.encode_base64(part)


    s=SMTP(host=SMTP_HOST, port=SMTP_PORT)
    # s.login(SENDER_ADDRESS,SENDER_PASSWORD)
    s.send_message(msg)
    s.quit()
    return True

# send_message('vivek.rao@hcl.com','Vivek is the Best', '<h1>Vivek</h1>')
# ~/go/bin/MailHog

