from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.db.session import engine, Base
from app.db.deps import get_db
from app import crud, schemas
from app.routers import auth_router


Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    fake_hashed_password = user.password + "notreallyhashed"
    return crud.create_user(db, user.email, fake_hashed_password)


@app.get("/users", response_model=list[schemas.UserResponse])
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)



app.include_router(auth_router.router)