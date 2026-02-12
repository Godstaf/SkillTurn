from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from CRUD import create_faculty_profile, update_user_verification, FacultyProfile, User
from login import get_current_active_user, UserPublic

router = APIRouter()

@router.post("/faculty/profile", response_model=FacultyProfile)
async def create_profile(profile: FacultyProfile, current_user: User = Depends(get_current_active_user)):
    # Ensure the profile is linked to the current user
    
    # Check if user is actually a faculty
    if current_user.role != "faculty":
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only faculty members can create a faculty profile"
        )

    # Overwrite user_id with current user's ID to ensure security
    profile.user_id = str(current_user.id)
    
    # Create the profile
    new_profile = create_faculty_profile(profile)
    
    # Update user verification status
    update_user_verification(current_user.username, True)
    
    return new_profile
