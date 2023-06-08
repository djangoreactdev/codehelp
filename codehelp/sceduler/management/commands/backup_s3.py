from django.core.management.base import BaseCommand
from django.core import management
from django.conf import settings
import boto3
import tempfile
import os


class Command(BaseCommand):
    help = "Backup database and send to S3 as a fixture"

    def handle(self, *args, **options):
        # Create a temporary directory to store the backup fixture
        tempdir = tempfile.mkdtemp()

        # Backup the database as a fixture using Django's 'dumpdata' management command
        backup_file = os.path.join(tempdir, "backup.json")
        management.call_command("dumpdata", format="json", exclude=["auth.permission"], output=backup_file)

        # Upload the backup fixture file to S3
        session = boto3.Session(
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        s3 = session.client("s3")
        s3.upload_file(backup_file, settings.AWS_STORAGE_BUCKET_NAME, "backup.json")

        # Clean up temporary directory
        os.remove(backup_file)
        os.rmdir(tempdir)

        self.stdout.write(self.style.SUCCESS("Database backup created and uploaded to S3 successfully."))
