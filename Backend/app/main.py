from fastapi import FastAPI
from app.db.session import engine, Base
from app.routers import auth_router, task_router, user_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API")


app.include_router(user_router.router)
app.include_router(auth_router.router)
app.include_router(task_router.router)