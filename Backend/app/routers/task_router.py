from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.core.security import get_current_user
from app.schemas.task import TaskCreate, TaskResponse
from app.services.task_service import create_task_for_user, list_tasks_for_user

from app.services.task_service import start_task_timer, stop_task_timer

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate,
                db: Session = Depends(get_db),
                current_user = Depends(get_current_user)):
    return create_task_for_user(db, current_user.id, task)

@router.get("/", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db),
              current_user = Depends(get_current_user)):
    return list_tasks_for_user(db, current_user.id)


#start timer for a particular task


@router.post("/{task_id}/start", response_model=TaskResponse)
def start_timer_endpoint(task_id: int,
                         db: Session = Depends(get_db),
                         current_user = Depends(get_current_user)):
    return start_task_timer(db, task_id, current_user.id)


#step task for particular  tasks

@router.post("/{task_id}/stop", response_model=TaskResponse)
def stop_timer_endpoint(task_id: int,
                        db: Session = Depends(get_db),
                        current_user = Depends(get_current_user)):
    return stop_task_timer(db, task_id, current_user.id)



