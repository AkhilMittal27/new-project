from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from app.db.session import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    # scheduling
    scheduled_date = Column(Date, nullable=True)

    # duration in seconds
    planned_duration = Column(Integer, nullable=True)

    # timer state
    timer_started_at = Column(DateTime, nullable=True)
    elapsed_seconds = Column(Integer, default=0)
    is_running = Column(Boolean, default=False)

    completed = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")