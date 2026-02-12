from backend.database import users_collection, student_skills_collection
from bson import ObjectId

def debug_kanishk():
    user = users_collection.find_one({"full_name": "Kanishk Chaurasia"})
    if not user:
        print("User not found")
        return
    
    uid = str(user["_id"])
    print(f"User ID: {uid}")
    
    skills_doc = student_skills_collection.find_one({"user_id": uid})
    if skills_doc:
        print(f"Skills Doc: {skills_doc}")
    else:
        print("No skills found for this User ID in 'student_panel_db.skills'")
        
    # Maybe it's stored differently? Check all docs in skills
    print("\nAll skill docs (first 5):")
    for doc in student_skills_collection.find().limit(5):
        print(doc)

if __name__ == "__main__":
    debug_kanishk()
