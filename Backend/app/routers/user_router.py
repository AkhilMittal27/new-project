from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud
from app.db.deps import get_db
from app.schemas.user import UserCreate, UserResponse
from app.crud.user_crud import  get_users as get_users_db
from app import crud
# from app.core.security import hash_password

router = APIRouter(prefix="/users", tags=["Users"])

from app.crud.user_crud import create_user as create_user_db

@router.post("/Signup", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    return create_user_db(db, user.email, hashed_password)

@router.get("/get_user", response_model=list[UserResponse])
def read_users(db: Session = Depends(get_db)):
    return get_users_db(db)