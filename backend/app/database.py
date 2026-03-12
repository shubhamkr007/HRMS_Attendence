from pymongo import MongoClient

MONGO_URL = "mongodb://mongodb:27017"

client = MongoClient(MONGO_URL)

db = client["hrms"]

employee_collection = db["employees"]
attendance_collection = db["attendance"]

attendance_collection.create_index(
    [("employee_id", 1), ("date", 1)],
    unique=True
)

employee_collection.create_index("employee_id", unique=True)