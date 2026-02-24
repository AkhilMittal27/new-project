from sqlalchemy.orm import Session
from app.crud.task_crud import create_task, get_tasks_by_user
from app.schemas.task import TaskCreate

from app.crud.task_crud import get_task_by_id, start_timer, stop_timer
from fastapi import HTTPException

def create_task_for_user(db: Session, user_id: int, task: TaskCreate):
    return create_task(db, user_id, task)

def list_tasks_for_user(db: Session, user_id: int):
    return get_tasks_by_user(db, user_id)



def start_task_timer(db, task_id: int, user_id: int):
    task = get_task_by_id(db, task_id)

    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.is_running:
        raise HTTPException(status_code=400, detail="Timer already running")

    return start_timer(db, task)

def stop_task_timer(db, task_id: int, user_id: int):
    task = get_task_by_id(db, task_id)

    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    if not task.is_running:
        raise HTTPException(status_code=400, detail="Timer not running")

    return stop_timer(db, task)