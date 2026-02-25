from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.routers import auth_router, task_router, user_router

# create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API")

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routers
app.include_router(user_router.router)
app.include_router(auth_router.router)
app.include_router(task_router.router)