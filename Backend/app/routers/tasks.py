from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, crud, db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=schemas.TaskRead)
def create_task_endpoint(task: schemas.TaskCreate, session: Session = Depends(db.get_db)):
    return crud.create_task(session, task)


@router.get("/", response_model=List[schemas.TaskRead])
def list_tasks(skip: int = 0, limit: int = 100, session: Session = Depends(db.get_db)):
    return crud.get_tasks(session, skip, limit)


@router.get("/{task_id}", response_model=schemas.TaskRead)
def get_task(task_id: int, session: Session = Depends(db.get_db)):
    db_task = crud.get_task(session, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


