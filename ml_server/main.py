from src.Acne_Prediction import logger
from src.Acne_Prediction.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline
from src.Acne_Prediction.pipeline.stage_02_prepare_base_model import PrepareBaseModelTrainingPipeline
from src.Acne_Prediction.pipeline.stage_03_training import ModelTrainingPipeline
from src.Acne_Prediction.pipeline.stage_04_evaluation import EvaluationPipeline

STAGE_NAME = "Data Ingestion stage"

try:
    logger.info(f"Starting {STAGE_NAME}")
    data_ingestion = DataIngestionTrainingPipeline()
    data_ingestion.main()
    logger.info(f"{STAGE_NAME} completed successfully")
except Exception as e:
    logger.exception(e)
    raise e


STAGE_NAME = "Prepare Base Model stage"
try:
    logger.info(f"****************")
    logger.info(f"Starting {STAGE_NAME} pipeline...")
    baseModel = PrepareBaseModelTrainingPipeline()
    baseModel.main()
    logger.info(f"{STAGE_NAME} pipeline completed successfully.")
    
except Exception as e:
    logger.exception(e)
    raise e


STAGE_NAME = "Training stage"
try:
    logger.info(f"Starting {STAGE_NAME} stage...")
    training = ModelTrainingPipeline()
    training.main()
    logger.info(f"{STAGE_NAME} stage completed successfully.")
except Exception as e:
    logger.exception(e)
    raise e


STAGE_NAME = "Evaluation stage"
try:
    logger.info(f"Starting {STAGE_NAME} pipeline")
    modelEvaluation = EvaluationPipeline()
    modelEvaluation.main()
    logger.info(f"{STAGE_NAME} pipeline completed successfully")
    
except Exception as e:
    logger.exception(e)
    raise e