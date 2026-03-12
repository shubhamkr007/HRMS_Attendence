from app.auth.auth_handler import hash_password
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import db
from passlib.context import CryptContext

from app.routes import employee_routes
from app.routes import attendance_routes
from app.auth import auth_routes

app = FastAPI(title="HRMS Lite", version="1.0")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(employee_routes.router)
app.include_router(attendance_routes.router)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.on_event("startup")
def create_default_admin():

    employees = db["employees"]

    admin = employees.find_one({"role": "admin"})

    if not admin:

        hashed_password = hash_password("admin")

        employees.insert_one({
            "employee_id": "1",
            "full_name": "Admin User",
            "email": "admin@company.com",
            "department": "IT",
            "password": hashed_password,
            "role": "admin"
        })

        print("✅ Default admin created")


@app.get("/")
def health():
    return {"status": "HRMS API running"}