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
    get_company_by_id
)
from login import get_current_active_user, UserPublic

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
