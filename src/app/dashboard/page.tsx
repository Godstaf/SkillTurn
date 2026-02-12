"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Skill {
    id: string;
    name: string;
    verified: boolean;
}

interface Project {
    id: string;
    title: string;
    description: string;
    verified: boolean;
    technologies: string[];
}

export default function DashboardPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { user } = useAuth();
    const [appliedOpportunities, setAppliedOpportunities] = useState<any[]>([]);
    const [pastOpportunities, setPastOpportunities] = useState<any[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock JSON Data simulating API response
    const mockApiResponse = {
        applied: [
            {
                id: '1',
                title: 'AI-Driven Traffic Management System',
                type: 'Project',
                organization: 'Dr. Sarah Smith (CS Dept)',
                description: 'Developing a reinforcement learning model to optimize traffic signal timings in real-time using camera feeds.',
                skills: ['Python', 'PyTorch', 'Computer Vision'],
                postedDate: '2025-11-20',
                deadline: '2025-12-15',
                status: 'Under Review',
                submittedDate: '2025-11-25'
            },
            {
                id: '4',
                title: 'Data Science Intern',
                type: 'Internship',
                organization: 'DataMinds Corp',
                description: 'Analyze large datasets to identify market trends. Proficiency in SQL and Pandas required.',
                skills: ['Python', 'SQL', 'Pandas', 'Tableau'],
                postedDate: '2025-11-22',
                deadline: '2025-12-05',
                status: 'Shortlisted',
                submittedDate: '2025-11-28'
            }
        ],
        past: [
            {
                id: '2',
                title: 'Frontend Developer Intern',
                type: 'Internship',
                organization: 'TechFlow Solutions',
                description: 'Work on our core product dashboard using React and Next.js.',
                skills: ['React', 'Next.js', 'TypeScript', 'CSS'],
                postedDate: '2025-10-15',
                deadline: '2025-11-01',
                status: 'Rejected',
                submittedDate: '2025-10-20'
            },
            {
                id: '3',
                title: 'Library Management System',
                type: 'Project',
                organization: 'Central Library',
                description: 'Build a web application to manage book issues and returns.',
                skills: ['Node.js', 'MongoDB', 'Express'],
                postedDate: '2025-09-01',
                deadline: '2025-09-15',
                status: 'Completed',
                submittedDate: '2025-09-10'
            }
        ],
        skills: [
            { id: 's1', name: 'React', verified: true },
            { id: 's2', name: 'TypeScript', verified: true },
            { id: 's3', name: 'Node.js', verified: false },
            { id: 's4', name: 'Python', verified: true },
            { id: 's5', name: 'Machine Learning', verified: false },
        ],
        projects: [
            {
                id: 'p1',
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce application with payment gateway integration.',
                verified: true,
                technologies: ['React', 'Node.js', 'Stripe']
            },
            {
                id: 'p2',
                title: 'Portfolio Website',
                description: 'Personal portfolio website to showcase skills and projects.',
                verified: false,
                technologies: ['Next.js', 'Tailwind CSS']
            }
        ]
    };

    // Simulate API Call

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set data from mock response
            setAppliedOpportunities(mockApiResponse.applied);
            setPastOpportunities(mockApiResponse.past);
            setSkills(mockApiResponse.skills);
            setProjects(mockApiResponse.projects);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <main style={{ padding: '2rem 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        border: '4px solid var(--md-sys-color-surface-variant)',
                        borderTop: '4px solid var(--md-sys-color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        `}} />
                    </div>
                    <p style={{ color: 'var(--md-sys-color-secondary)' }}>Loading your dashboard...</p>
                </div>
            </main>
        );
    }

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <ScrollReveal width="100%">
                <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* User Avatar */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary))',
                        color: 'var(--md-sys-color-on-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                        {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
                    </div>

                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                            Welcome, {user?.full_name?.split(' ')[0] || 'Student'}!
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-secondary)' }}>
                            Here's an overview of your profile and applications.
                        </p>
                    </div>
                </header>
            </ScrollReveal>

            {/* Skills & Projects Section - Full Width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>

                {/* Skills Section */}
                <ScrollReveal width="100%" delay={0.1}>
                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                                <span style={{ width: '6px', height: '24px', background: 'var(--md-sys-color-tertiary)', borderRadius: '3px' }}></span>
                                My Skills
                            </h2>
                            <Link href="/add-skill">
                                <Button variant="outlined" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>+ Add New Skill</Button>
                            </Link>
                        </div>
                        <Card variant="outlined" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {skills.map(skill => (
                                    <div
                                        key={skill.id}
                                        title={skill.verified ? "Verified by Faculty" : "Pending Verification"}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            background: skill.verified ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                            border: `1px solid ${skill.verified ? '#4CAF50' : '#FFC107'}`,
                                            color: 'var(--md-sys-color-on-surface)'
                                        }}
                                    >
                                        {skill.name}
                                        {skill.verified ? (
                                            <span style={{ color: '#4CAF50', fontSize: '1.1rem' }}>✓</span>
                                        ) : (
                                            <span style={{ color: '#FFC107', fontSize: '1.1rem' }}>●</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </section>
                </ScrollReveal>

                {/* Projects Section */}
                <ScrollReveal width="100%" delay={0.2}>
                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                                <span style={{ width: '6px', height: '24px', background: 'var(--md-sys-color-secondary)', borderRadius: '3px' }}></span>
                                My Projects
                            </h2>
                            <Link href="/add-project">
                                <Button variant="outlined" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>+ Add New Project</Button>
                            </Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                            {projects.map(project => (
                                <Card key={project.id} variant="elevated" style={{ padding: '1.5rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                                        <span
                                            title={project.verified ? "Verified Project" : "Pending Verification"}
                                            style={{
                                                fontSize: '0.8rem',
                                                padding: '4px 10px',
                                                borderRadius: '8px',
                                                fontWeight: 600,
                                                background: project.verified ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                                border: `1px solid ${project.verified ? '#4CAF50' : '#FFC107'}`,
                                                color: project.verified ? '#2E7D32' : '#F57F17'
                                            }}
                                        >
                                            {project.verified ? 'Verified' : 'Pending'}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', paddingRight: '5rem' }}>{project.title}</h3>
                                    <p style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {project.technologies.map(tech => (
                                            <span key={tech} style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-outline)', background: 'var(--md-sys-color-surface-variant)', padding: '4px 10px', borderRadius: '6px' }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            </div>

            <ScrollReveal width="100%" delay={0.3}>
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '8px', height: '32px', background: 'var(--md-sys-color-primary)', borderRadius: '4px' }}></span>
                        Active Applications
                    </h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {appliedOpportunities.map(opp => (
                            <motion.div
                                layoutId={`dashboard-${opp.id}`}
                                key={opp.id}
                                onClick={() => setSelectedId(`dashboard-${opp.id}`)}
                                style={{ cursor: 'pointer' }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <Card variant="elevated" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', pointerEvents: 'none' }}>
                                    <div>
                                        <motion.h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{opp.title}</motion.h3>
                                        <motion.p style={{ color: 'var(--md-sys-color-secondary)' }}>{opp.organization}</motion.p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--md-sys-color-secondary)' }}>Status</span>
                                            <span style={{ fontWeight: 600, color: opp.status === 'Shortlisted' ? '#4CAF50' : 'var(--md-sys-color-primary)' }}>{opp.status}</span>
                                        </div>
                                        <Button variant="glass" style={{ pointerEvents: 'auto' }}>View Status</Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.4}>
                <section>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '8px', height: '32px', background: 'var(--md-sys-color-secondary)', borderRadius: '4px' }}></span>
                        Past Opportunities
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {pastOpportunities.map(opp => (
                            <motion.div
                                layoutId={`past-${opp.id}`}
                                key={opp.id}
                                onClick={() => setSelectedId(`past-${opp.id}`)}
                                style={{ cursor: 'pointer', height: '100%' }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card variant="elevated" style={{ height: '100%', pointerEvents: 'none', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{
                                        position: 'absolute', top: 0, right: 0, padding: '4px 12px',
                                        background: opp.status === 'Completed' ? '#E8F5E9' : '#FFEBEE',
                                        color: opp.status === 'Completed' ? '#2E7D32' : '#C62828',
                                        borderBottomLeftRadius: '12px', fontSize: '0.8rem', fontWeight: 600
                                    }}>
                                        {opp.status}
                                    </div>
                                    <motion.h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', paddingRight: '2rem' }}>{opp.title}</motion.h3>
                                    <motion.p style={{ color: 'var(--md-sys-color-secondary)', marginBottom: '1rem' }}>{opp.organization}</motion.p>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                        <Button variant="glass" style={{ pointerEvents: 'auto', width: '100%' }}>View Details</Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 40
                            }}
                        />
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50,
                            pointerEvents: 'none'
                        }}>
                            {/* Find the opportunity from either list */}
                            {[...appliedOpportunities, ...pastOpportunities].filter(item =>
                                `dashboard-${item.id}` === selectedId || `past-${item.id}` === selectedId
                            ).map(opp => (
                                <motion.div
                                    layoutId={selectedId}
                                    key={opp.id}
                                    style={{
                                        width: '90%',
                                        maxWidth: '700px',
                                        maxHeight: '85vh',
                                        overflowY: 'auto',
                                        background: 'var(--md-sys-color-surface)',
                                        borderRadius: '24px',
                                        padding: '2rem',
                                        pointerEvents: 'auto',
                                        position: 'relative',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    }}
                                >
                                    <Button
                                        variant="glass"
                                        onClick={() => setSelectedId(null)}
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            minWidth: 'auto',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px'
                                        }}
                                    >
                                        ✕
                                    </Button>

                                    <span style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        borderRadius: '16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        backgroundColor: opp.type === 'Internship' ? 'var(--md-sys-color-tertiary-container)' : 'var(--md-sys-color-primary-container)',
                                        color: opp.type === 'Internship' ? 'var(--md-sys-color-on-tertiary-container)' : 'var(--md-sys-color-on-primary-container)',
                                        marginBottom: '1rem'
                                    }}>
                                        {opp.type}
                                    </span>

                                    <motion.h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--md-sys-color-on-surface)' }}>{opp.title}</motion.h2>
                                    <motion.p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '2rem', fontWeight: 500 }}>
                                        {opp.organization}
                                    </motion.p>

                                    {/* Status Section for Applied Opps */}
                                    {selectedId.startsWith('dashboard') && (
                                        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--md-sys-color-surface-variant)', borderRadius: '12px' }}>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Application Status</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: opp.status === 'Shortlisted' ? '#4CAF50' : 'var(--md-sys-color-primary)' }}></div>
                                                <span style={{ fontWeight: 600, color: opp.status === 'Shortlisted' ? '#4CAF50' : 'inherit' }}>{opp.status}</span>
                                                <span style={{ color: 'var(--md-sys-color-secondary)', fontSize: '0.9rem' }}>- Submitted on {new Date(opp.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Status Section for Past Opps */}
                                    {selectedId.startsWith('past') && (
                                        <div style={{ marginBottom: '2rem', padding: '1rem', background: opp.status === 'Completed' ? '#E8F5E9' : '#FFEBEE', borderRadius: '12px' }}>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Outcome</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ fontWeight: 600, color: opp.status === 'Completed' ? '#2E7D32' : '#C62828' }}>{opp.status}</span>
                                                <span style={{ color: 'var(--md-sys-color-secondary)', fontSize: '0.9rem' }}>- Closed on {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    )}

                                    <motion.div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Description</h3>
                                        <p style={{ lineHeight: 1.7, color: 'var(--md-sys-color-on-surface-variant)' }}>
                                            {opp.description}
                                        </p>
                                    </motion.div>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Required Skills</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {opp.skills.map((skill: string) => (
                                                <span key={skill} style={{
                                                    fontSize: '0.9rem',
                                                    padding: '4px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid var(--md-sys-color-outline, #79747E)',
                                                    color: 'var(--md-sys-color-on-surface-variant)'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
