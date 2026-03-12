from fastapi import APIRouter, HTTPException, Depends
from app.database import attendance_collection
from app.auth.auth_handler import get_current_user
from app.schemas.attendance_schema import SignOutRequest, SignInRequest
from datetime import date

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/signin")
def sign_in(
    data: SignInRequest,
    user=Depends(get_current_user)
):

    record = attendance_collection.find_one({
        "employee_id": data.employee_id,
        "date": str(data.date)
    })

    if record:
        raise HTTPException(
            status_code=400,
            detail="Already signed in today"
        )

    attendance_collection.insert_one({
        "employee_id": data.employee_id,
        "date": str(data.date),
        "signin_time": data.signin_time,
        "signout_time": None,
        "signin_completed": False
    })

    return {"message": "Sign in successful"}

@router.put("/signout")
def sign_out(
    data: SignOutRequest,
    user=Depends(get_current_user)
):

    record = attendance_collection.find_one({
        "employee_id": data.employee_id,
        "date": str(data.date)
    })

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Sign in not found"
        )

    if record["signin_completed"]:
        raise HTTPException(
            status_code=400,
            detail="Already signed out"
        )

    attendance_collection.update_one(
        {
            "employee_id": data.employee_id,
            "date": str(data.date)
        },
        {
            "$set": {
                "signout_time": data.signout_time,
                "signin_completed": True
            }
        }
    )

    return {"message": "Sign out successful"}

@router.get("/{employee_id}")
def get_employee_attendance(
    employee_id: str,
    user=Depends(get_current_user)
):

    # Security check
    if user["employee_id"] != employee_id and user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    records = attendance_collection.find(
        {"employee_id": employee_id},
        {"_id": 0}  # remove mongo _id
    )

    result = []

    for r in records:
        result.append({
            "employee_id": r.get("employee_id"),
            "date": r.get("date"),
            "signin_time": r.get("signin_time"),
            "signout_time": r.get("signout_time"),
            "signin_completed": r.get("signin_completed")
        })

    return result

@router.get("/check/{employee_id}")
def check_today_attendance(employee_id: str, user=Depends(get_current_user)):

    today = str(date.today())

    record = attendance_collection.find_one({
        "employee_id": employee_id,
        "date": today
    })

    if not record:
        return {
            "signedIn": False,
            "signoutCompleted": False
        }

    return {
        "signedIn": True,
        "signoutCompleted": record.get("signin_completed", False),
        "signin_time": record.get("signin_time"),
        "signout_time": record.get("signout_time")
    }