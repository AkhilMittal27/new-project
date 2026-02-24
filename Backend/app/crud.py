from sqlalchemy.orm import Session
from app.models.user import User
from . import models, schemas

def create_user(db: Session, email: str, hashed_password: str):
    user = User(email=email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_users(db: Session):
    return db.query(User).all()



def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()



def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()



def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(title=task.title, description=task.description, completed=task.completed)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()