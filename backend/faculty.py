from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from CRUD import (
    create_faculty_profile, update_user_verification, FacultyProfile, User,
    get_all_students, get_student_profile, get_student_skills, get_student_projects,
    update_student_skills, update_student_projects
)
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

@router.get("/faculty/dashboard")
async def get_dashboard(current_user: User = Depends(get_current_active_user)):
    if current_user.role != "faculty":
        raise HTTPException(status_code=403, detail="Access forbidden")

    students = get_all_students()
    applications = []

    for student in students:
        uid = str(student.id)
        profile = get_student_profile(uid)
        skills_data = get_student_skills(uid)
        projects_data = get_student_projects(uid)

        base_info = {
            "id": uid,
            "username": student.username,
            "email": student.email,
            "full_name": student.full_name,
            "role": student.role,
            "is_active": student.is_active,
            "is_verified": student.is_verified,
            "created_at": student.created_at,
            # Profile fields
            "collegeName": profile.college if profile else "N/A",
            "degree": profile.degree if profile else "N/A",
            "branch": profile.branch if profile else "N/A",
            "yearsOfStudy": profile.year_of_study if profile else 0,
            "expectedGraduationYear": profile.expected_graduation_year if profile else 0,
            "rollNumber": profile.roll_no if profile else "N/A",
            "collegeEmail": profile.college_email if profile else "N/A",
        }

        # Map Skills
        if skills_data:
            for skill in skills_data.skills:
                app_item = base_info.copy()
                app_item.update({
                    "requestId": skill.id,
                    "category": "Skills",
                    "shortDescription": skill.name,
                    "detailedDescription": f"Skill verification for {skill.name}",
                    "documents": [],
                    "approvalStatus": skill.verification_status,
                    "skillName": skill.name,
                    "proficiencyLevel": "N/A",
                    "certificationUrl": ""
                })
                applications.append(app_item)

        # Map Projects
        if projects_data:
            for project in projects_data.projects:
                 app_item = base_info.copy()
                 app_item.update({
                    "requestId": project.id,
                    "category": project.category,
                    "shortDescription": project.title,
                    "detailedDescription": project.description or "",
                    "documents": [project.project_link] if project.project_link else [],
                    "approvalStatus": project.verification_status,
                    "projectTitle": project.title,
                    "projectDomain": "N/A",
                    "teamSize": 1,
                    "internshipDomain": "N/A",
                    "companyName": "N/A",
                    "duration": "N/A"
                 })
                 applications.append(app_item)

    return applications

@router.post("/faculty/verify/skill/{student_id}/{skill_id}")
async def verify_skill(student_id: str, skill_id: str, status: str, current_user: User = Depends(get_current_active_user)):
    if current_user.role != "faculty":
        raise HTTPException(status_code=403, detail="Access forbidden")
        
    skills_data = get_student_skills(student_id)
    if not skills_data:
        raise HTTPException(status_code=404, detail="Student skills not found")
    
    found = False
    for skill in skills_data.skills:
        if skill.id == skill_id:
            skill.verification_status = status
            skill.verified = str(current_user.id)
            found = True
            break
            
    if not found:
        raise HTTPException(status_code=404, detail="Skill not found")
        
    update_student_skills(student_id, skills_data)
    return {"message": "Skill verification updated"}

@router.post("/faculty/verify/project/{student_id}/{project_id}")
async def verify_project(student_id: str, project_id: str, status: str, current_user: User = Depends(get_current_active_user)):
    if current_user.role != "faculty":
        raise HTTPException(status_code=403, detail="Access forbidden")

    projects_data = get_student_projects(student_id)
    if not projects_data:
        raise HTTPException(status_code=404, detail="Student projects not found")

    found = False
    for project in projects_data.projects:
        if project.id == project_id:
            project.verification_status = status
            project.verified = str(current_user.id)
            found = True
            break
            
    if not found:
        raise HTTPException(status_code=404, detail="Project not found")

    update_student_projects(student_id, projects_data)
    return {"message": "Project verification updated"}
