from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from CRUD import (
    create_recruiter_profile, 
    update_user_verification, 
    RecruiterProfile, 
    User,
    RecruiterRegistrationRequest,
    Company,
    create_company,
    get_company_by_name,
    get_company_by_id,
    update_application_status
)
from login import get_current_active_user, UserPublic
from database import (
    opportunities_collection,
    applications_collection,
    users_collection,
    student_profiles_collection,
    student_skills_collection,
    student_projects_collection
)
from bson import ObjectId

router = APIRouter()

@router.post("/recruiter/profile", response_model=RecruiterProfile)
async def create_profile(request: RecruiterRegistrationRequest, current_user: User = Depends(get_current_active_user)):
    # Ensure the profile is linked to the current user
    
    # Check if user is actually a recruiter
    if current_user.role != "recruiter":
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only recruiters can create a recruiter profile"
        )

    # 1. Handle Company Logic
    company = None
    
    # A. Check by ID if provided
    if request.company_id:
        company = get_company_by_id(request.company_id)
        
    # B. Check by Name if ID failed or not provided
    if not company:
        company = get_company_by_name(request.company_name)
    
    # C. If still no company, return error (Unregistered Company)
    if not company:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unregistered Company"
        )
            
    # Standardize ID access
    company_id = str(company.id) if isinstance(company, Company) else str(company["id"])

    # 2. Create Recruiter Profile
    profile = RecruiterProfile(
        user_id=str(current_user.id),
        company_id=company_id,
        full_name=request.full_name,
        designation=request.designation,
        work_email=request.work_email,
        linkedin_profile=request.linkedin_profile
    )
    
    # Create the profile
    new_profile = create_recruiter_profile(profile)
    
    # Update user verification status
    update_user_verification(current_user.username, True)
    
    return new_profile

@router.get("/recruiter/dashboard-data")
async def get_dashboard_data():
    # 1. Fetch all opportunities
    opps = list(opportunities_collection.find())
    formatted_opps = []
    for o in opps:
        o["id"] = str(o["_id"])
        o["_id"] = str(o["_id"])
        formatted_opps.append(o)

    # 2. Fetch all applications and join with student data
    apps = list(applications_collection.find())
    formatted_candidates = []
    
    for a in apps:
        try:
            user_id = a.get("user_id")
            if not user_id: continue
            
            # Get user info
            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if not user: continue
            
            # Get profile info
            profile = student_profiles_collection.find_one({"user_id": str(user_id)})
            
            # Get skills
            skills_doc = student_skills_collection.find_one({"user_id": str(user_id)})
            skills = [s.get("name") for s in skills_doc.get("skills", [])] if skills_doc else []
            
            # Get projects count
            projects_doc = student_projects_collection.find_one({"user_id": str(user_id)})
            projects_count = len(projects_doc.get("projects", [])) if projects_doc else 0
            
            # Get the job title for 'appliedRole'
            job_id = a.get("job_id")
            job = opportunities_collection.find_one({"_id": ObjectId(job_id)})
            applied_role = job.get("title", "Unknown") if job else "Unknown Job"

            # Map status to frontend friendly terms
            raw_status = a.get("status", "New").lower()
            status_map = {
                "applied": "New",
                "shortlisted": "Screening",
                "interview": "Interview",
                "selected": "Selected",
                "rejected": "Rejected"
            }
            display_status = status_map.get(raw_status, "New")

            candidate = {
                "id": str(a["_id"]),
                "name": user.get("full_name", "Unknown"),
                "email": user.get("email", ""),
                "appliedRole": applied_role,
                "status": display_status,
                "institution": profile.get("college", "Unknown") if profile else "Unknown",
                "program": profile.get("degree", "Unknown") if profile else "Unknown",
                "branch": profile.get("branch", "Unknown") if profile else "Unknown",
                "skills": skills,
                "projectsCount": projects_count,
                "resumeLink": "#", # Placeholder or link if available
                "matchScore": 0, # Calculated on frontend
                "appliedDate": a.get("applied_at", datetime.utcnow()).strftime("%Y-%m-%d"),
                "avatarInitials": "".join([n[0] for n in user.get("full_name", "U").split()[:2]]).upper()
            }
            formatted_candidates.append(candidate)
        except Exception as e:
            print(f"Error processing application: {e}")
            continue

    return {
        "jobs": formatted_opps,
        "candidates": formatted_candidates
    }

@router.patch("/recruiter/applications/{app_id}/status")
async def update_app_status(app_id: str, new_status: str, current_user: User = Depends(get_current_active_user)):
    if current_user.role not in ["recruiter", "admin"]:
         raise HTTPException(status_code=403, detail="Unauthorized")
    
    # Normalize status for database
    status_map = {
        "New": "applied",
        "Screening": "shortlisted",
        "Interview": "interview",
        "Selected": "selected",
        "Rejected": "rejected"
    }
    db_status = status_map.get(new_status, new_status.lower())
    
    update_application_status(app_id, db_status)
    return {"message": "Status updated successfully"}

@router.get("/recruiter/applications/{app_id}/resume-data")
async def get_app_resume_data(app_id: str, current_user: User = Depends(get_current_active_user)):
    print(f"--- Resume Data Request for AppID: {app_id} ---")
    if current_user.role not in ["recruiter", "admin"]:
         print(f"Access Denied: User role is {current_user.role}")
         raise HTTPException(status_code=403, detail="Unauthorized")
    
    try:
        app_obj_id = ObjectId(app_id)
    except Exception as e:
        print(f"Invalid App ID format: {app_id}")
        raise HTTPException(status_code=400, detail="Invalid application ID format")

    app = applications_collection.find_one({"_id": app_obj_id})
    if not app:
        print(f"Application not found in DB: {app_id}")
        raise HTTPException(status_code=404, detail="Application not found")
        
    user_id = app.get("user_id")
    print(f"Found Application. Student UserID: {user_id}")
    
    if not user_id:
        raise HTTPException(status_code=404, detail="User ID not found in application")

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    profile = student_profiles_collection.find_one({"user_id": str(user_id)})
    skills_doc = student_skills_collection.find_one({"user_id": str(user_id)})
    projects_doc = student_projects_collection.find_one({"user_id": str(user_id)})
    
    print(f"Data retrieved: User={'Yes' if user else 'No'}, Profile={'Yes' if profile else 'No'}, Skills={'Yes' if skills_doc else 'No'}, Projects={'Yes' if projects_doc else 'No'}")

    return {
        "name": user.get("full_name", "Unknown") if user else "Unknown",
        "email": user.get("email", "") if user else "",
        "college": profile.get("college", "") if profile else "",
        "degree": profile.get("degree", "") if profile else "",
        "branch": profile.get("branch", "") if profile else "",
        "skills": [s.get("name") for s in skills_doc.get("skills", [])] if skills_doc else [],
        "projects": projects_doc.get("projects", []) if projects_doc else []
    }
