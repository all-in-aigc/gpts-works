from fastapi import APIRouter
from components.log import log
from utils.resp import resp_ok

ping_router = APIRouter()


@ping_router.get("/ping")
async def ping():
    log.info("ping called")
    return resp_ok("pong")
