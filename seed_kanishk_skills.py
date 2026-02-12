from backend.database import student_skills_collection
from datetime import datetime

def seed_kanishk_skills():
    uid = "695e802487cc137d535819b6"
    skills = [
        {"name": "React", "verified": None},
        {"name": "Node.js", "verified": None},
        {"name": "Python", "verified": None},
        {"name": "Machine Learning", "verified": None}
    ]
    
    student_skills_collection.update_one(
        {"user_id": uid},
        {"$set": {
            "user_id": uid,
            "skills": skills,
            "updated_at": datetime.utcnow()
        }},
        upsert=True
    )
    print("Seeded Kanishk's skills.")

if __name__ == "__main__":
    seed_kanishk_skills()
