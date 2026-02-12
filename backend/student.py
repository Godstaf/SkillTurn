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
    ProjectItem,
    get_student_profile,
    AppliedJob,
    apply_for_job,
    get_application_by_student_and_job,
    get_all_full_student_profiles
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

@router.post("/student/skills", response_model=StudentSkills)
async def add_skill(skill: SkillItem, current_user: User = Depends(get_current_active_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Only students can add skills")
        
    user_id = str(current_user.id)
    student_skills = get_student_skills(user_id)
    if not student_skills:
        student_skills = StudentSkills(user_id=user_id, skills=[])
    
    student_skills.skills.append(skill)
    update_student_skills(user_id, student_skills)
    return student_skills

@router.post("/student/projects", response_model=StudentProjects)
async def add_project(project: ProjectItem, current_user: User = Depends(get_current_active_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Only students can add projects")

    user_id = str(current_user.id)
    student_projects = get_student_projects(user_id)
    if not student_projects:
        student_projects = StudentProjects(user_id=user_id, projects=[])
    
    student_projects.projects.append(project)
    update_student_projects(user_id, student_projects)
    return student_projects

@router.get("/student/full-profile")
async def get_full_profile(current_user: User = Depends(get_current_active_user)):
    user_id = str(current_user.id)
    profile = get_student_profile(user_id)
    skills = get_student_skills(user_id)
    projects = get_student_projects(user_id)
    
    return {
        "profile": profile,
        "skills": skills.skills if skills else [],
        "projects": projects.projects if projects else []
    }

@router.post("/student/apply")
async def apply_opportunity(application: AppliedJob, current_user: User = Depends(get_current_active_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Only students can apply")

    # Check if already applied
    existing = get_application_by_student_and_job(str(current_user.id), application.job_id)
    if existing:
         raise HTTPException(status_code=400, detail="Already applied to this opportunity")

    application.user_id = str(current_user.id)
    application.status = "applied"
    
    return apply_for_job(application)

@router.get("/students")
async def get_all_students(current_user: User = Depends(get_current_active_user)):
    # Allow recruiters and faculty to view student profiles
    if current_user.role not in ["recruiter", "faculty", "admin"]:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    return get_all_full_student_profiles()
