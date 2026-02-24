from pydantic import BaseModel
from datetime import date

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    scheduled_date: date | None = None
    planned_duration: int | None = None  # seconds

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    scheduled_date: date | None
    planned_duration: int | None
    elapsed_seconds: int
    is_running: bool
    completed: bool

    class Config:
        from_attributes = True


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    scheduled_date: date | None = None
    planned_duration: int | None = None
    completed: bool | None = None