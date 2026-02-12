"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { JobFormModal, JobData } from "@/components/JobFormModal";
import styles from './dashboard.module.css';
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// --- Mock Data Interfaces ---

interface JobPosition {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Internship' | 'Contract';
    postedString: string;
    applicantsCount: number;
    status: 'Active' | 'Closed' | 'Draft';
    skills?: string[];
}

interface Candidate {
    id: string;
    name: string;
    email: string;
    appliedRole: string; // Linking to JobPosition.title or ID
    status: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Rejected' | 'Selected';
    institution: string;
    program: string;
    branch: string;
    skills: string[];
    projectsCount?: number; // Added for score calculation
    resumeLink: string;
    matchScore: number; // Base match score
    appliedDate: string;
    avatarInitials: string;
}

// --- Initial Mock Data ---

const INITIAL_JOBS: JobPosition[] = [
    {
        id: 'j1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote',
        type: 'Full-time', postedString: '2 days ago', applicantsCount: 45, status: 'Active',
        skills: ['React', 'TypeScript', 'Next.js']
    },
    {
        id: 'j2', title: 'UX Designer Intern', department: 'Design', location: 'New York, NY',
        type: 'Internship', postedString: '1 week ago', applicantsCount: 128, status: 'Active',
        skills: ['Figma', 'Prototyping']
    },
    {
        id: 'j3', title: 'Product Manager', department: 'Product', location: 'San Francisco, CA',
        type: 'Full-time', postedString: '3 days ago', applicantsCount: 32, status: 'Active',
        skills: ['Agile', 'Roadmapping']
    },
    {
        id: 'j4', title: 'Backend Developer', department: 'Engineering', location: 'Remote',
        type: 'Contract', postedString: '5 days ago', applicantsCount: 18, status: 'Active',
        skills: ['Node.js', 'PostgreSQL']
    },
];

const INITIAL_CANDIDATES: Candidate[] = [
    {
        id: 'c1', name: 'Alex Johnson', email: 'alex.j@example.com',
        appliedRole: 'Senior Frontend Engineer', status: 'New',
        institution: 'IIT Bombay', program: 'B.Tech', branch: 'Computer Science and Engineering',
        skills: ['React', 'TypeScript', 'Node.js'], projectsCount: 4, resumeLink: 'https://drive.google.com/file/d/alex_resume/view',
        matchScore: 92, appliedDate: '2 hours ago', avatarInitials: 'AJ'
    },
    {
        id: 'c2', name: 'Samantha Lee', email: 'sam.lee@example.com',
        appliedRole: 'UX Designer Intern', status: 'Screening',
        institution: 'NID Ahmedabad', program: 'B.Des', branch: 'Interaction Design',
        skills: ['Figma', 'Adobe XD', 'Prototyping'], projectsCount: 5, resumeLink: 'https://drive.google.com/file/d/sam_portfolio/view',
        matchScore: 88, appliedDate: '1 day ago', avatarInitials: 'SL'
    },
    {
        id: 'c3', name: 'Michael Chen', email: 'm.chen@example.com',
        appliedRole: 'Senior Frontend Engineer', status: 'New',
        institution: 'IIIT Hyderabad', program: 'M.Tech', branch: 'Computer Science',
        skills: ['Vue.js', 'JavaScript', 'AWS'], projectsCount: 2, resumeLink: 'https://drive.google.com/file/d/mike_cv/view',
        matchScore: 75, appliedDate: '3 hours ago', avatarInitials: 'MC'
    },
    {
        id: 'c4', name: 'Emily Davis', email: 'emily.d@example.com',
        appliedRole: 'Product Manager', status: 'Interview',
        institution: 'IIM Bangalore', program: 'MBA', branch: 'General Management',
        skills: ['Agile', 'JIRA', 'Roadmapping'], projectsCount: 3, resumeLink: 'https://drive.google.com/file/d/emily_pm/view',
        matchScore: 95, appliedDate: '2 days ago', avatarInitials: 'ED'
    },
    {
        id: 'c5', name: 'David Wilson', email: 'david.w@example.com',
        appliedRole: 'UX Designer Intern', status: 'Rejected',
        institution: 'NIT Trichy', program: 'B.Tech', branch: 'Electrical Engineering',
        skills: ['Photoshop', 'Sketch'], projectsCount: 1, resumeLink: 'https://drive.google.com/file/d/david_res/view',
        matchScore: 45, appliedDate: '4 days ago', avatarInitials: 'DW'
    },
];

