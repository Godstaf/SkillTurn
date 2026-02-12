from backend.database import applications_collection, opportunities_collection, users_collection
from bson import ObjectId

def check_db():
    print(f"Applications: {applications_collection.count_documents({})}")
    print(f"Opportunities: {opportunities_collection.count_documents({})}")
    print(f"Users: {users_collection.count_documents({})}")
    
    apps = list(applications_collection.find().limit(5))
    for a in apps:
        print(f"App: {a}")

if __name__ == "__main__":
    check_db()
