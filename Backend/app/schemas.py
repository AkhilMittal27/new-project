from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
     
    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    title: str
    description: str
    completed: bool = False

class TaskResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: str
    password: str