import { useRouter } from 'next/navigation';

export default function RecruiterDashboardPage() {
    const router = useRouter();

    const [jobs, setJobs] = useState<JobPosition[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'All' | 'New' | 'Screening' | 'Interview' | 'Selected'>('All');
    const [selectedJobFilter, setSelectedJobFilter] = useState<string | null>(null); // null means 'All Interns'
    const [selectedJobDetail, setSelectedJobDetail] = useState<JobPosition | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- Fetch Real Data ---
    const fetchDashboardData = async (isInitial = false) => {
        if (isInitial) setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/recruiter/dashboard-data');
            const data = await response.json();

            // Map backend opportunities to JobPosition
            const dbJobs: JobPosition[] = data.jobs.map((j: any) => ({
                id: j.id,
                title: j.title,
                department: j.organization,
                location: j.location,
                type: j.type as any,
                postedString: new Date(j.posted_date).toLocaleDateString(),
                applicantsCount: data.candidates.filter((c: any) => c.appliedRole === j.title).length,
                status: 'Active',
                skills: j.skills
            }));

            setJobs(dbJobs);
            setCandidates(data.candidates);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            if (isInitial) setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData(true);

        // Auto-refresh every 15 seconds to keep data dynamic
        const interval = setInterval(() => fetchDashboardData(), 15000);
        return () => clearInterval(interval);
    }, []);

    // --- Scoring Algorithm ---
    const calculateScore = (candidate: Candidate) => {
        // If specific job is selected, calculate against it. Otherwise use a representative job or baseline.
        const targetJob = selectedJobFilter
            ? jobs.find(j => j.title === selectedJobFilter)
            : jobs.find(j => j.title === candidate.appliedRole);

        if (!targetJob || !targetJob.skills || targetJob.skills.length === 0) {
            return candidate.matchScore;
        }

        const matchedSkills = candidate.skills.filter(skill =>
            targetJob.skills?.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
        ).length;

        const skillPercentage = (matchedSkills / targetJob.skills.length) * 100;

        // Add 6 points per project, capped at 30 bonus points
        const projectBonus = Math.min(30, (candidate.projectsCount || 0) * 6);

        // Final score combines skills (70% weight) and project bonus, but user asked for "skills match * 100 + extra points"
        // Let's stick closer to the literal request: (matched/required)*100 + bonus
        const finalScore = Math.min(100, Math.round(skillPercentage + projectBonus));
        return finalScore;
    };

    const getRecruiterSuggestion = (score: number) => {
        if (score >= 90) return { text: 'Highly Recommended', color: '#4CAF50' };
        if (score >= 75) return { text: 'Strong Match', color: 'var(--md-sys-color-primary)' };
        if (score >= 60) return { text: 'Potential Fit', color: '#FF9800' };
        return { text: 'Limited Match', color: '#F44336' };
    };

    // --- Derived Stats ---
    const totalApplications = candidates.length;
    const interviewsScheduled = candidates.filter(c => c.status === 'Interview').length;
    const activePositions = jobs.filter(j => j.status === 'Active').length;
    const selectedStudents = candidates.filter(c => c.status === 'Selected').length;

    // --- Filter Logic ---
    const filteredCandidates = candidates.filter(c => {
        const matchesStatus = filterStatus === 'All' ? c.status !== 'Rejected' : c.status === filterStatus;
        const matchesJob = selectedJobFilter === null || c.appliedRole === selectedJobFilter;
        return matchesStatus && matchesJob;
    });

    const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);

    const handleStatusUpdate = async (id: string, newStatus: Candidate['status']) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8000/recruiter/applications/${id}/status?new_status=${newStatus}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const [showJobModal, setShowJobModal] = useState(false);

    const handleJobSubmit = async (data: JobData) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const opportunityPayload = {
                title: data.position,
                type: data.tenure === 'Full-time' ? 'Job' : (data.tenure as any),
                organization: data.company,
                description: data.description,
                skills: [], // Could add skills field to modal later
                location: data.location,
                salary: data.salary,
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };

            const response = await fetch('http://localhost:8000/opportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(opportunityPayload)
            });

            if (response.ok) {
                const newOpp = await response.json();

                // Add to local state
                setJobs(prev => [...prev, {
                    id: newOpp.id,
                    title: newOpp.title,
                    department: newOpp.organization,
                    location: newOpp.location,
                    type: newOpp.type === 'Job' ? 'Full-time' : newOpp.type,
                    postedString: 'Just now',
                    applicantsCount: 0,
                    status: 'Active',
                    skills: newOpp.skills
                }]);

                setShowJobModal(false);
                alert("Intern Posted Successfully to Database!");
            }
        } catch (error) {
            console.error("Failed to post job:", error);
            alert("Error posting job to database.");
        }
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--md-sys-color-surface)' }}>
                <div className={styles.loader}></div>
                <p style={{ marginLeft: '1rem', color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>

            {/* Header Section */}
            <header className={styles.headerContainer}>
                <div className={styles.profileSection} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '24px',
                        background: 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 10px 30px -10px var(--md-sys-color-primary)'
                    }}>
                        JS
                    </div>
                    <div>
                        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', lineHeight: '1.2' }}>John Smith</h1>
                        <p style={{ fontSize: '1rem', color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>Global Talent Acquisition Lead</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-secondary)' }}>TechFlow Industries</p>
                    </div>
                </div>

                <div className={styles.rightContentWrapper}>
                    <div className={styles.titleSection}>
                        <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>Recruiter Dashboard</h2>
                        <p style={{ fontSize: '1.0rem', color: 'var(--md-sys-color-secondary)', margin: 0 }}>
                            Monday, October 24, 2026
                        </p>
                    </div>
                    <div className={styles.actionButtonWrapper} style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="outlined" style={{ marginTop: '0.5rem' }} onClick={() => router.push('/studentProfiles')}>Search Candidates</Button>
                        <Button variant="outlined" style={{ marginTop: '0.5rem' }} onClick={() => router.push('/recruiterAnalytics')}>📊 Intern Analytics</Button>
                        <Button variant="filled" style={{ marginTop: '0.5rem' }} onClick={() => setShowJobModal(true)}>+ Post New Intern</Button>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <ScrollReveal width="100%" delay={0.1}>
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <Card variant="elevated">
                        <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Total Applications</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>{totalApplications}</div>
                        <div style={{ fontSize: '0.85rem', color: 'green', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>▲ 12%</span> <span style={{ color: 'var(--md-sys-color-secondary)' }}>vs last week</span>
                        </div>
                    </Card>
                    <Card variant="elevated">
                        <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Interviews Scheduled</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--md-sys-color-tertiary)' }}>{interviewsScheduled}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-secondary)' }}>4 today</div>
                    </Card>
                    <Card variant="elevated">
                        <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Active Positions</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--md-sys-color-primary)' }}>{activePositions}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-secondary)' }}>Expiring in 5 days: 1</div>
                    </Card>
                    <Card variant="elevated">
                        <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Selected Students</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'green' }}>{selectedStudents}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-secondary)' }}>Hired this cycle</div>
                    </Card>
                </section>
            </ScrollReveal>

            <div className={styles.dashboardGrid}>

                {/* Left Column: Intern Positions */}
                <div className={styles.stickyColumn}>
                    <ScrollReveal width="100%" delay={0.2}>
                        <section>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Active Interns</h3>
                                <Link href="/r-posted_jobs" style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-primary)', cursor: 'pointer', textDecoration: 'none' }}>View All</Link>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {jobs.map(job => (
                                    <motion.div
                                        key={job.id}
                                        whileHover={{ y: -2 }}
                                        onClick={() => setSelectedJobFilter(job.title === selectedJobFilter ? null : job.title)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <GlassContainer style={{
                                            padding: '1.25rem',
                                            border: selectedJobFilter === job.title ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--glass-border)',
                                            background: selectedJobFilter === job.title ? 'rgba(var(--md-sys-color-primary-rgb), 0.05)' : 'var(--glass-background)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <h4 style={{ fontWeight: 'bold', fontSize: '1rem' }}>{job.title}</h4>
                                                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'var(--md-sys-color-secondary-container)', color: 'var(--md-sys-color-on-secondary-container)' }}>
                                                    {job.type}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-secondary)', marginBottom: '1rem' }}>
                                                {job.department} • {job.location}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--md-sys-color-secondary)' }}>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                    <span>{job.applicantsCount} Applicants</span>
                                                    <span>•</span>
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedJobDetail(job);
                                                        }}
                                                        style={{ color: 'var(--md-sys-color-primary)', fontWeight: 'bold', textDecoration: 'underline' }}
                                                    >
                                                        Details
                                                    </span>
                                                </div>
                                                <span>{job.postedString}</span>
                                            </div>
                                        </GlassContainer>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>
                </div>

                {/* Right Column: Candidates & Actions */}
                <ScrollReveal width="100%" delay={0.3}>
                    <section>
                        {/* Filters */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {(['All', 'New', 'Screening', 'Interview', 'Selected'] as const).map(status => (
                                <div
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    style={{
                                        padding: '0.75rem 1.5rem', borderRadius: '100px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
                                        background: filterStatus === status ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)',
                                        color: filterStatus === status ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {status}
                                </div>
                            ))}
                        </div>

                        {/* Candidate List */}
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {filteredCandidates.length === 0 ? (
                                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--md-sys-color-secondary)', background: 'rgba(0,0,0,0.03)', borderRadius: '16px' }}>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No candidates found</p>
                                    <p>Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                filteredCandidates.map(candidate => (
                                    <motion.div
                                        layoutId={`candidate-${candidate.id}`}
                                        key={candidate.id}
                                        onClick={() => setSelectedCandidateId(candidate.id)}
                                        style={{ cursor: 'pointer' }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <GlassContainer style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                            {/* Avatar */}
                                            <div style={{
                                                width: '56px', height: '56px', borderRadius: '50%', background: 'var(--md-sys-color-tertiary-container)',
                                                color: 'var(--md-sys-color-on-tertiary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '1.2rem', fontWeight: 'bold'
                                            }}>
                                                {candidate.avatarInitials}
                                            </div>

                                            {/* Info */}
                                            <div style={{ flex: 1, minWidth: '200px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.25rem' }}>
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{candidate.name}</h3>
                                                    <span style={{
                                                        fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600,
                                                        background: candidate.status === 'New' ? 'var(--md-sys-color-primary-container)' :
                                                            candidate.status === 'Interview' ? 'var(--md-sys-color-tertiary-container)' :
                                                                candidate.status === 'Selected' ? '#c8e6c9' : '#e0e0e0',
                                                        color: candidate.status === 'New' ? 'var(--md-sys-color-on-primary-container)' :
                                                            candidate.status === 'Interview' ? 'var(--md-sys-color-on-tertiary-container)' :
                                                                candidate.status === 'Selected' ? '#1b5e20' : '#333'
                                                    }}>
                                                        {candidate.status}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-secondary)' }}>Applying for <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>{candidate.appliedRole}</span></p>

                                                {/* Suggestion Badge */}
                                                <div style={{
                                                    display: 'inline-block', marginTop: '8px', padding: '2px 10px',
                                                    borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                                                    background: `${getRecruiterSuggestion(calculateScore(candidate)).color}15`,
                                                    color: getRecruiterSuggestion(calculateScore(candidate)).color,
                                                    border: `1px solid ${getRecruiterSuggestion(calculateScore(candidate)).color}30`
                                                }}>
                                                    ✨ {getRecruiterSuggestion(calculateScore(candidate)).text}
                                                </div>
                                            </div>

                                            {/* Metrics */}
                                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--md-sys-color-secondary)' }}>Match</div>
                                                    <div style={{
                                                        fontSize: '1.2rem', fontWeight: 'bold',
                                                        color: getRecruiterSuggestion(calculateScore(candidate)).color
                                                    }}>
                                                        {calculateScore(candidate)}%
                                                    </div>
                                                </div>
                                                <Button variant="glass" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➔</Button>
                                            </div>
                                        </GlassContainer>
                                    </motion.div>
                                ))
                            )}
                        </div>

                    </section>
                </ScrollReveal>
            </div>

            {/* Candidate Detail Modal */}
            <AnimatePresence>
                {selectedCandidateId && selectedCandidate && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCandidateId(null)}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 40
                        }}
                    />
                )}
                {selectedCandidateId && selectedCandidate && (
                    <motion.div
                        key="modal-container"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 50, pointerEvents: 'none'
                        }}
                    >
                        <motion.div
                            layoutId={`candidate-${selectedCandidateId}`}
                            style={{
                                width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
                                background: 'var(--md-sys-color-surface)', borderRadius: '24px', padding: '0',
                                pointerEvents: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            {/* Modal Header */}
                            <div className={styles.modalHeader}>
                                <Button
                                    variant="glass" onClick={() => setSelectedCandidateId(null)}
                                    className={styles.closeButton}
                                >✕</Button>

                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '50%', background: 'var(--md-sys-color-on-secondary-container)',
                                        color: 'var(--md-sys-color-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '2rem', fontWeight: 'bold'
                                    }}>
                                        {selectedCandidate.avatarInitials}
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{selectedCandidate.name}</h2>
                                        <p style={{ fontSize: '1rem', color: 'var(--md-sys-color-on-secondary-container)', opacity: 0.8 }}>
                                            {selectedCandidate.appliedRole} • <span style={{ fontWeight: 600 }}>{selectedCandidate.matchScore}% Match</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className={styles.modalGrid}>

                                {/* Left Content */}
                                <div>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--md-sys-color-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Academic Details</h3>
                                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                                            <p style={{ marginBottom: '0.5rem' }}><strong>Institution:</strong> {selectedCandidate.institution}</p>
                                            <p style={{ marginBottom: '0.5rem' }}><strong>Program:</strong> {selectedCandidate.program}</p>
                                            <p><strong>Branch:</strong> {selectedCandidate.branch}</p>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--md-sys-color-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {selectedCandidate.skills.map((skill, idx) => (
                                                <span key={`${skill}-${idx}`} style={{
                                                    padding: '6px 14px', borderRadius: '20px',
                                                    border: '1px solid var(--md-sys-color-outline, #ccc)',
                                                    fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface)'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--md-sys-color-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h3>
                                        <p>📧 {selectedCandidate.email}</p>
                                    </div>
                                </div>

                                {/* Right Sidebar Actions */}
                                <div className={styles.modalSidebar}>
                                    <div style={{ padding: '1.5rem', background: 'var(--md-sys-color-surface-variant)', borderRadius: '16px' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Actions</h4>

                                        {selectedCandidate.status === 'New' && (
                                            <Button
                                                variant="filled" style={{ width: '100%', marginBottom: '0.75rem' }}
                                                onClick={() => { handleStatusUpdate(selectedCandidate.id, 'Screening'); setSelectedCandidateId(null); }}
                                            >
                                                Shortlist for Screening
                                            </Button>
                                        )}

                                        {selectedCandidate.status === 'Screening' && (
                                            <Button
                                                variant="filled" style={{ width: '100%', marginBottom: '0.75rem' }}
                                                onClick={() => { handleStatusUpdate(selectedCandidate.id, 'Interview'); setSelectedCandidateId(null); }}
                                            >
                                                Approve for Interview
                                            </Button>
                                        )}

                                        {selectedCandidate.status === 'Interview' && (
                                            <Button
                                                variant="filled" style={{ width: '100%', marginBottom: '0.75rem', background: 'green' }}
                                                onClick={() => { handleStatusUpdate(selectedCandidate.id, 'Selected'); setSelectedCandidateId(null); }}
                                            >
                                                ✓ Select Candidate
                                            </Button>
                                        )}

                                        <Button
                                            variant="outlined" style={{ width: '100%', borderColor: 'var(--md-sys-color-error)', color: 'var(--md-sys-color-error)' }}
                                            onClick={() => { handleStatusUpdate(selectedCandidate.id, 'Rejected'); setSelectedCandidateId(null); }}
                                        >
                                            Reject Candidate
                                        </Button>
                                    </div>

                                    <div style={{ padding: '1.5rem', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Resume</h4>
                                        <a href={selectedCandidate.resumeLink} target="_blank" rel="noopener noreferrer"
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--md-sys-color-primary)', textDecoration: 'none' }}>
                                            <span>📄</span>
                                            <span style={{ textDecoration: 'underline' }}>View on Drive ↗</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {selectedJobDetail && (
                    <motion.div
                        key="job-detail-backdrop"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className={styles.modalOverlay}
                        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                        onClick={() => setSelectedJobDetail(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                            className={styles.modalContent}
                            style={{
                                maxWidth: '600px',
                                padding: '2.5rem',
                                background: 'var(--md-sys-color-surface)',
                                borderRadius: '32px',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: 'var(--md-sys-color-on-surface)' }}>Internship Details</h2>
                                    <p style={{ color: 'var(--md-sys-color-primary)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>{selectedJobDetail.title}</p>
                                </div>
                                <Button variant="glass" onClick={() => setSelectedJobDetail(null)} style={{ minWidth: '40px', padding: 0, borderRadius: '50%' }}>✕</Button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1.5rem',
                                    padding: '1.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    {[
                                        { label: 'Department', value: selectedJobDetail.department },
                                        { label: 'Location', value: selectedJobDetail.location },
                                        { label: 'Type', value: selectedJobDetail.type },
                                        { label: 'Posted On', value: selectedJobDetail.postedString }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <label style={{ fontSize: '0.7rem', color: 'var(--md-sys-color-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px', display: 'block' }}>{item.label}</label>
                                            <p style={{ fontWeight: 600, margin: 0, fontSize: '1rem', color: 'var(--md-sys-color-on-surface)' }}>{item.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        🎯 Required Skills
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {selectedJobDetail.skills && selectedJobDetail.skills.length > 0 ? (
                                            selectedJobDetail.skills.map((skill, idx) => (
                                                <span key={idx} style={{
                                                    padding: '8px 18px', borderRadius: '100px',
                                                    background: 'rgba(var(--md-sys-color-primary-rgb), 0.1)',
                                                    color: 'var(--md-sys-color-primary)',
                                                    border: '1px solid rgba(var(--md-sys-color-primary-rgb), 0.2)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 500
                                                }}>
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p style={{ color: 'var(--md-sys-color-secondary)', fontSize: '0.9rem', fontStyle: 'italic', padding: '1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '12px', width: '100%' }}>No specific skills were listed for this requirement.</p>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '12px' }}>
                                    <Button variant="outlined" onClick={() => setSelectedJobDetail(null)}>Close</Button>
                                    <Button variant="filled" onClick={() => { setSelectedJobFilter(selectedJobDetail.title); setSelectedJobDetail(null); }}>
                                        View Applicants
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Intern Post Modal */}
                <JobFormModal
                    key="job-form-modal"
                    isOpen={showJobModal}
                    onClose={() => setShowJobModal(false)}
                    onSubmit={handleJobSubmit}
                />
            </AnimatePresence>

        </main>
    );
}
