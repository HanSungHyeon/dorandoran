import uuid
import os
import time
os.environ ["GOOGLE_APPLICATION_CREDENTIALS"] = "rd-ssafy-project-ebd0eea46d3e.json"

from google.cloud import storage

from customLog import LogInfo
from customLog import LogError

client = storage.Client()

bucket_name = 'dorandoran'

def Download(bookId, gender, voiceUrl):
    try:
        data = {
            "directory" : "",
            "file_name" : "",
            "save_location" : "",
            "content_id" : ""
        }

        fileName = voiceUrl.split("/")[-1]
        LogInfo(fileName)
        
        directory = os.path.join("/", "app", "data", f"book_{str(bookId)}_{gender}")
        os.makedirs(directory, exist_ok=True)
        save_location = os.path.join(directory, fileName+".wav")

        if os.path.exists(save_location):
            LogInfo("aleady download")
        else:
            bucket = client.bucket(bucket_name)
            blob = bucket.blob(fileName)
            blob.download_to_filename(save_location)
        data['directory'] = directory
        data['file_name'] = fileName
        data['save_location'] = save_location
        LogInfo(data)
        return data
    except Exception as e:
        LogError(e)
        LogError("Download Fail")
        raise

def DownloadRaw(userId, gender, voiceUrl):
    fileName = voiceUrl.split("/")[-1]
    LogInfo(fileName)
    
    directory = os.path.join("/", "app", "data", f"user_{str(userId)}_{gender}")
    os.makedirs(directory, exist_ok=True)
    save_location = os.path.join(directory, fileName+".wav")

    if os.path.exists(save_location):
        LogInfo("aleady download")
    else:
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(fileName)
        blob.download_to_filename(save_location)
    return directory

def Upload(userId, fileName):
    try:
        directory = os.path.join("/", "app", "opt", str(userId), fileName)
        LogInfo(directory)
        destination_file_name = str(uuid.uuid4())
        LogInfo(destination_file_name)

        bucket = client.bucket(bucket_name)
        blob = bucket.blob(destination_file_name)
        blob.upload_from_filename(filename=directory, content_type="audio/wav", timeout=180)
        time.sleep(0.5)
        return destination_file_name
    except Exception as e:
        LogError(e)
        LogError("Upload Fail")
        raise