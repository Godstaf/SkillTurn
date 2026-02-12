from pymongo import MongoClient
import certifi
import sys

MONGO_DETAILS = "mongodb+srv://chaurasiakanishk666_db_user:LJa6SC9xjAJARmLi@internportal.wkf9jx4.mongodb.net/" 

try:
    print("Connecting to MongoDB...")
    client = MongoClient(MONGO_DETAILS, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
