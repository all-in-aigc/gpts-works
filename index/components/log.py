import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("aigc")


def init_log():
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)

    log.addHandler(handler)

    log.info("init log ok")
