
from pymongo import MongoClient
import certifi
import uuid

# Connection details from database.py
MONGO_DETAILS = "mongodb+srv://chaurasiakanishk666_db_user:LJa6SC9xjAJARmLi@internportal.wkf9jx4.mongodb.net/"
client = MongoClient(MONGO_DETAILS, tlsCAFile=certifi.where())

# Database
recruiter_db = client.recruiter_panel_db
companies_collection = recruiter_db.get_collection("companies")

print("Checking companies for missing company_id...")

companies = companies_collection.find()
count = 0
updated = 0

for company in companies:
    count += 1
    if "company_id" not in company:
        # Generate new ID if missing
        new_id = str(uuid.uuid4())[:8] # Short 8-char ID for usability
        companies_collection.update_one(
            {"_id": company["_id"]},
            {"$set": {"company_id": new_id}}
        )
        print(f"Updated {company.get('name', 'Unknown')} with ID: {new_id}")
        updated += 1
    else:
        print(f"Skipping {company.get('name', 'Unknown')} (ID exists: {company['company_id']})")

print(f"Done. Processed {count} companies. Updated {updated}.")
