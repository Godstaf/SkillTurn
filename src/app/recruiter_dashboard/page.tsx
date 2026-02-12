"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { JobFormModal, JobData } from "@/components/JobFormModal";
import styles from './dashboard.module.css';
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
    resumeLink: string;
    matchScore: number; // 0-100
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
        skills: ['React', 'TypeScript', 'Node.js'], resumeLink: 'https://drive.google.com/file/d/alex_resume/view',
        matchScore: 92, appliedDate: '2 hours ago', avatarInitials: 'AJ'
    },
    {
        id: 'c2', name: 'Samantha Lee', email: 'sam.lee@example.com',
        appliedRole: 'UX Designer Intern', status: 'Screening',
        institution: 'NID Ahmedabad', program: 'B.Des', branch: 'Interaction Design',
        skills: ['Figma', 'Adobe XD', 'Prototyping'], resumeLink: 'https://drive.google.com/file/d/sam_portfolio/view',
        matchScore: 88, appliedDate: '1 day ago', avatarInitials: 'SL'
    },
    {
        id: 'c3', name: 'Michael Chen', email: 'm.chen@example.com',
        appliedRole: 'Senior Frontend Engineer', status: 'New',
        institution: 'IIIT Hyderabad', program: 'M.Tech', branch: 'Computer Science',
        skills: ['Vue.js', 'JavaScript', 'AWS'], resumeLink: 'https://drive.google.com/file/d/mike_cv/view',
        matchScore: 75, appliedDate: '3 hours ago', avatarInitials: 'MC'
    },
    {
        id: 'c4', name: 'Emily Davis', email: 'emily.d@example.com',
        appliedRole: 'Product Manager', status: 'Interview',
        institution: 'IIM Bangalore', program: 'MBA', branch: 'General Management',
        skills: ['Agile', 'JIRA', 'Roadmapping'], resumeLink: 'https://drive.google.com/file/d/emily_pm/view',
        matchScore: 95, appliedDate: '2 days ago', avatarInitials: 'ED'
    },
    {
        id: 'c5', name: 'David Wilson', email: 'david.w@example.com',
        appliedRole: 'UX Designer Intern', status: 'Rejected',
        institution: 'NIT Trichy', program: 'B.Tech', branch: 'Electrical Engineering',
        skills: ['Photoshop', 'Sketch'], resumeLink: 'https://drive.google.com/file/d/david_res/view',
        matchScore: 45, appliedDate: '4 days ago', avatarInitials: 'DW'
    },
];

import { useRouter } from 'next/navigation';

export default function RecruiterDashboardPage() {
    const router = useRouter();

    const [jobs, setJobs] = useState<JobPosition[]>(INITIAL_JOBS);
    const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'All' | 'New' | 'Screening' | 'Interview' | 'Selected'>('All');
    const [selectedJobFilter, setSelectedJobFilter] = useState<string | null>(null); // null means 'All Interns'

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

    const handleStatusUpdate = (id: string, newStatus: Candidate['status']) => {
        setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    const [showJobModal, setShowJobModal] = useState(false);

    const handleJobSubmit = (data: JobData) => {
        // Save to localStorage so r-posted_jobs and opportunities pages can read it
        const existing = JSON.parse(localStorage.getItem('postedInterns') || '[]');
        const newId = `posted-${Date.now()}`;
        const now = new Date();
        const postedDate = now.toISOString().split('T')[0];
        const deadline = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const newIntern = {
            id: newId,
            position: data.position,
            company: data.company,
            tenure: data.tenure,
            location: data.location,
            salary: data.salary,
            description: data.description,
            title: data.position,
            type: data.tenure,
            postedDate,
            expirationDate: `In 30 days`,
            status: 'Active',
            applicants: 0,
            views: 0,
            deadline,
        };

        existing.push(newIntern);
        localStorage.setItem('postedInterns', JSON.stringify(existing));

        // Also add to the local dashboard jobs list
        setJobs(prev => [...prev, {
            id: newId,
            title: data.position,
            department: data.company,
            location: data.location,
            type: data.tenure as 'Full-time' | 'Internship' | 'Contract',
            postedString: 'Just now',
            applicantsCount: 0,
            status: 'Active'
        }]);

        console.log("Intern Posted:", data);
        setShowJobModal(false);
        alert("Intern Posted Successfully!");
    };

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
                                                <span>{job.applicantsCount} Applicants</span>
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
                                            </div>

                                            {/* Metrics */}
                                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--md-sys-color-secondary)' }}>Match</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: candidate.matchScore > 80 ? 'green' : 'orange' }}>{candidate.matchScore}%</div>
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
                                            {selectedCandidate.skills.map(skill => (
                                                <span key={skill} style={{
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

                {/* Intern Post Modal */}
                <JobFormModal
                    isOpen={showJobModal}
                    onClose={() => setShowJobModal(false)}
                    onSubmit={handleJobSubmit}
                />
            </AnimatePresence>

        </main>
    );
}
