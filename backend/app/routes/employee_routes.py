from fastapi import APIRouter, HTTPException, Depends
from pymongo.errors import DuplicateKeyError

from app.database import employee_collection
from app.schemas.employee_schema import EmployeeCreate
from app.auth.auth_handler import admin_required, get_current_user, hash_password

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", status_code=201)
def create_employee(
    employee: EmployeeCreate,
    admin=Depends(admin_required)
):

    employee_data = employee.dict()
    employee_data["password"] = hash_password(employee.password)

    try:
        employee_collection.insert_one(employee_data)
        return {"message": "Employee created"}

    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="Employee ID already exists"
        )


@router.get("/")
def get_all_employees(admin=Depends(admin_required)):
    employees = employee_collection.find()
    result = []
    for e in employees:
        result.append({
            "employee_id": e["employee_id"],
            "full_name": e["full_name"],
            "email": e["email"],
            "department": e["department"],
            "role": e["role"]
        })
    return result


@router.delete("/{employee_id}")
def delete_employee(employee_id: str, admin=Depends(admin_required)):

    result = employee_collection.delete_one(
        {"employee_id": employee_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {"message": "Employee deleted"}

@router.get("/{employee_id}")
def get_employee(employee_id: str, user=Depends(get_current_user)):

    employee = employee_collection.find_one(
        {"employee_id": employee_id},
        {"_id": 0, "password": 0}
    )

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee