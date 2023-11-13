import dotenv
from components.log import log


def init_env():
    dotenv.load_dotenv()

    log.info("init env ok")
