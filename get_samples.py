from backend.database import opportunities_collection, users_collection
from bson import ObjectId

def get_samples():
    users = list(users_collection.find({"role": "student"}).limit(3))
    opps = list(opportunities_collection.find().limit(3))
    
    print("Students:")
    for u in users:
        print(f"ID: {u['_id']}, Name: {u.get('full_name')}")
        
    print("\nOpportunities:")
    for o in opps:
        print(f"ID: {o['_id']}, Title: {o.get('title')}")

if __name__ == "__main__":
    get_samples()
