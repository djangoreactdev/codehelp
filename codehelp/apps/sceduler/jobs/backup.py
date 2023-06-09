# from mega import Mega
from apscheduler.schedulers.background import BackgroundScheduler
import subprocess

# def sendToMega():
#     mega = Mega()
#     Mega_email = "devdjangoreact@gmail.com"
#     Mega_password = "gT4pGdPTWS-kQhP"
#     m = mega.login(Mega_email, Mega_password)

#     # m.create_folder('new_folder')
#     # folder = m.find('new_folder')
#     # folder_path = "/home/dev/django-on-docker-letsencrypt/app"
#     # files = os.listdir(folder_path)
#     # files = sorted(files, key=os.path.getmtime)
#     # m.upload(files[-1], folder[0])

#     file = m.find("_test.txt")
#     m.download(file)


# sendToMega()


def createBackup():
    try:
        # for postgresql
        # BackupComand = r"python3 manage.py dumpdata --format json -e contenttypes -e auth.permission > data.json"
        BackupComand = r"python3 manage.py backup_s3"
        output = subprocess.check_output(BackupComand, shell=True)
        print("Ok", output)
    except:
        print(subprocess.check_output("ls", shell=True))


def run_scheduler():
    scheduler = BackgroundScheduler()
    job_id = "createBackup"
    print(scheduler.get_jobs())
    job_exists = any(job.id == job_id for job in scheduler.get_jobs())
    if not job_exists:
        scheduler.add_job(createBackup, id=job_id, trigger="interval", days=1)
        scheduler.start()
    else:
        print("Job already exists")
