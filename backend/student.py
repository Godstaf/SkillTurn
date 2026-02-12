from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from CRUD import (
    create_student_profile, 
    update_user_verification, 
    StudentProfile, 
    User,
    StudentSkills,
    update_student_skills,
    get_student_skills,
    StudentProjects,
    update_student_projects,
    get_student_projects,
    SkillItem,
    get_student_profile
)
from login import get_current_active_user, UserPublic

router = APIRouter()

@router.get("/student/profile", response_model=StudentProfile)
async def get_profile(current_user: User = Depends(get_current_active_user)):
    profile = get_student_profile(str(current_user.id))
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/student/profile", response_model=StudentProfile)
async def create_profile(profile: StudentProfile, current_user: User = Depends(get_current_active_user)):
    # Ensure the profile is linked to the current user
    # We might want to enforce student_id matches current_user.id or username
    # Assuming student_id in profile refers to the user's ID
    
    # Check if user is actually a student
    if current_user.role != "student":
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only students can create a student profile"
        )

    # Overwrite user_id with current user's ID to ensure security
    profile.user_id = str(current_user.id)
    
    # Create the profile
    new_profile = create_student_profile(profile)
    
    # Update user verification status
    update_user_verification(current_user.username, True)
    
    return new_profile

@router.get("/student/skills", response_model=StudentSkills)
async def get_skills(current_user: User = Depends(get_current_active_user)):
    skills = get_student_skills(str(current_user.id))
    if not skills:
        return StudentSkills(user_id=str(current_user.id), skills=[])
    return skills

@router.post("/student/skills", response_model=StudentSkills)
async def update_skills(skills_list: List[str], current_user: User = Depends(get_current_active_user)):
    # Convert list of strings to SkillItem objects
    skill_items = [SkillItem(name=s) for s in skills_list]
    skills_data = StudentSkills(user_id=str(current_user.id), skills=skill_items)
    return update_student_skills(str(current_user.id), skills_data)

@router.get("/student/projects", response_model=StudentProjects)
async def get_projects(current_user: User = Depends(get_current_active_user)):
    projects = get_student_projects(str(current_user.id))
    if not projects:
        return StudentProjects(user_id=str(current_user.id), projects=[])
    return projects
