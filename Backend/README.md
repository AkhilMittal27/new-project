TASK MANAGEMENT - Backend
=========================

Quickstart
----------

1. Create and activate a virtualenv

```powershell
python -m venv .venv
.venv\Scripts\Activate
pip install -r requirements.txt
```

2. Run the app

```powershell
uvicorn app.main:app --reload --port 8000
```

API endpoints
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/{id}`
