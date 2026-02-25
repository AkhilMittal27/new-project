from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate
from datetime import date, datetime


def create_task(db: Session, user_id: int, task: TaskCreate):
    db_task = Task(
        title=task.title,
        description=task.description,
        scheduled_date=task.scheduled_date,
        planned_duration=task.planned_duration,
        user_id=user_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks_by_user(db: Session, user_id: int):
    return db.query(Task).filter(Task.user_id == user_id).all()



def get_task_by_id(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def start_timer(db: Session, task: Task):
    task.timer_started_at = datetime.utcnow()
    task.is_running = True
    db.commit()
    db.refresh(task)
    return task

def stop_timer(db: Session, task: Task):
    if task.timer_started_at:
        elapsed = (datetime.utcnow() - task.timer_started_at).total_seconds()
        task.elapsed_seconds += int(elapsed)

    task.timer_started_at = None
    task.is_running = False

    db.commit()
    db.refresh(task)
    return task


def update_task(db: Session, task: Task, updates):
    for key, value in updates.items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task: Task):
    db.delete(task)
    db.commit()



def get_daily_summary(db: Session, user_id: int, target_date: date):
    tasks = db.query(Task).filter(
        Task.user_id == user_id,
        Task.scheduled_date == target_date
    ).all()

    total_time = sum(task.elapsed_seconds for task in tasks)
    completed_tasks = sum(1 for task in tasks if task.completed)

    return total_time, completed_tasks