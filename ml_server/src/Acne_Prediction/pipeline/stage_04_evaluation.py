from Acne_Prediction.config.configuration import ConfigurationManager
from Acne_Prediction.components.evaluation import Evaluation
from Acne_Prediction import logger

STAGE_NAME = "Evaluation"

class EvaluationPipeline:
    def __init__(self):
        pass

    def main(self):
        config = ConfigurationManager()
        val_config = config.get_validation_config()
        evaluation = Evaluation(val_config)
        evaluation.evaluation()
        evaluation.save_score()


if __name__ == "__main__":
    try:
        logger.info(f"Starting {STAGE_NAME} pipeline")
        obj = EvaluationPipeline()
        obj.main()
        logger.info(f"{STAGE_NAME} pipeline completed successfully")
    
    except Exception as e:
        logger.exception(e)
        raise e