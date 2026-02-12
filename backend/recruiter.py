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
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
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
    get_recruiter_profile,
    get_opportunities_by_company,
    get_applications_for_opportunities,
    update_application_status,
    create_opportunity,
    Opportunity,
    AppliedJob,
    get_student_profile,
    get_student_skills,
    get_student_projects
)

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
    # A. Check by ID if provided
    if request.company_id:
        company = get_company_by_id(request.company_id)
        if not company:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Company ID"
            )
        # Strict Verification: Name must match (Case Insensitive)
        if company.name.lower() != request.company_name.strip().lower():
             raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Company Name '{request.company_name}' does not match the provided Company ID."
            )
        
    # B. Check by Name if ID not provided
    else:
        # Case-insensitive search handled by helper
        company = get_company_by_name(request.company_name.strip())
        
        # C. If NOT found, Auto-Create it
        if not company:
            new_company_data = Company(
                name=request.company_name.strip(),
                website=request.company_website,
                company_size=request.company_size,
                industry=request.hiring_domain, # Mapping hiring_domain to industry
                description="Auto-generated during recruiter registration"
            )
            company = create_company(new_company_data)
            
    # Standardize ID access
    # Use the explicit company_id if available, otherwise fallback to _id
    final_company_id = company.company_id if company.company_id else str(company.id)

    # 2. Create Recruiter Profile
    profile = RecruiterProfile(
        user_id=str(current_user.id),
        company_id=final_company_id, # Store explicit ID
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

@router.get("/recruiter/dashboard")
async def get_dashboard(current_user: User = Depends(get_current_active_user)):
    recruiter = get_recruiter_profile(str(current_user.id))
    if not recruiter:
        raise HTTPException(status_code=404, detail="Recruiter profile not found")
    
    company_id = recruiter.company_id
    
    # 1. Fetch Opportunities
    opportunities = get_opportunities_by_company(company_id)
    opp_ids = [opp.id for opp in opportunities]
    
    # 2. Fetch Applications
    applications = get_applications_for_opportunities(opp_ids)
    
    # 3. Format Response for Dashboard
    # Map opportunities to JobPosition interface
    jobs_data = []
    for opp in opportunities:
        app_count = len([a for a in applications if a.job_id == opp.id])
        jobs_data.append({
            "id": opp.id,
            "title": opp.title,
            "department": opp.organization, # Using organization name as department proxy or company name
            "location": opp.location,
            "type": opp.type, # "Project", "Internship", "Job"
            "postedString": opp.posted_date.strftime("%Y-%m-%d"),
            "applicantsCount": app_count,
            "status": "Active", # Logic for Active/Closed?
            "skills": opp.skills
        })
        
    # Map applications to Candidate interface
    candidates_data = []
    for app in applications:
        student_user = UserPublic(**app.user_id) # Need to fetch student details. simplified for now
        # Fetch detailed student info
        # This is n+1 problem, should be optimized in production with aggregation
        student_profile = get_student_profile(app.user_id)
        student_skills = get_student_skills(app.user_id)
        
        # User details from users collection? We only have user_id in app.
        # Need a helper to get user basic info by ID. 
        # For MVP, let's assume we can fetch it.
        # Ideally we join in mongo.
        
        # Mocking student name/email retrieval via get_user_by_id if it existed
        # We will use placeholder if not available easily without heavy refactor
        
        candidates_data.append({
            "id": app.id,
            "studentId": app.user_id,
            "name": "Student Name", # Placeholder or fetch real
            "email": "student@example.com", # Placeholder
            "appliedRole": next((o.title for o in opportunities if o.id == app.job_id), "Unknown"),
            "status": app.status.capitalize() if app.status != "applied" else "New",
            "institution": student_profile.college if student_profile else "Unknown",
            "program": student_profile.degree if student_profile else "Unknown",
            "branch": student_profile.branch if student_profile else "Unknown",
            "skills": [s.name for s in student_skills.skills] if student_skills else [],
            "resumeLink": "#", # Placeholder
            "matchScore": 85, # Logic to calculate match?
            "appliedDate": app.applied_at.strftime("%Y-%m-%d"),
            "avatarInitials": "ST"
        })
        
    return {
        "jobs": jobs_data,
        "candidates": candidates_data,
        "recruiterName": recruiter.full_name,
        "companyName": "TechCorp" # Should fetch company name
    }

@router.post("/recruiter/opportunities", response_model=Opportunity)
async def post_opportunity(opp: Opportunity, current_user: User = Depends(get_current_active_user)):
    recruiter = get_recruiter_profile(str(current_user.id))
    if not recruiter:
        raise HTTPException(status_code=403, detail="Recruiter profile required")
    
    # Enforce company_id
    opp.company_id = recruiter.company_id
    opp.organization = opp.organization # Or override with company name
    
    return create_opportunity(opp)

@router.patch("/recruiter/applications/{app_id}/status")
async def update_status(app_id: str, status_update: Dict[str, str], current_user: User = Depends(get_current_active_user)):
    # Verify recruiter ownership?
    status = status_update.get("status")
    if not status:
        raise HTTPException(status_code=400, detail="Status required")
        
    result = update_application_status(app_id, status.lower())
    return {"success": result}

@router.get("/recruiter/analytics")
async def get_analytics(current_user: User = Depends(get_current_active_user)):
    # Returns mock analytics data for now, but structured from backend
    # In real world, calculate from database
    return {
        "kpi": [
            { "label": "Total Applicants", "value": "120", "change": "+10%", "positive": True },
            { "label": "Active Interns", "value": "5", "change": "+1", "positive": True }
        ],
        "funnel": [
            { "name": "Applied", "value": 120, "fill": "#6366f1" },
            { "name": "Shortlisted", "value": 45, "fill": "#8b5cf6" },
            { "name": "Selected", "value": 12, "fill": "#c4b5fd" }
        ]
    }
