from sqlalchemy.orm import Session
from app.crud.task_crud import create_task, get_tasks_by_user
from app.schemas.task import TaskCreate
from app.crud.task_crud import get_task_by_id, start_timer, stop_timer
from fastapi import HTTPException
from datetime import datetime
from app.crud.task_crud import get_task_by_id

from app.schemas.task import TaskUpdate
from app.crud.task_crud import update_task, delete_task
from datetime import date
from app.crud.task_crud import get_daily_summary
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



def get_task_time_status(db, task_id: int, user_id: int):
    task = get_task_by_id(db, task_id)

    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    elapsed = task.elapsed_seconds

    if task.is_running and task.timer_started_at:
        elapsed += int((datetime.utcnow() - task.timer_started_at).total_seconds())

    remaining = None
    if task.planned_duration:
        remaining = task.planned_duration - elapsed

    return {
        "task_id": task.id,
        "elapsed_seconds": elapsed,
        "remaining_seconds": remaining,
        "is_running": task.is_running,
        "completed": remaining is not None and remaining <= 0
    }




def update_user_task(db, task_id: int, user_id: int, task_update: TaskUpdate):
    task = get_task_by_id(db, task_id)

    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    updates = task_update.dict(exclude_unset=True)
    return update_task(db, task, updates)

def delete_user_task(db, task_id: int, user_id: int):
    task = get_task_by_id(db, task_id)

    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    delete_task(db, task)
    return {"message": "Task deleted"}





def get_user_daily_summary(db, user_id: int, target_date: date):
    total_time, completed_tasks = get_daily_summary(db, user_id, target_date)

    return {
        "date": target_date,
        "total_focus_time_seconds": total_time,
        "tasks_completed": completed_tasks
    }