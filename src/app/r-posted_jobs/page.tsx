"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion, AnimatePresence } from "framer-motion";
import { JobFormModal, JobData } from "@/components/JobFormModal";

// --- Mock Data ---

interface Job extends JobData {
    id: string;
    postedDate: string;
    expirationDate: string;
    status: 'Active' | 'Expired';
    applicants: number;
    views: number;
    // Map existing fields for display if needed, but JobData covers most
    title: string; // Synced with position
    type: string;  // Synced with tenure
}

const INITIAL_JOBS: Job[] = [
    {
        id: '1', title: 'Senior Frontend Engineer', position: 'Senior Frontend Engineer', company: 'TechFlow Industries', location: 'Remote',
        type: 'Full-time', tenure: 'Full-time', salary: '$120k - $160k', description: 'Great role...', postedDate: '2 days ago', expirationDate: 'In 28 days', status: 'Active', applicants: 45, views: 1200
    },
    {
        id: '2', title: 'Product Designer', position: 'Product Designer', company: 'TechFlow Industries', location: 'New York, NY',
        type: 'Full-time', tenure: 'Full-time', salary: '$100k - $140k', description: 'Design things...', postedDate: '5 days ago', expirationDate: 'In 25 days', status: 'Active', applicants: 23, views: 850
    },
    {
        id: '3', title: 'Backend Developer (Go)', position: 'Backend Developer (Go)', company: 'TechFlow Industries', location: 'Remote',
        type: 'Contract', tenure: 'Contract', salary: '$80/hr', description: 'Go code...', postedDate: '1 week ago', expirationDate: 'In 20 days', status: 'Active', applicants: 12, views: 500
    },
    {
        id: '4', title: 'Marketing Intern', position: 'Marketing Intern', company: 'TechFlow Industries', location: 'San Francisco, CA',
        type: 'Internship', tenure: 'Internship', salary: '$25/hr', description: 'Internship...', postedDate: '2 months ago', expirationDate: 'Expired', status: 'Expired', applicants: 156, views: 3200
    },
    {
        id: '5', title: 'Data Scientist', position: 'Data Scientist', company: 'TechFlow Industries', location: 'Boston, MA',
        type: 'Full-time', tenure: 'Full-time', salary: '$130k - $170k', description: 'Data analysis...', postedDate: '3 months ago', expirationDate: 'Expired', status: 'Expired', applicants: 89, views: 2400
    }
];

export default function PostedJobsPage() {
    const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
    const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Expired'>('All');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    const filteredJobs = jobs.filter(job => {
        if (activeTab === 'All') return true;
        return job.status === activeTab;
    });

    // Load posted interns from localStorage on mount
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('postedInterns') || '[]');
            if (stored.length > 0) {
                const newJobs: Job[] = stored.map((item: Record<string, string | number>) => ({
                    id: item.id as string,
                    title: item.title as string || item.position as string,
                    position: item.position as string,
                    company: item.company as string,
                    location: item.location as string,
                    type: item.type as string || item.tenure as string,
                    tenure: item.tenure as string,
                    salary: item.salary as string || '',
                    description: item.description as string || '',
                    postedDate: item.postedDate as string || 'Just now',
                    expirationDate: item.expirationDate as string || 'In 30 days',
                    status: (item.status as 'Active' | 'Expired') || 'Active',
                    applicants: (item.applicants as number) || 0,
                    views: (item.views as number) || 0,
                }));
                setJobs(prev => {
                    const existingIds = new Set(prev.map(j => j.id));
                    const unique = newJobs.filter(j => !existingIds.has(j.id));
                    return [...prev, ...unique];
                });
            }
        } catch { /* ignore parse errors */ }
    }, []);

    const handleManageClick = (job: Job) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleJobSave = (data: JobData) => {
        if (!editingJob) return;

        // Update the job list
        setJobs(prev => prev.map(j => j.id === editingJob.id ? {
            ...j,
            ...data,
            title: data.position, // Keep title synced
            type: data.tenure    // Keep type synced
        } : j));

        setIsModalOpen(false);
        setEditingJob(null);
        // Optional: Add toast notification here
        alert("Intern Updated Successfully!");
    };

    const handleJobDelete = () => {
        if (!editingJob) return;
        setJobs(prev => prev.filter(j => j.id !== editingJob.id));
        setIsModalOpen(false);
        setEditingJob(null);
    };

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>

            {/* Header */}
            <header style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                <Link href="/recruiter_dashboard" style={{ textDecoration: 'none' }}>
                    <Button variant="glass" style={{ alignSelf: 'flex-start', paddingLeft: '0.75rem' }}>
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Posted Interns</h1>
                        <p style={{ color: 'var(--md-sys-color-secondary)', marginTop: '0.5rem' }}>
                            Manage your active listings and view past history.
                        </p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
                {(['All', 'Active', 'Expired'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab ? '3px solid var(--md-sys-color-primary)' : '3px solid transparent',
                            color: activeTab === tab ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-secondary)',
                            fontWeight: activeTab === tab ? 600 : 400,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            marginBottom: '-1px'
                        }}
                    >
                        {tab} ({jobs.filter(j => tab === 'All' || j.status === tab).length})
                    </button>
                ))}
            </div>

            {/* Intern Grid */}
            <motion.div
                layout
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredJobs.map(job => (
                        <motion.div
                            key={job.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GlassContainer style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{job.title}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-primary)' }}>{job.company}</p>
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem', padding: '4px 12px', borderRadius: '12px',
                                        background: job.status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                                        color: job.status === 'Active' ? 'green' : 'grey',
                                        fontWeight: 600
                                    }}>
                                        {job.status}
                                    </span>
                                </div>

                                <div style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
                                    <p>📍 {job.location}</p>
                                    <p>💼 {job.type}</p>
                                    <p>🕒 Posted {job.postedDate}</p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                                        <span title="Applicants">👥 <b>{job.applicants}</b></span>
                                        <span title="Views">👁️ <b>{job.views}</b></span>
                                    </div>
                                    <Button
                                        variant="text"
                                        style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                                        onClick={() => handleManageClick(job)}
                                    >
                                        Manage
                                    </Button>
                                </div>
                            </GlassContainer>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredJobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--md-sys-color-secondary)' }}>
                    <p>No interns found in this category.</p>
                </div>
            )}

            {/* Edit Intern Modal */}
            <JobFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleJobSave}
                initialData={editingJob || undefined}
                onDelete={handleJobDelete}
            />

        </main>
    );
}
