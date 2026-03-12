from fastapi import APIRouter, HTTPException

from app.database import employee_collection
from app.schemas.auth_schema import LoginRequest
from app.auth.auth_handler import verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(credentials: LoginRequest):

    user = employee_collection.find_one(
        {"employee_id": credentials.employee_id}
    )

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(
        {
            "employee_id": user["employee_id"],
            "role": user["role"]
        }
    )

    return {"access_token": token, "token_type": "bearer"}