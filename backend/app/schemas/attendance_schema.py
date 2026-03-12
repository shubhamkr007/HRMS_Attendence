from pydantic import BaseModel
from datetime import date

class SignInRequest(BaseModel):
    employee_id: str
    date: date
    signin_time: str


class SignOutRequest(BaseModel):
    employee_id: str
    date: date
    signout_time: str