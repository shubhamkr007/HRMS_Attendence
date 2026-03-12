from pydantic import BaseModel, EmailStr
from typing import Literal

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str
    password: str
    role: Literal["admin", "employee"]


class EmployeeResponse(BaseModel):
    employee_id: str
    full_name: str
    email: str
    department: str
    role: str