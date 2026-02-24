from .session import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        print(f"Database connection error: {e}")
        raise    
    finally:
        db.close()