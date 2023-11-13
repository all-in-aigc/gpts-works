from fastapi import FastAPI
from apis.ping import ping_router
from apis.gpts import gpts_router
from components.log import init_log, log
from components.env import init_env
from components.db import init_db
from components.llm import init_llm

app = FastAPI()
app.include_router(ping_router)
app.include_router(gpts_router)


@app.on_event("startup")
async def startup():
    print("init log")
    init_log()
    print("init env")
    init_env()
    print("init db")
    init_db()
    print("init llm")
    init_llm()

    log.info("app start")


@app.on_event("shutdown")
async def shutdown():
    log.info("app shutdown")
