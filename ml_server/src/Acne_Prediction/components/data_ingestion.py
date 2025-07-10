import os
import urllib.request as request
import zipfile
import gdown
from Acne_Prediction import logger
from Acne_Prediction.utils.common import get_size 
from Acne_Prediction.entity.config_entity import DataIngestionConfig
from pathlib import Path

class DataIngestion:
    def __init__(self, config: DataIngestionConfig):
        self.config = config
    
    def download_file(self):
        """
        Downloads the file from Google Drive or any URL and saves it locally.
        Uses gdown for Google Drive links.
        """
        if not os.path.exists(self.config.local_data_file):
            # Extract file id from Google Drive link
            file_id = self.config.source_URL.split('/d/')[1].split('/')[0]
            download_url = f"https://drive.google.com/uc?id={file_id}"
            gdown.download(download_url, self.config.local_data_file, quiet=False)
            logger.info(f"Downloaded file to {self.config.local_data_file}")
        else:
            logger.info(f"{self.config.local_data_file} already exists of size {get_size(self.config.local_data_file)}")
    def extract_zip_file(self):
        """
        zip_file_path :str
        Extracts the zip file at zip_file_path to the destination directory
        Function return none
        """
        unzip_path = self.config.unzip_dir
        os.makedirs(unzip_path, exist_ok=True)
        with zipfile.ZipFile(self.config.local_data_file, 'r') as zip_ref:
            zip_ref.extractall(unzip_path)
            logger.info(f"Extracted zip file to {unzip_path}")
        
        