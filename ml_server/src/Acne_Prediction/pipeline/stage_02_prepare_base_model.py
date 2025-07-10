from Acne_Prediction.config.configuration import ConfigurationManager
from Acne_Prediction.components.prepare_base_model import PrepareBaseModel 
from Acne_Prediction import logger

STAGE_NAME = 'prepare_base_model'

class PrepareBaseModelTrainingPipeline:
    def __init__(self):
        pass

    def main(self):
        config = ConfigurationManager()
        prepare_base_model_config = config.get_prepare_base_model_config()
        prepare_base_model = PrepareBaseModel(config=prepare_base_model_config)
        prepare_base_model.get_base_model()
        prepare_base_model.update_base_model()


if __name__ == '__main__':
    try:
        logger.info(f"****************")
        logger.info(f"Starting {STAGE_NAME} pipeline...")
        obj = PrepareBaseModelTrainingPipeline()
        obj.main()
        logger.info(f"{STAGE_NAME} pipeline completed successfully.")
    
    except Exception as e:
        logger.exception(e)
        raise e