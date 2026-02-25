from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.db.deps import get_db
from app.core.security import get_current_user
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate
from app.services.task_service import (
    create_task_for_user,
    list_tasks_for_user,
    start_task_timer,
    stop_task_timer,
    get_task_time_status,
    update_user_task,
    delete_user_task,
    get_user_daily_summary
)

router = APIRouter(prefix="/tasks", tags=["Tasks"])


# ✅ CREATE TASK
@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate,
                db: Session = Depends(get_db),
                current_user = Depends(get_current_user)):
    return create_task_for_user(db, current_user.id, task)


# ✅ LIST TASKS
@router.get("/", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db),
              current_user = Depends(get_current_user)):
    return list_tasks_for_user(db, current_user.id)


# ✅ START TIMER
@router.post("/{task_id}/start", response_model=TaskResponse)
def start_timer_endpoint(task_id: int,
                         db: Session = Depends(get_db),
                         current_user = Depends(get_current_user)):
    return start_task_timer(db, task_id, current_user.id)


# ✅ STOP TIMER
@router.post("/{task_id}/stop", response_model=TaskResponse)
def stop_timer_endpoint(task_id: int,
                        db: Session = Depends(get_db),
                        current_user = Depends(get_current_user)):
    return stop_task_timer(db, task_id, current_user.id)


# ✅ TIME STATUS
@router.get("/{task_id}/time-status")
def task_time_status(task_id: int,
                     db: Session = Depends(get_db),
                     current_user = Depends(get_current_user)):
    return get_task_time_status(db, task_id, current_user.id)


# ✅ UPDATE TASK
@router.patch("/{task_id}", response_model=TaskResponse)
def update_task_endpoint(task_id: int,
                         task_update: TaskUpdate,
                         db: Session = Depends(get_db),
                         current_user = Depends(get_current_user)):
    return update_user_task(db, task_id, current_user.id, task_update)


# ✅ DELETE TASK
@router.delete("/{task_id}")
def delete_task_endpoint(task_id: int,
                         db: Session = Depends(get_db),
                         current_user = Depends(get_current_user)):
    return delete_user_task(db, task_id, current_user.id)


# ✅ DAILY ANALYTICS
@router.get("/analytics/daily")
def daily_summary(date: date,
                  db: Session = Depends(get_db),
                  current_user = Depends(get_current_user)):
    return get_user_daily_summary(db, current_user.id, date)