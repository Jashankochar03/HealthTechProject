import os
from box.exceptions import BoxValueError
import yaml
from Acne_Prediction import logger
import json
import joblib
from ensure import ensure_annotations
from box import ConfigBox
from pathlib import Path
from typing import Any
import base64
import requests

import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Cloudinary configuration from env
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

def upload_to_cloudinary(file_path, folder=None, height=None, quality=None):
    try:
        options = {
        "resource_type": "auto"
        }

        if folder:
            options["folder"] = folder
        if height:
            options["height"] = height
        if quality:
            options["quality"] = quality

        response = cloudinary.uploader.upload(file_path, **options)
        return response["secure_url"]

    except Exception as e:
        print("Cloudinary upload failed:", e)
        return None

import cloudinary.uploader
import numpy as np
import cv2
from PIL import Image
from io import BytesIO

def upload_numpy_image_to_cloudinary(image_np, folder="default_folder", format="jpeg", quality="auto"):
    # Convert NumPy array to PIL Image
    image_pil = Image.fromarray(image_np)

    # Save image to in-memory buffer
    buffer = BytesIO()
    image_pil.save(buffer, format=format)
    buffer.seek(0)

    # Upload to Cloudinary
    response = cloudinary.uploader.upload(
        buffer,
        resource_type="image",
        folder=folder,
        quality=quality,
        format=format
    )

    return response["secure_url"]


@ensure_annotations
def read_yaml(path_to_yaml: Path) -> ConfigBox:
    """
    reads a YAML file and returns

    Args:
        path_to_yaml (str): Path like input
    
    Raises:
        ValueError: If the YAML file does not exist or cannot be parsed or it is empty
        e:empty file
    
    Returns:
        ConfigBox: box containing the loaded configuration
    """
    try:
        with open(path_to_yaml, 'r') as file:
            content = yaml.safe_load(file)
            logger.info(f"Successfully loaded configuration from {path_to_yaml}")
            return ConfigBox(content)
    except BoxValueError:
        raise ValueError(f"The YAML file at {path_to_yaml} does not exist.")
    except Exception as e:
        raise e
    
@ensure_annotations
def create_directories(path_to_directories:list, verbose=True):
    """
    create list of directories
    Args:
        path_to_directories (list) : list of path of directories
        ignore_log(bool , optional): ignore of multiple directories to be created , default to false
    """
    for path in path_to_directories:
        os.makedirs(path, exist_ok=True)
        if verbose:
            logger.info(f"created directory at {path}")

@ensure_annotations
def save_json(path:Path , data:dict):
    """
    save json data

    Args:
        path (Path) : path to json file
        data (dict) : data to be saved in json file
    """
    with open(path,'w') as f:
        json.dump(data,f,indent=4)
    
    logger.info(f"json file saved at {path}")

@ensure_annotations
def load_json(path:Path)->ConfigBox:
    """
    load json files data

    Args:
        path(Path) : path to json file
    
    Returns:
        ConfigBox : data as class attributes instead of dict
    """

    with open(path) as f:
        content = json.load(f)

    logger.info(f"json file loaded successfully from {path}")
    return ConfigBox(content)

@ensure_annotations
def save_bin(data: Any, path: Path):
    """
    save binary data
    Args:
        data (Any) : data to be saved in binary file
        path (Path) : path to binary file   
    """
    joblib.dump(value=data,filename=path)
    logger.info(f"Binary file saved at {path}")


@ensure_annotations
def load_bin(path: Path)->Any:
    """
    load binary data
    Args:
        path (Path) : path to binary file

    Returns:
        Any : object loaded from binary file
    """
    data = joblib.load(path)
    logger.info(f"Binary file loaded successfully from {path}")
    return data

@ensure_annotations
def get_size(path: Path)->str:
    """
    get size in Kb
    Args:
        path (Path) : path to file
    Returns:
        str : size in Kb
    """
    size_in_kb = round(os.path.getsize(path) / 1024)
    return f"~ {size_in_kb} KB"

def decodeImage(imgstring,filename):
    imgdata = base64.b64decode(imgstring)
    with open(filename, 'wb') as f:
        f.write(imgdata)
        f.close()


def encodeImageIntoBase64(cropped_image_path):
    with open(cropped_image_path, 'rb') as img_file:
        return base64.b64encode(img_file.read())

def downloadImageFromURL(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        return True
    else:
        return False