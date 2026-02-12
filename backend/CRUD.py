from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal
from datetime import datetime
from database import (
    users_collection, 
    student_profiles_collection, 
    student_skills_collection,
    student_projects_collection,
    saved_jobs_collection,
    faculty_profiles_collection, 
    student_projects_collection,
    saved_jobs_collection,
    faculty_profiles_collection, 
    recruiter_profiles_collection, # Renamed
    companies_collection, # New
    jobs_collection,
    applications_collection,
    courses_collection, 
    enrollments_collection, 
    assignments_collection, 
    submissions_collection,
    opportunities_collection
) 
from bson import ObjectId

# --- Helper ---
def fix_mongo_id(data):
    """Convert ObjectId to string for Pydantic models."""
    if data and "_id" in data:
        data["id"] = str(data["_id"])
        data["_id"] = str(data["_id"]) 
        # Fix user_id if present as ObjectId
        if "user_id" in data and not isinstance(data["user_id"], str):
             data["user_id"] = str(data["user_id"])
    return data

# --- Pydantic Models for Union Schema ---

class User(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    username: str
    email: str
    hashed_password: str
    role: Literal["student", "faculty", "recruiter", "admin"]
    is_verified: bool = False
    is_active: bool = True # Restored for compatibility
    full_name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StudentProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str   # ref users._id
    college: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    year_of_study: Optional[int] = None
    expected_graduation_year: Optional[int] = None
    roll_no: Optional[str] = None
    college_email: Optional[str] = None
    gpa: Optional[float] = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FacultyProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str   # ref users._id
    institute: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    official_email: Optional[str] = None
    years_of_experience: Optional[int] = None
    profile_link: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Company(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    website: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class RecruiterProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str   # ref users._id
    company_id: str # ref companies._id
    full_name: str
    designation: Optional[str] = None
    work_email: Optional[str] = None
    linkedin_profile: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# For flat frontend payload
class RecruiterRegistrationRequest(BaseModel):
    user_id: str
    full_name: str
    designation: str
    work_email: str
    linkedin_profile: Optional[str] = None
    # Company details
    company_id: Optional[str] = None # Added for explicit linking
    company_name: str
    company_website: Optional[str] = None
    company_size: Optional[str] = None
    hiring_domain: Optional[str] = None

# --- Student Extra Details ---

class SkillItem(BaseModel):
    name: str
    verified: Optional[str] = None # None = not verified, String = faculty_user_id

class StudentSkills(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    skills: List[SkillItem] = []
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectItem(BaseModel):
    title: str
    description: Optional[str] = None
    project_link: Optional[str] = None
    verified: Optional[str] = None # None = not verified, String = faculty_user_id

class StudentProjects(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    projects: List[ProjectItem] = []
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# --- Jobs & Applications ---

class Job(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    recruiter_id: str # ref recruiter user_id
    job_title: str
    description: str
    skills_required: List[str] = []
    job_type: str # "project" | "internship" | "fulltime"
    deadline: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AppliedJob(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str # student user_id
    job_id: str
    status: Literal["applied", "shortlisted", "rejected", "selected"] = "applied"
    applied_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SavedJob(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    job_id: str
    saved_at: datetime = Field(default_factory=datetime.utcnow)

class Opportunity(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    type: Literal["Project", "Internship", "Job"]
    organization: str # Company Name or Faculty Name
    company_id: Optional[str] = None # Optional for Faculty projects
    description: str
    skills: List[str] = []
    location: Optional[str] = "Remote"
    salary: Optional[str] = "Unpaid"
    posted_date: datetime = Field(default_factory=datetime.utcnow)
    deadline: Optional[str] = None # Keeping as string to match frontend "2025-12-15"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# --- Legacy/Course Models ---
class Course(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    code: str
    name: str
    description: Optional[str] = None
    instructor_id: str
    semester: str
    credits: int
    schedule: Optional[str] = None

class Enrollment(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    student_id: str
    course_id: str
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    grade: Optional[str] = None
    attendance_record: List[dict] = []

class Assignment(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    course_id: str
    title: str
    description: Optional[str] = None
    due_date: datetime
    total_points: int

class Submission(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    assignment_id: str
    student_id: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    file_url: Optional[str] = None
    score: Optional[float] = None
    feedback: Optional[str] = None

# --- NEW CRUD Operations ---

# Generic
def create_item(collection, item_data: BaseModel):
    item_dict = item_data.dict(exclude={"id"}, by_alias=True)
    new_item = collection.insert_one(item_dict)
    created_item = collection.find_one({"_id": new_item.inserted_id})
    return fix_mongo_id(created_item)

def retrieve_item(collection, item_id: str, model):
    try:
        item = collection.find_one({"_id": ObjectId(item_id)})
        if item:
            return model(**fix_mongo_id(item))
    except:
        return None
    return None

def retrieve_all_items(collection, model):
    items = []
    for item in collection.find():
        items.append(model(**fix_mongo_id(item)))
    return items

# 1. Admin / Auth
def add_user(user_data: User):
    return create_item(users_collection, user_data)

def retrieve_user(username: str):
    user = users_collection.find_one({"username": username})
    if user:
        return User(**fix_mongo_id(user))
    return None

def update_user_verification(username: str, status: bool):
    users_collection.update_one(
        {"username": username},
        {"$set": {"is_verified": status, "updated_at": datetime.utcnow()}}
    )

# 2. Student Panel
def create_student_profile(profile: StudentProfile):
    # Ensure uniqueness of user_id?
    return create_item(student_profiles_collection, profile)

def get_student_profile(user_id: str):
    # Changed from student_id to user_id
    profile = student_profiles_collection.find_one({"user_id": user_id})
    if profile:
        return StudentProfile(**fix_mongo_id(profile))
    return None

def update_student_skills(user_id: str, skills_data: StudentSkills):
    # Upsert skills
    skills_dict = skills_data.dict(exclude={"id"}, by_alias=True)
    student_skills_collection.update_one(
        {"user_id": user_id},
        {"$set": skills_dict},
        upsert=True
    )
    return skills_data

def get_student_skills(user_id: str):
    skills = student_skills_collection.find_one({"user_id": user_id})
    if skills:
        return StudentSkills(**fix_mongo_id(skills))
    return None

def update_student_projects(user_id: str, projects_data: StudentProjects):
    proj_dict = projects_data.dict(exclude={"id"}, by_alias=True)
    student_projects_collection.update_one(
        {"user_id": user_id},
        {"$set": proj_dict},
        upsert=True
    )
    return projects_data

def get_student_projects(user_id: str):
    projects = student_projects_collection.find_one({"user_id": user_id})
    if projects:
        return StudentProjects(**fix_mongo_id(projects))
    return None

# 3. Faculty Panel
def create_faculty_profile(profile: FacultyProfile):
    return create_item(faculty_profiles_collection, profile)

def get_faculty_profile(user_id: str):
    profile = faculty_profiles_collection.find_one({"user_id": user_id})
    if profile:
        return FacultyProfile(**fix_mongo_id(profile))
    return None

def add_course(course_data: Course):
    return create_item(courses_collection, course_data)

def retrieve_courses():
    return retrieve_all_items(courses_collection, Course)

# 4. Recruiter Panel
# 4. Recruiter Panel

def create_company(company: Company):
    # Check if company exists by name (simple check)
    existing = companies_collection.find_one({"name": company.name})
    if existing:
        return fix_mongo_id(existing)
    return create_item(companies_collection, company)

def get_company_by_name(name: str):
    company = companies_collection.find_one({"name": name})
    if company:
        return Company(**fix_mongo_id(company))
    return None

def get_company_by_id(company_id: str):
    return retrieve_item(companies_collection, company_id, Company)

def create_recruiter_profile(profile: RecruiterProfile):
    return create_item(recruiter_profiles_collection, profile)

def get_recruiter_profile(user_id: str):
    profile = recruiter_profiles_collection.find_one({"user_id": user_id})
    if profile:
        return RecruiterProfile(**fix_mongo_id(profile))
    return None

def post_job(job_data: Job):
    return create_item(jobs_collection, job_data)

def get_all_jobs():
    return retrieve_all_items(jobs_collection, Job)

def get_jobs_by_recruiter(recruiter_id: str):
    items = []
    for item in jobs_collection.find({"recruiter_id": recruiter_id}):
        items.append(Job(**fix_mongo_id(item)))
    return items

# Applications
def apply_for_job(application: AppliedJob):
    return create_item(applications_collection, application)

def get_student_applications(user_id: str):
    items = []
    for item in applications_collection.find({"user_id": user_id}):
        items.append(AppliedJob(**fix_mongo_id(item)))
    return items

def get_job_applications(job_id: str):
    items = []
    for item in applications_collection.find({"job_id": job_id}):
        items.append(AppliedJob(**fix_mongo_id(item)))
    return items

def update_application_status(app_id: str, new_status: str):
    applications_collection.update_one(
        {"_id": ObjectId(app_id)},
        {"$set": {"status": new_status, "updated_at": datetime.utcnow()}}
    )

# Enrollment
def enroll_student(enrollment_data: Enrollment):
    return create_item(enrollments_collection, enrollment_data)

# Opportunities
def create_opportunity(opportunity: Opportunity):
    return create_item(opportunities_collection, opportunity)

def get_all_opportunities():
    return retrieve_all_items(opportunities_collection, Opportunity)

def get_opportunity(opportunity_id: str):
    return retrieve_item(opportunities_collection, opportunity_id, Opportunity)
