"use client";

import { Button } from "@/components/ui/Button";
import { GlassContainer } from "@/components/ui/GlassContainer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// --- Mock Data ---

interface Internship {
    company: string;
    role: string;
    duration: string;
}

interface StudentProfile {
    id: string;
    name: string;
    college: string;
    branch: string; // Department
    year: string;
    cgpa: number;
    skills: string[];
    email: string;
    phone: string;
    location: string;
    bio: string;
    linkedIn?: string;
    github?: string;
    avatarInitials: string;
    internships?: Internship[];
}

const COLLEGES = [
    "IIIT Pune",
    "COEP",
    "PICT",
    "VIT Pune"
];

const BRANCHES = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Telecommunication",
    "Mechanical Engineering",
    "Civil Engineering"
];

const YEARS = ["First Year", "Second Year", "Third Year", "Final Year"];


const SKILLS_BY_BRANCH: Record<string, string[]> = {
    "Computer Engineering": ["React", "Node.js", "Python", "Java", "C++", "Machine Learning", "Cloud Computing", "AWS", "Docker"],
    "Information Technology": ["Java", "Spring Boot", "SQL", "Cloud Computing", "AWS", "Web Development", "Data Science"],
    "Electronics & Telecommunication": ["Embedded C", "IoT", "Arduino", "VLSI", "MATLAB", "Signal Processing"],
    "Mechanical Engineering": ["AutoCAD", "SolidWorks", "Thermodynamics", "Ansys", "Manufacturing"],
    "Civil Engineering": ["AutoCAD", "Structural Analysis", "Revit", "Staad Pro", "Surveying"],
};

const MOCK_STUDENTS: StudentProfile[] = [
    {
        id: '1', name: 'Aarav Patel', college: 'IIIT Pune', branch: 'Computer Engineering', year: 'Third Year',
        cgpa: 9.2, skills: ['React', 'Node.js', 'Python'], email: 'aarav.p@example.com', phone: '+91 98765 43210',
        location: 'Pune, India', bio: 'Passionate full-stack developer looking for internship opportunities.',
        avatarInitials: 'AP',
        internships: [
            { company: 'Google', role: 'SWE Intern', duration: 'May 2025 – Jul 2025' },
            { company: 'Flipkart', role: 'Frontend Intern', duration: 'Dec 2024 – Feb 2025' }
        ]
    },
    {
        id: '2', name: 'Ishita Sharma', college: 'COEP', branch: 'Information Technology', year: 'Final Year',
        cgpa: 8.9, skills: ['Java', 'Spring Boot', 'SQL'], email: 'ishita.s@example.com', phone: '+91 98765 43211',
        location: 'Mumbai, India', bio: 'Aspiring software engineer with a strong foundation in backend systems.',
        avatarInitials: 'IS',
        internships: [
            { company: 'Infosys', role: 'Backend Developer Intern', duration: 'Jun 2025 – Aug 2025' }
        ]
    },
    {
        id: '3', name: 'Rohan Gupta', college: 'PICT', branch: 'Electronics & Telecommunication', year: 'Third Year',
        cgpa: 7.8, skills: ['Embedded C', 'IoT', 'Arduino'], email: 'rohan.g@example.com', phone: '+91 98765 43212',
        location: 'Bangalore, India', bio: 'IoT enthusiast working on smart home automation projects.',
        avatarInitials: 'RG',
        internships: [
            { company: 'Bosch', role: 'Embedded Systems Intern', duration: 'Jan 2025 – Mar 2025' }
        ]
    },
    {
        id: '4', name: 'Meera Singh', college: 'IIIT Pune', branch: 'Computer Engineering', year: 'Second Year',
        cgpa: 8.5, skills: ['C++', 'Data Structures', 'Algorithms'], email: 'meera.s@example.com', phone: '+91 98765 43213',
        location: 'Pune, India', bio: 'Competitive programmer and algorithm lover.',
        avatarInitials: 'MS'
    },
    {
        id: '5', name: 'Vikram Malhotra', college: 'VIT Pune', branch: 'Mechanical Engineering', year: 'Final Year',
        cgpa: 7.2, skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics'], email: 'vikram.m@example.com', phone: '+91 98765 43214',
        location: 'Delhi, India', bio: 'Mechanical engineer interested in automotive design.',
        avatarInitials: 'VM',
        internships: [
            { company: 'Tata Motors', role: 'Design Engineering Intern', duration: 'Jun 2025 – Aug 2025' },
            { company: 'Mahindra & Mahindra', role: 'Manufacturing Intern', duration: 'Dec 2024 – Jan 2025' }
        ]
    },
    {
        id: '6', name: 'Ananya Desai', college: 'COEP', branch: 'Information Technology', year: 'Third Year',
        cgpa: 9.5, skills: ['Machine Learning', 'Python', 'TensorFlow'], email: 'ananya.d@example.com', phone: '+91 98765 43215',
        location: 'Hyderabad, India', bio: 'AI/ML researcher working on NLP projects.',
        avatarInitials: 'AD',
        internships: [
            { company: 'Microsoft Research', role: 'ML Research Intern', duration: 'May 2025 – Jul 2025' }
        ]
    },
    {
        id: '7', name: 'Kabir Joshi', college: 'PICT', branch: 'Civil Engineering', year: 'Second Year',
        cgpa: 6.8, skills: ['AutoCAD', 'Structural Analysis'], email: 'kabir.j@example.com', phone: '+91 98765 43216',
        location: 'Chennai, India', bio: 'Future civil engineer.',
        avatarInitials: 'KJ'
    },
    {
        id: '8', name: 'Sana Khan', college: 'IIIT Pune', branch: 'Computer Engineering', year: 'Final Year',
        cgpa: 9.8, skills: ['Cloud Computing', 'AWS', 'Docker'], email: 'sana.k@example.com', phone: '+91 98765 43217',
        location: 'Pune, India', bio: 'Cloud native developer.',
        avatarInitials: 'SK',
        internships: [
            { company: 'Amazon Web Services', role: 'Cloud Engineering Intern', duration: 'Jun 2025 – Sep 2025' },
            { company: 'Razorpay', role: 'DevOps Intern', duration: 'Jan 2025 – Mar 2025' }
        ]
    }
];


