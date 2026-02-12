"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Student } from "@/context/AuthContext";

// Extended type for Dashboard purposes (Student + Application Request Info)
interface StudentApplication extends Student {
  studentId?: string; // Mapped from backend ID

  requestId: string;
  category: 'Internship' | 'Project' | 'Skills';
  shortDescription: string;
  detailedDescription: string;
  documents: string[];
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';

  // Specific to Internship category
  internshipDomain?: string;
  companyName?: string;
  duration?: string;

  // Specific to Project category
  projectTitle?: string;
  projectDomain?: string;
  teamSize?: number;

  // Specific to Skills category
  skillName?: string;
  proficiencyLevel?: string;
  certificationUrl?: string;
}

// Removed mock data

export default function FacultyDashboardPage() {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [approvalFilter, setApprovalFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Fetch Data
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const res = await fetch('http://127.0.0.1:8000/faculty/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Map backend ID to studentId and requestId to ID for uniqueness
          const mapped = data.map((item: any) => ({
            ...item,
            id: item.requestId,
            studentId: item.id
          }));
          setApplications(mapped);
        }
      } catch (e) {
        console.error("Failed to fetch dashboard", e);
      }
    };
    fetchDashboard();
  }, [router]);

  const totalApplications = applications.length;
  const pendingApprovals = applications.filter(s => s.approvalStatus === 'Pending').length;
  const approvedCount = applications.filter(s => s.approvalStatus === 'Approved').length;

  const filteredDirectory = applications.filter(s =>
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedApplications = showAllStudents ? filteredDirectory : filteredDirectory.slice(0, 6);

  const handleApproval = async (id: string, status: 'Approved' | 'Rejected') => {
    const app = applications.find(s => s.id === id);
    if (!app || !app.studentId) return;

    const token = localStorage.getItem('token');
    const endpoint = app.category === 'Skills'
      ? `http://127.0.0.1:8000/faculty/verify/skill/${app.studentId}/${app.requestId}`
      : `http://127.0.0.1:8000/faculty/verify/project/${app.studentId}/${app.requestId}`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: new URLSearchParams({ status }) // Endpoint expects query param 'status', wait. 
        // My backend defined: verify_skill(..., status: str, ...)
        // FastAPI defaults query params for simple types. 
        // So URL should be endpoint + `?status=${status}`.
      });
      // Actually, let's fix the fetch call to append query param.
      const res2 = await fetch(`${endpoint}?status=${status}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res2.ok) {
        setApplications(prev => prev.map(s => s.id === id ? { ...s, approvalStatus: status } : s));
      }
    } catch (e) {
      console.error("Verification failed", e);
    }
  };

  const selectedApp = applications.find(s => s.id === selectedAppId);

  return (
    <main style={{ padding: '2rem 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <ScrollReveal width="100%">
        <header style={{
          marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem'
        }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Faculty Dashboard</h2>
            <p style={{ fontSize: '1.0rem', color: 'var(--md-sys-color-secondary)' }}>
              Verify student internships, projects, and skills.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>

            <Button variant="outlined" onClick={() => router.push('/facultyprofile')}>My Profile</Button>
          </div>
        </header>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal width="100%" delay={0.1}>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <Card variant="elevated">
            <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Total Requests</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>{totalApplications}</div>
          </Card>
          <Card variant="elevated">
            <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Pending</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--md-sys-color-error)' }}>{pendingApprovals}</div>
          </Card>
          <Card variant="elevated">
            <h3 style={{ fontSize: '1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '0.5rem' }}>Approved</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--md-sys-color-primary)' }}>{approvedCount}</div>
          </Card>
        </section>
      </ScrollReveal>

      {/* Approval Section */}
      <ScrollReveal width="100%" delay={0.2}>
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '32px', background: 'var(--md-sys-color-tertiary)', borderRadius: '4px' }}></span>
            Approvals
          </h2>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {(['Pending', 'Approved', 'Rejected'] as const).map(status => (
              <Button
                key={status}
                variant={approvalFilter === status ? 'filled' : 'outlined'}
                onClick={() => setApprovalFilter(status)}
                style={{ borderRadius: '20px' }}
              >
                {status} ({applications.filter(a => a.approvalStatus === status).length})
              </Button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {applications.filter(s => s.approvalStatus === approvalFilter).map(app => (
              <motion.div layoutId={`app-${app.id}`} key={app.id}>
                <GlassContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{app.full_name}</h3>
                      <span style={{
                        fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 600,
                        background: 'rgba(0,0,0,0.05)'
                      }}>
                        {app.category}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{app.shortDescription}</p>
                    <p style={{ color: 'var(--md-sys-color-secondary)', fontSize: '0.8rem' }}>{app.rollNumber} • {app.branch} • Year {app.yearsOfStudy}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {app.approvalStatus === 'Pending' && (
                      <>
                        <Button variant="outlined" onClick={() => handleApproval(app.id, 'Rejected')}>Reject</Button>
                        <Button variant="filled" onClick={() => handleApproval(app.id, 'Approved')}>Approve</Button>
                      </>
                    )}
                    <Button variant="glass" onClick={() => setSelectedAppId(app.id)}>Details</Button>
                  </div>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Modal */}
      <AnimatePresence>
        {selectedAppId && selectedApp && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedAppId(null)}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 40 }}
            />
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, pointerEvents: 'none' }}>
              <motion.div
                layoutId={selectedAppId}
                style={{ width: '90%', maxWidth: '600px', background: 'var(--md-sys-color-surface)', borderRadius: '24px', padding: '2rem', pointerEvents: 'auto', maxHeight: '85vh', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedApp.full_name}</h2>
                    <p style={{ color: 'var(--md-sys-color-secondary)' }}>{selectedApp.rollNumber} • {selectedApp.branch}</p>
                    <p style={{ color: 'var(--md-sys-color-secondary)', fontSize: '0.9rem' }}>{selectedApp.collegeName} • {selectedApp.degree}</p>
                  </div>
                  <Button variant="glass" onClick={() => setSelectedAppId(null)} style={{ height: 'fit-content' }}>✕</Button>
                </div>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Request Details</h3>
                  <p><strong>Category:</strong> {selectedApp.category}</p>
                  <p><strong>Description:</strong> {selectedApp.detailedDescription}</p>

                  {/* Internship-specific fields */}
                  {selectedApp.internshipDomain && <p><strong>Domain:</strong> {selectedApp.internshipDomain}</p>}
                  {selectedApp.companyName && <p><strong>Company:</strong> {selectedApp.companyName}</p>}
                  {selectedApp.duration && <p><strong>Duration:</strong> {selectedApp.duration}</p>}

                  {/* Project-specific fields */}
                  {selectedApp.projectTitle && <p><strong>Project Title:</strong> {selectedApp.projectTitle}</p>}
                  {selectedApp.projectDomain && <p><strong>Project Domain:</strong> {selectedApp.projectDomain}</p>}
                  {selectedApp.teamSize && <p><strong>Team Size:</strong> {selectedApp.teamSize}</p>}

                  {/* Skills-specific fields */}
                  {selectedApp.skillName && <p><strong>Skill:</strong> {selectedApp.skillName}</p>}
                  {selectedApp.proficiencyLevel && <p><strong>Proficiency:</strong> {selectedApp.proficiencyLevel}</p>}
                  {selectedApp.certificationUrl && (
                    <p><strong>Certification:</strong>{' '}
                      <a href={selectedApp.certificationUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: 'var(--md-sys-color-primary)', textDecoration: 'underline' }}>
                        View Certificate ↗
                      </a>
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Contact</h3>
                  <p>Email: {selectedApp.collegeEmail}</p>
                  <p>Personal Email: {selectedApp.email}</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Documents</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedApp.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px 12px',
                          background: 'var(--md-sys-color-secondary-container)',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          color: 'var(--md-sys-color-on-secondary-container)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        📁 <span style={{ textDecoration: 'underline' }}>Drive Document {i + 1}</span> ↗
                      </a>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
