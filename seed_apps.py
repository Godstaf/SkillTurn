from backend.database import applications_collection, users_collection, opportunities_collection
from datetime import datetime
from bson import ObjectId

def seed_applications():
    # Clear existing if any (count was 0 anyway)
    applications_collection.delete_many({})
    
    students = list(users_collection.find({"role": "student"}).limit(5))
    opps = list(opportunities_collection.find().limit(3))
    
    if not students or not opps:
        print("Not enough data to seed.")
        return

    # Seed some applications
    apps = [
        {
            "user_id": str(students[0]["_id"]),
            "job_id": str(opps[0]["_id"]),
            "status": "applied",
            "applied_at": datetime.utcnow()
        },
        {
            "user_id": str(students[1]["_id"]),
            "job_id": str(opps[1]["_id"]),
            "status": "shortlisted",
            "applied_at": datetime.utcnow()
        },
        {
            "user_id": str(students[2]["_id"]),
            "job_id": str(opps[0]["_id"]),
            "status": "applied",
            "applied_at": datetime.utcnow()
        }
    ]
    
    result = applications_collection.insert_many(apps)
    print(f"Seeded {len(result.inserted_ids)} applications.")

if __name__ == "__main__":
    seed_applications()