export default function StudentProfilesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const collegeParam = searchParams.get('college');

    const [students] = useState<StudentProfile[]>(MOCK_STUDENTS);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    // Filters State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollege, setSelectedCollege] = useState<string>(collegeParam || 'All');
    const [selectedBranch, setSelectedBranch] = useState<string>('All');
    const [selectedYear, setSelectedYear] = useState<string>('All');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [minCGPA, setMinCGPA] = useState<number>(0);

    // Dynamic Skill Options State
    const [skillOptions, setSkillOptions] = useState<string[]>([]);

    // Update skill options when branch changes
    useEffect(() => {
        if (selectedBranch === 'All') {
            const allSkills = Array.from(new Set(Object.values(SKILLS_BY_BRANCH).flat()));
            setSkillOptions(allSkills.sort());
        } else {
            setSkillOptions(SKILLS_BY_BRANCH[selectedBranch] || []);
        }
        // When branch changes, we might want to keep relevant selected skills or clear them. 
        // For now, let's remove skills that are no longer valid options, or just keep them? 
        // Let's keep them if they exist in the new branch (or all), otherwise remove.

        // Actually simpler: clear skills if branch changes to avoid confusion, 
        // OR filter `selectedSkills` to only those valid in new scope.
        // Let's clear for simplicity to match previous behavior of reset.
        setSelectedSkills([]);
    }, [selectedBranch]);

    const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value && value !== 'Select Skill' && !selectedSkills.includes(value)) {
            setSelectedSkills([...selectedSkills, value]);
        }
        // Reset select to default
        e.target.value = 'Select Skill';
    };

    const removeSkill = (skillToRemove: string) => {
        setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
    };

    // Derived Data
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCollege = selectedCollege === 'All' || student.college === selectedCollege;
        const matchesBranch = selectedBranch === 'All' || student.branch === selectedBranch;
        const matchesYear = selectedYear === 'All' || student.year === selectedYear;

        // AND Logic: Student must have ALL selected skills
        const matchesSkills = selectedSkills.length === 0 || selectedSkills.every(s => student.skills.includes(s));

        const matchesCGPA = student.cgpa >= minCGPA;

        return matchesSearch && matchesCollege && matchesBranch && matchesYear && matchesSkills && matchesCGPA;
    });

    const selectedStudent = students.find(s => s.id === selectedStudentId);

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>

            {/* Header */}
            <ScrollReveal width="100%">
                <header style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, lineHeight: 1.2 }}>Student Profiles</h1>
                            <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-secondary)', marginTop: '0.5rem' }}>
                                Explore talents across colleges and disciplines.
                            </p>
                        </div>
                        <Button variant="glass" onClick={() => router.back()}>← Back</Button>
                    </div>
                </header>
            </ScrollReveal>

            {/* Faculty College Filter Banner */}
            {collegeParam && (
                <ScrollReveal width="100%" delay={0.05}>
                    <div style={{
                        marginBottom: '1.5rem',
                        padding: '12px 20px',
                        borderRadius: '16px',
                        background: 'var(--md-sys-color-primary-container)',
                        color: 'var(--md-sys-color-on-primary-container)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.1rem' }}>🏛️</span>
                            <span style={{ fontWeight: 600 }}>
                                Showing students from <strong>{collegeParam}</strong>
                            </span>
                        </div>
                        <Button variant="outlined" onClick={() => {
                            setSelectedCollege('All');
                            router.replace('/studentProfiles');
                        }} style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
                            Show All Colleges
                        </Button>
                    </div>
                </ScrollReveal>
            )}

            {/* Filter Bar */}
            <ScrollReveal width="100%" delay={0.1}>
                <section style={{
                    marginBottom: '2rem',
                    padding: '1.5rem',
                    background: 'var(--md-sys-color-surface)', // Changed from glass for better light mode consistency
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)' // Subtle shadow for depth
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'end' }}>
                        {/* Search */}
                        <div style={{ flex: '1 1 300px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--md-sys-color-secondary)' }}>Search</label>
                            <input
                                type="text"
                                placeholder="Search by Name or Skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)', color: 'var(--md-sys-color-on-surface)', outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--md-sys-color-outline)'}
                            />
                        </div>

                        {/* College Filter */}
                        <div style={{ flex: '1 1 200px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--md-sys-color-secondary)' }}>College</label>
                            <select
                                value={selectedCollege}
                                onChange={(e) => setSelectedCollege(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)', color: 'var(--md-sys-color-on-surface)', outline: 'none'
                                }}
                            >
                                <option value="All" style={{ color: 'black' }}>All Colleges</option>
                                {COLLEGES.map(c => <option key={c} value={c} style={{ color: 'black' }}>{c}</option>)}
                            </select>
                        </div>

                        {/* Branch Filter */}
                        <div style={{ flex: '1 1 200px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--md-sys-color-secondary)' }}>Branch</label>
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)', color: 'var(--md-sys-color-on-surface)', outline: 'none'
                                }}
                            >
                                <option value="All" style={{ color: 'black' }}>All Branches</option>
                                {BRANCHES.map(b => <option key={b} value={b} style={{ color: 'black' }}>{b}</option>)}
                            </select>
                        </div>

                        {/* Dynamic Skill Filter (Multi-Select style) */}
                        <div style={{ flex: '1 1 180px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--md-sys-color-secondary)' }}>
                                Add Skills {selectedBranch !== 'All' ? `(${skillOptions.length} available)` : '(All)'}
                            </label>
                            <select
                                onChange={handleSkillChange}
                                disabled={skillOptions.length === 0}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)', color: 'var(--md-sys-color-on-surface)', outline: 'none',
                                    opacity: skillOptions.length === 0 ? 0.6 : 1
                                }}
                                defaultValue="Select Skill"
                            >
                                <option value="Select Skill" disabled style={{ color: 'black' }}>Select to Add Skill</option>
                                {skillOptions.map(skill => (
                                    <option
                                        key={skill}
                                        value={skill}
                                        disabled={selectedSkills.includes(skill)} // Disable if already selected
                                        style={{ color: 'black' }}
                                    >
                                        {skill} {selectedSkills.includes(skill) ? '(Added)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div style={{ flex: '0 1 120px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--md-sys-color-secondary)' }}>Year</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)', color: 'var(--md-sys-color-on-surface)', outline: 'none'
                                }}
                            >
                                <option value="All" style={{ color: 'black' }}>All</option>
                                {YEARS.map(y => <option key={y} value={y} style={{ color: 'black' }}>{y}</option>)}
                            </select>
                        </div>

                        {/* CGPA Filter */}
                        <div style={{ flex: '0 1 150px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--md-sys-color-secondary)' }}>Min CGPA: {minCGPA}</label>
                            <input
                                type="range"
                                min="0" max="10" step="0.5"
                                value={minCGPA}
                                onChange={(e) => setMinCGPA(parseFloat(e.target.value))}
                                style={{ width: '100%', cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    {/* Active Filters Display & Selected Skills Chips */}
                    {(selectedBranch !== 'All' || selectedSkills.length > 0 || selectedCollege !== 'All' || selectedYear !== 'All' || searchQuery) && (
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-secondary)', marginRight: '0.5rem' }}>Active Filters:</span>

                            {selectedBranch !== 'All' && <span style={filterBadgeStyle}>{selectedBranch}</span>}
                            {selectedCollege !== 'All' && <span style={filterBadgeStyle}>{selectedCollege}</span>}
                            {selectedYear !== 'All' && <span style={filterBadgeStyle}>Year: {selectedYear}</span>}

                            {/* Render Selected Skills as Removable Chips */}
                            {selectedSkills.map(skill => (
                                <span key={skill} style={{
                                    ...filterBadgeStyle,
                                    background: 'var(--md-sys-color-primary-container)',
                                    color: 'var(--md-sys-color-on-primary-container)',
                                    display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '8px'
                                }}>
                                    {skill}
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 'bold', fontSize: '1rem', lineHeight: 1, padding: 0 }}
                                    >×</button>
                                </span>
                            ))}

                        </div>
                    )}

                </section>
            </ScrollReveal>

            {/* Results Grid */}
            <ScrollReveal width="100%" delay={0.2}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', paddingBottom: '4rem' }}>

                    {filteredStudents.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--md-sys-color-secondary)' }}>
                            <p style={{ fontSize: '1.2rem' }}>No profiles found matching criteria.</p>
                            <Button variant="outlined" style={{ marginTop: '1rem' }} onClick={() => {
                                setSelectedBranch('All'); setSelectedSkills([]); setSelectedCollege('All'); setSelectedYear('All'); setSearchQuery('');
                            }}>Clear All Filters</Button>
                        </div>
                    ) : (
                        filteredStudents.map(student => (
                            <motion.div
                                key={student.id}
                                layoutId={`profile-${student.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                onClick={() => setSelectedStudentId(student.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <GlassContainer style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--md-sys-color-surface-container-low)' }}>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{
                                                width: '56px', height: '56px', borderRadius: '50%',
                                                background: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold'
                                            }}>
                                                {student.avatarInitials}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>{student.name}</h3>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-primary)' }}>{student.year} • {student.branch}</p>
                                            </div>
                                        </div>
                                        <div style={{ background: 'var(--md-sys-color-surface-variant)', padding: '4px 8px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                                            CGPA {student.cgpa}
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: '1.5', flex: 1 }}>
                                        {student.bio}
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {student.skills.slice(0, 3).map(skill => (
                                            <span key={skill} style={{
                                                fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px',
                                                background: 'var(--md-sys-color-secondary-container)', color: 'var(--md-sys-color-on-secondary-container)'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                        {student.skills.length > 3 && (
                                            <span style={{ fontSize: '0.75rem', padding: '4px 8px', color: 'var(--md-sys-color-secondary)' }}>+{student.skills.length - 3}</span>
                                        )}
                                    </div>

                                    {/* Internship Badges */}
                                    {student.internships && student.internships.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {student.internships.map((intern, idx) => (
                                                <span key={idx} style={{
                                                    fontSize: '0.7rem', padding: '3px 9px', borderRadius: '10px',
                                                    background: 'var(--md-sys-color-tertiary-container)',
                                                    color: 'var(--md-sys-color-on-tertiary-container)',
                                                    fontWeight: 600
                                                }}>
                                                    🏢 {intern.company}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-secondary)', borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '0.75rem' }}>
                                        🏛️ {student.college.split(' ')[0]}...
                                    </div>

                                </GlassContainer>
                            </motion.div>
                        ))
                    )}
                </div>
            </ScrollReveal>

            {/* Profile Detail Modal */}
            <AnimatePresence>
                {selectedStudentId && selectedStudent && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStudentId(null)}
                            style={{
                                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 40
                            }}
                        />
                        <div style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 50, pointerEvents: 'none'
                        }}>
                            <motion.div
                                layoutId={`profile-${selectedStudentId}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{
                                    width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto',
                                    background: 'var(--md-sys-color-surface)', borderRadius: '24px', padding: '0',
                                    pointerEvents: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                }}
                            >
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                            <div style={{
                                                width: '100px', height: '100px', borderRadius: '50%',
                                                background: 'var(--md-sys-color-tertiary-container)', color: 'var(--md-sys-color-on-tertiary-container)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold'
                                            }}>
                                                {selectedStudent.avatarInitials}
                                            </div>
                                            <div>
                                                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1 }}>{selectedStudent.name}</h2>
                                                <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-primary)', margin: '0.25rem 0' }}>{selectedStudent.branch}</p>
                                                <p style={{ color: 'var(--md-sys-color-secondary)' }}>{selectedStudent.college}</p>
                                            </div>
                                        </div>
                                        <Button variant="glass" onClick={() => setSelectedStudentId(null)} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>✕</Button>
                                    </div>

                                    <div style={{ display: 'grid', gap: '2rem' }}>

                                        {/* Bio */}
                                        <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1.5rem', borderRadius: '16px' }}>
                                            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{selectedStudent.bio}</p>
                                        </div>

                                        {/* Skills */}
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--md-sys-color-secondary)' }}>SKILLS</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {selectedStudent.skills.map(skill => (
                                                    <span key={skill} style={{
                                                        padding: '8px 16px', borderRadius: '20px',
                                                        border: '1px solid var(--md-sys-color-outline)',
                                                        fontSize: '0.95rem'
                                                    }}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Internship Experience */}
                                        {selectedStudent.internships && selectedStudent.internships.length > 0 && (
                                            <div>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--md-sys-color-secondary)' }}>INTERNSHIP EXPERIENCE</h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                    {selectedStudent.internships.map((intern, idx) => (
                                                        <div key={idx} style={{
                                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                            padding: '1rem 1.25rem', borderRadius: '16px',
                                                            background: 'var(--md-sys-color-tertiary-container)',
                                                            color: 'var(--md-sys-color-on-tertiary-container)'
                                                        }}>
                                                            <div>
                                                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>🏢 {intern.company}</div>
                                                                <div style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: '2px' }}>{intern.role}</div>
                                                            </div>
                                                            <div style={{ fontSize: '0.8rem', opacity: 0.7, whiteSpace: 'nowrap' }}>{intern.duration}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Details Grid */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--md-sys-color-secondary)', textTransform: 'uppercase' }}>Academic</h3>
                                                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                                                    <div><span style={{ fontWeight: 600 }}>Year:</span> {selectedStudent.year}</div>
                                                    <div><span style={{ fontWeight: 600 }}>CGPA:</span> {selectedStudent.cgpa}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--md-sys-color-secondary)', textTransform: 'uppercase' }}>Contact</h3>
                                                <div style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
                                                    <div>{selectedStudent.email}</div>
                                                    <div>{selectedStudent.phone}</div>
                                                    <div>{selectedStudent.location}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <Button variant="filled" style={{ flex: 1 }}>Send Message</Button>
                                            <Button variant="outlined" style={{ flex: 1 }}>View Resume</Button>
                                        </div>

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

const filterBadgeStyle = {
    padding: '4px 12px',
    background: 'var(--md-sys-color-secondary-container)',
    color: 'var(--md-sys-color-on-secondary-container)',
    borderRadius: '16px',
    fontSize: '0.8rem',
    fontWeight: 600
};
