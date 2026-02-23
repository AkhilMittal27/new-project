from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.db.session import engine, Base
from app.db.deps import get_db
from app import crud, schemas
from app.routers import auth_router
from app.core.security import get_current_user, hash_password

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    fake_hashed_password = user.password + "notreallyhashed"
    return crud.create_user(db, user.email, fake_hashed_password)


@app.get("/users", response_model=list[schemas.UserResponse])
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)



# app.include_router(auth_router.router)



@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    return crud.create_user(db, user.email, hashed_password)


from app.core.security import verify_password, create_access_token

@app.post("/login", response_model=schemas.Token)
def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, data.email)

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/me")
def read_me(current_user: User = Depends(get_current_user)):
    return current_user