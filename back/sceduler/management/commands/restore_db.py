from django.core.management.base import BaseCommand
from django.core import management
from django.conf import settings
import boto3
import tempfile
import os


class Command(BaseCommand):
    help = "Restore database from the last backup"

    def handle(self, *args, **options):
        # Create a temporary directory to store the backup file
        tempdir = tempfile.mkdtemp()

        # Download the last backup file from S3
        session = boto3.Session(
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            # region_name=settings.AWS_S3_REGION_NAME,
        )
        s3 = session.client("s3")
        backup_file = os.path.join(tempdir, "backup.json")
        s3.download_file(settings.AWS_STORAGE_BUCKET_NAME, "backup.json", backup_file)

        # Restore the database using Django's 'loaddata' management command
        from django.core.management import call_command

        call_command("loaddata", backup_file)

        # Clean up temporary directory
        os.remove(backup_file)
        os.rmdir(tempdir)

        self.stdout.write(self.style.SUCCESS("Database restored from the last backup successfully."))
