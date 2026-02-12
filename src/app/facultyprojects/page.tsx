"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FormInput } from "@/components/ui/FormInput";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FacultyProject, INITIAL_PROJECTS } from "@/data/faculty_projects";

// --- Student Profile Data (for clickable team members) ---
interface StudentProfile {
    name: string;
    college: string;
    branch: string;
    year: string;
    cgpa: number;
    skills: string[];
    email: string;
    phone: string;
    location: string;
    bio: string;
    avatarInitials: string;
}

const STUDENT_PROFILES: Record<string, StudentProfile> = {
    "Aarav Patel": {
        name: "Aarav Patel", college: "TechFlow Institute of Technology", branch: "Computer Engineering", year: "TE",
        cgpa: 9.2, skills: ["React", "Node.js", "Python"], email: "aarav.p@example.com", phone: "+91 98765 43210",
        location: "Pune, India", bio: "Passionate full-stack developer looking for internship opportunities.", avatarInitials: "AP"
    },
    "Ishita Sharma": {
        name: "Ishita Sharma", college: "Global Engineering College", branch: "Information Technology", year: "BE",
        cgpa: 8.9, skills: ["Java", "Spring Boot", "SQL"], email: "ishita.s@example.com", phone: "+91 98765 43211",
        location: "Mumbai, India", bio: "Aspiring software engineer with a strong foundation in backend systems.", avatarInitials: "IS"
    },
    "Rohan Gupta": {
        name: "Rohan Gupta", college: "City University", branch: "Electronics & Telecommunication", year: "TE",
        cgpa: 7.8, skills: ["Embedded C", "IoT", "Arduino"], email: "rohan.g@example.com", phone: "+91 98765 43212",
        location: "Bangalore, India", bio: "IoT enthusiast working on smart home automation projects.", avatarInitials: "RG"
    },
    "Sneha Kulkarni": {
        name: "Sneha Kulkarni", college: "TechFlow Institute of Technology", branch: "Computer Engineering", year: "SE",
        cgpa: 8.7, skills: ["Python", "TensorFlow", "NLP"], email: "sneha.k@example.com", phone: "+91 98765 43218",
        location: "Pune, India", bio: "ML enthusiast focused on NLP and deep learning applications.", avatarInitials: "SK"
    },
    "Priya Deshmukh": {
        name: "Priya Deshmukh", college: "TechFlow Institute of Technology", branch: "Computer Engineering", year: "TE",
        cgpa: 9.0, skills: ["React", "MongoDB", "TypeScript"], email: "priya.d@example.com", phone: "+91 98765 43219",
        location: "Pune, India", bio: "Frontend specialist with an eye for design and user experience.", avatarInitials: "PD"
    },
    "Arjun Mehta": {
        name: "Arjun Mehta", college: "Global Engineering College", branch: "Electronics & Telecommunication", year: "BE",
        cgpa: 8.3, skills: ["Arduino", "MQTT", "Embedded C"], email: "arjun.m@example.com", phone: "+91 98765 43220",
        location: "Mumbai, India", bio: "Hardware hacker and IoT prototype builder.", avatarInitials: "AM"
    },
    "Kavya Nair": {
        name: "Kavya Nair", college: "City University", branch: "Information Technology", year: "TE",
        cgpa: 8.6, skills: ["Node.js", "Express", "PostgreSQL"], email: "kavya.n@example.com", phone: "+91 98765 43221",
        location: "Chennai, India", bio: "Backend developer who loves building scalable APIs.", avatarInitials: "KN"
    },
    "Vikram Joshi": {
        name: "Vikram Joshi", college: "State Technical Institute", branch: "Computer Engineering", year: "BE",
        cgpa: 7.9, skills: ["DevOps", "Docker", "AWS"], email: "vikram.j@example.com", phone: "+91 98765 43222",
        location: "Delhi, India", bio: "Infrastructure and cloud computing enthusiast.", avatarInitials: "VJ"
    },
    "Meera Iyer": {
        name: "Meera Iyer", college: "TechFlow Institute of Technology", branch: "Information Technology", year: "SE",
        cgpa: 9.1, skills: ["Data Science", "Python", "Pandas"], email: "meera.i@example.com", phone: "+91 98765 43223",
        location: "Pune, India", bio: "Data scientist passionate about deriving insights from data.", avatarInitials: "MI"
    },
    "Rahul Patil": {
        name: "Rahul Patil", college: "TechFlow Institute of Technology", branch: "Computer Engineering", year: "TE",
        cgpa: 8.1, skills: ["React", "Firebase", "JavaScript"], email: "rahul.p@example.com", phone: "+91 98765 43224",
        location: "Pune, India", bio: "Full-stack web developer with a passion for real-time applications.", avatarInitials: "RP"
    },
    "Ananya Reddy": {
        name: "Ananya Reddy", college: "Global Engineering College", branch: "Information Technology", year: "TE",
        cgpa: 9.5, skills: ["Blockchain", "Solidity", "Web3"], email: "ananya.r@example.com", phone: "+91 98765 43225",
        location: "Hyderabad, India", bio: "Web3 developer building decentralized solutions.", avatarInitials: "AR"
    },
    "Siddharth Rao": {
        name: "Siddharth Rao", college: "City University", branch: "Computer Engineering", year: "BE",
        cgpa: 8.4, skills: ["Ethereum", "Smart Contracts", "JavaScript"], email: "siddharth.r@example.com", phone: "+91 98765 43226",
        location: "Bangalore, India", bio: "Blockchain researcher exploring DeFi protocols.", avatarInitials: "SR"
    },
    "Tanvi Bhatt": {
        name: "Tanvi Bhatt", college: "TechFlow Institute of Technology", branch: "Computer Engineering", year: "TE",
        cgpa: 8.8, skills: ["Next.js", "IPFS", "React"], email: "tanvi.b@example.com", phone: "+91 98765 43227",
        location: "Pune, India", bio: "Full-stack developer interested in decentralized storage.", avatarInitials: "TB"
    },
    "Nikhil Deshpande": {
        name: "Nikhil Deshpande", college: "TechFlow Institute of Technology", branch: "Computer Engineering", year: "BE",
        cgpa: 9.3, skills: ["Python", "GPT-4", "Flask", "Docker"], email: "nikhil.d@example.com", phone: "+91 98765 43228",
        location: "Pune, India", bio: "Solo researcher working on AI-powered developer tools.", avatarInitials: "ND"
    },
};

// --- Student Profile Modal ---
function StudentProfileModal({
    studentName,
    onClose,
}: {
    studentName: string | null;
    onClose: () => void;
}) {
    const router = useRouter();
    const student = studentName ? STUDENT_PROFILES[studentName] : null;

    return (
        <AnimatePresence>
            {student && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        style={{
                            width: "90%",
                            maxWidth: "550px",
                            background: "var(--md-sys-color-surface)",
                            borderRadius: "24px",
                            padding: "2rem",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <div style={{
                                    width: "64px", height: "64px", borderRadius: "50%",
                                    background: "var(--md-sys-color-tertiary-container)",
                                    color: "var(--md-sys-color-on-tertiary-container)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "1.5rem", fontWeight: "bold",
                                }}>
                                    {student.avatarInitials}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", margin: 0 }}>{student.name}</h2>
                                    <p style={{ fontSize: "0.9rem", color: "var(--md-sys-color-primary)", margin: "2px 0" }}>
                                        {student.year} • {student.branch}
                                    </p>
                                    <p style={{ fontSize: "0.85rem", color: "var(--md-sys-color-secondary)", margin: 0 }}>
                                        {student.college}
                                    </p>
                                </div>
                            </div>
                            <Button variant="glass" onClick={onClose}>✕</Button>
                        </div>

                        {/* Bio */}
                        <div style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "12px", marginBottom: "1.25rem" }}>
                            <p style={{ lineHeight: 1.6, margin: 0 }}>{student.bio}</p>
                        </div>

                        {/* CGPA */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                            <span style={{ fontSize: "0.85rem", color: "var(--md-sys-color-secondary)", fontWeight: 600 }}>CGPA</span>
                            <span style={{
                                padding: "4px 12px", borderRadius: "10px",
                                background: "var(--md-sys-color-primary-container)",
                                color: "var(--md-sys-color-on-primary-container)",
                                fontWeight: 700, fontSize: "1rem",
                            }}>{student.cgpa}</span>
                        </div>

                        {/* Skills */}
                        <div style={{ marginBottom: "1.25rem" }}>
                            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--md-sys-color-secondary)", marginBottom: "0.5rem" }}>SKILLS</h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                {student.skills.map(skill => (
                                    <span key={skill} style={{
                                        padding: "5px 14px", borderRadius: "16px",
                                        border: "1px solid var(--md-sys-color-outline)",
                                        fontSize: "0.85rem",
                                    }}>{skill}</span>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div style={{ marginBottom: "1.25rem" }}>
                            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--md-sys-color-secondary)", marginBottom: "0.5rem" }}>CONTACT</h3>
                            <div style={{ display: "grid", gap: "0.3rem", fontSize: "0.9rem" }}>
                                <div>📧 {student.email}</div>
                                <div>📱 {student.phone}</div>
                                <div>📍 {student.location}</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                            <Button variant="filled" style={{ flex: 1 }}>Send Message</Button>
                            <Button variant="outlined" style={{ flex: 1 }} onClick={() => {
                                onClose();
                                router.push("/studentProfiles?college=" + encodeURIComponent("TechFlow Institute of Technology"));
                            }}>View Full Profile</Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- Add/Edit Project Modal ---
function ProjectFormModal({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (project: Omit<FacultyProject, "id">) => void;
}) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        techStack: "",
        domain: "",
        status: "ongoing" as "ongoing" | "completed",
        teamSize: "1",
        teamMembers: "",
        startDate: "",
        endDate: "",
        projectLink: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const members = form.teamMembers
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        onSubmit({
            title: form.title,
            description: form.description,
            techStack: form.techStack
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            domain: form.domain,
            status: form.status,
            teamSize: members.length || parseInt(form.teamSize) || 1,
            teamMembers: members,
            startDate: form.startDate,
            endDate: form.endDate,
            projectLink: form.projectLink,
        });
        // Reset form
        setForm({
            title: "",
            description: "",
            techStack: "",
            domain: "",
            status: "ongoing",
            teamSize: "1",
            teamMembers: "",
            startDate: "",
            endDate: "",
            projectLink: "",
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        style={{
                            width: "90%",
                            maxWidth: "700px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            background: "var(--md-sys-color-surface)",
                            borderRadius: "24px",
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                            position: "relative",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "1.5rem 2rem",
                                borderBottom: "1px solid var(--glass-border)",
                            }}
                        >
                            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
                                Add New Project
                            </h2>
                            <Button variant="glass" onClick={onClose}>
                                ✕
                            </Button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                padding: "2rem",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "1.25rem",
                            }}
                        >
                            <div style={{ gridColumn: "1 / -1" }}>
                                <FormInput
                                    label="Project Title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. AI-Powered Plagiarism Detection"
                                />
                            </div>

                            <div style={{ gridColumn: "1 / -1" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: 500,
                                            color: "var(--md-sys-color-on-surface)",
                                        }}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                        placeholder="Describe your project..."
                                        style={{
                                            padding: "0.75rem",
                                            borderRadius: "12px",
                                            border: "1px solid var(--input-border)",
                                            background: "var(--input-background)",
                                            color: "var(--input-color)",
                                            minHeight: "120px",
                                            resize: "vertical",
                                            fontFamily: "inherit",
                                            fontSize: "0.95rem",
                                        }}
                                    />
                                </div>
                            </div>

                            <FormInput
                                label="Tech Stack (comma separated)"
                                name="techStack"
                                value={form.techStack}
                                onChange={handleChange}
                                placeholder="e.g. Python, React, MongoDB"
                            />

                            <FormInput
                                label="Domain"
                                name="domain"
                                value={form.domain}
                                onChange={handleChange}
                                placeholder="e.g. Machine Learning"
                            />

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}
                            >
                                <label
                                    style={{
                                        fontSize: "0.9rem",
                                        fontWeight: 500,
                                        color: "var(--md-sys-color-on-surface)",
                                    }}
                                >
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    style={{
                                        padding: "0.75rem",
                                        borderRadius: "12px",
                                        border: "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontFamily: "inherit",
                                        fontSize: "0.95rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <FormInput
                                label="Team Size"
                                name="teamSize"
                                type="number"
                                min="1"
                                value={form.teamSize}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="End Date"
                                name="endDate"
                                type="date"
                                value={form.endDate}
                                onChange={handleChange}
                            />

                            <div style={{ gridColumn: "1 / -1" }}>
                                <FormInput
                                    label="Team Members (comma separated)"
                                    name="teamMembers"
                                    value={form.teamMembers}
                                    onChange={handleChange}
                                    placeholder="e.g. Aarav Patel, Ishita Sharma, Rohan Gupta"
                                />
                            </div>

                            <div style={{ gridColumn: "1 / -1" }}>
                                <FormInput
                                    label="Project Link"
                                    name="projectLink"
                                    value={form.projectLink}
                                    onChange={handleChange}
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div
                                style={{
                                    gridColumn: "1 / -1",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "1rem",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <Button type="button" variant="outlined" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="filled">
                                    Add Project
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- Status Badge ---
function StatusBadge({ status }: { status: "ongoing" | "completed" }) {
    const isOngoing = status === "ongoing";
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "20px",
                background: isOngoing
                    ? "rgba(103, 80, 164, 0.12)"
                    : "rgba(0, 150, 80, 0.12)",
                color: isOngoing
                    ? "var(--md-sys-color-primary)"
                    : "#00a854",
            }}
        >
            <span
                style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: isOngoing
                        ? "var(--md-sys-color-primary)"
                        : "#00a854",
                }}
            />
            {isOngoing ? "Ongoing" : "Completed"}
        </span>
    );
}

// --- Main Page ---
export default function FacultyProjectsPage() {
    const [projects, setProjects] = useState<FacultyProject[]>(INITIAL_PROJECTS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<FacultyProject | null>(null);
    const [selectedStudentName, setSelectedStudentName] = useState<string | null>(null);
    const router = useRouter();

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("facultyProjects");
        if (stored) {
            try {
                setProjects(JSON.parse(stored));
            } catch (error) {
                console.error("Failed to load projects from storage:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever projects change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("facultyProjects", JSON.stringify(projects));
            window.dispatchEvent(new Event('facultyProjectsUpdated'));
        }
    }, [projects, isLoaded]);

    const totalProjects = projects.length;
    const ongoingProjects = projects.filter((p) => p.status === "ongoing").length;
    const completedProjects = projects.filter((p) => p.status === "completed").length;

    const handleAddProject = (projectData: Omit<FacultyProject, "id">) => {
        const newProject: FacultyProject = {
            ...projectData,
            id: Date.now().toString(),
        };
        setProjects((prev) => [newProject, ...prev]);
        window.alert("Project added successfully! Check the Opportunities page to see it listed (if it has 0 members).");
    };

    const handleDelete = (id: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setSelectedProject(null);
    };

    return (
        <main
            style={{
                padding: "2rem 24px",
                maxWidth: "1200px",
                margin: "0 auto",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <ScrollReveal width="100%">
                <header
                    style={{
                        marginBottom: "3rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "2rem",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            Faculty Projects
                        </h2>
                        <p
                            style={{
                                fontSize: "1.0rem",
                                color: "var(--md-sys-color-secondary)",
                            }}
                        >
                            Manage and showcase your research and academic projects.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/facultydash")}
                        >
                            ← Dashboard
                        </Button>
                        <Button variant="filled" onClick={() => setIsModalOpen(true)}>
                            + Add Project
                        </Button>
                    </div>
                </header>
            </ScrollReveal>

            {/* Stats Section */}
            <ScrollReveal width="100%" delay={0.1}>
                <section
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.5rem",
                        marginBottom: "4rem",
                    }}
                >
                    <Card variant="elevated">
                        <h3
                            style={{
                                fontSize: "1rem",
                                color: "var(--md-sys-color-secondary)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Total Projects
                        </h3>
                        <div
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                color: "var(--md-sys-color-on-surface)",
                            }}
                        >
                            {totalProjects}
                        </div>
                    </Card>
                    <Card variant="elevated">
                        <h3
                            style={{
                                fontSize: "1rem",
                                color: "var(--md-sys-color-secondary)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Ongoing
                        </h3>
                        <div
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                color: "var(--md-sys-color-primary)",
                            }}
                        >
                            {ongoingProjects}
                        </div>
                    </Card>
                    <Card variant="elevated">
                        <h3
                            style={{
                                fontSize: "1rem",
                                color: "var(--md-sys-color-secondary)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Completed
                        </h3>
                        <div
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                color: "#00a854",
                            }}
                        >
                            {completedProjects}
                        </div>
                    </Card>
                </section>
            </ScrollReveal>

            {/* Projects Grid */}
            <ScrollReveal width="100%" delay={0.2}>
                <section>
                    <h2
                        style={{
                            fontSize: "1.75rem",
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <span
                            style={{
                                width: "8px",
                                height: "32px",
                                background: "var(--md-sys-color-tertiary)",
                                borderRadius: "4px",
                            }}
                        />
                        All Projects
                    </h2>

                    {projects.length === 0 ? (
                        <GlassContainer
                            style={{
                                padding: "3rem",
                                textAlign: "center",
                                color: "var(--md-sys-color-secondary)",
                            }}
                        >
                            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                                No projects yet. Start by adding your first project!
                            </p>
                            <Button variant="filled" onClick={() => setIsModalOpen(true)}>
                                + Add Project
                            </Button>
                        </GlassContainer>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                                gap: "1.5rem",
                            }}
                        >
                            {projects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    layoutId={`project-${project.id}`}
                                >
                                    <GlassContainer
                                        style={{
                                            padding: "1.5rem",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "1rem",
                                            height: "100%",
                                            cursor: "pointer",
                                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        }}
                                        className="glow-on-hover"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {/* Header row */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    fontSize: "1.15rem",
                                                    fontWeight: "bold",
                                                    flex: 1,
                                                    marginRight: "0.5rem",
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {project.title}
                                            </h3>
                                            <StatusBadge status={project.status} />
                                        </div>

                                        {/* Description */}
                                        <p
                                            style={{
                                                fontSize: "0.9rem",
                                                color: "var(--md-sys-color-secondary)",
                                                lineHeight: 1.5,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {project.description}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        {project.techStack.length > 0 && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: "0.4rem",
                                                }}
                                            >
                                                {project.techStack.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        style={{
                                                            fontSize: "0.75rem",
                                                            padding: "3px 10px",
                                                            borderRadius: "14px",
                                                            background:
                                                                "var(--md-sys-color-primary-container)",
                                                            color:
                                                                "var(--md-sys-color-on-primary-container)",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Team Members Avatars */}
                                        {project.teamMembers.length > 0 ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                                                {project.teamMembers.slice(0, 4).map((member, i) => (
                                                    <div
                                                        key={i}
                                                        title={`View ${member}'s profile`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (STUDENT_PROFILES[member]) {
                                                                setSelectedStudentName(member);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            borderRadius: "50%",
                                                            background: `hsl(${(i * 72 + 200) % 360}, 55%, 55%)`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                            fontSize: "0.7rem",
                                                            fontWeight: 600,
                                                            border: "2px solid var(--md-sys-color-surface)",
                                                            marginLeft: i > 0 ? "-8px" : "0",
                                                            zIndex: 10 - i,
                                                            cursor: STUDENT_PROFILES[member] ? "pointer" : "default",
                                                            transition: "transform 0.15s ease",
                                                        }}
                                                        onMouseEnter={(e) => { if (STUDENT_PROFILES[member]) (e.currentTarget as HTMLElement).style.transform = "scale(1.2)"; }}
                                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                                                    >
                                                        {member.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                ))}
                                                {project.teamMembers.length > 4 && (
                                                    <div
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            borderRadius: "50%",
                                                            background: "var(--md-sys-color-secondary-container)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "var(--md-sys-color-on-secondary-container)",
                                                            fontSize: "0.65rem",
                                                            fontWeight: 600,
                                                            border: "2px solid var(--md-sys-color-surface)",
                                                            marginLeft: "-8px",
                                                        }}
                                                    >
                                                        +{project.teamMembers.length - 4}
                                                    </div>
                                                )}
                                                <span style={{ marginLeft: "8px", fontSize: "0.8rem", color: "var(--md-sys-color-secondary)" }}>
                                                    {project.teamMembers.length === 1 ? "Individual" : `${project.teamMembers.length} members`}
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "6px 12px",
                                                borderRadius: "12px",
                                                background: "rgba(255, 152, 0, 0.08)",
                                                border: "1px dashed rgba(255, 152, 0, 0.3)",
                                            }}>
                                                <span style={{ fontSize: "0.85rem" }}>⏳</span>
                                                <span style={{
                                                    fontSize: "0.8rem",
                                                    color: "#e67e00",
                                                    fontWeight: 500,
                                                }}>
                                                    No one accepted yet
                                                </span>
                                            </div>
                                        )}

                                        {/* Meta row */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                fontSize: "0.8rem",
                                                color: "var(--md-sys-color-secondary)",
                                                marginTop: "auto",
                                                paddingTop: "0.5rem",
                                                borderTop: "1px solid var(--glass-border)",
                                            }}
                                        >
                                            <span>🏷️ {project.domain || "General"}</span>
                                        </div>
                                    </GlassContainer>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </ScrollReveal>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(0,0,0,0.6)",
                                backdropFilter: "blur(4px)",
                                zIndex: 40,
                            }}
                        />
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 50,
                                pointerEvents: "none",
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                style={{
                                    width: "90%",
                                    maxWidth: "650px",
                                    background: "var(--md-sys-color-surface)",
                                    borderRadius: "24px",
                                    padding: "2rem",
                                    pointerEvents: "auto",
                                    maxHeight: "85vh",
                                    overflowY: "auto",
                                }}
                            >
                                {/* Modal Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "12px",
                                                marginBottom: "0.5rem",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <h2
                                                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                                            >
                                                {selectedProject.title}
                                            </h2>
                                            <StatusBadge status={selectedProject.status} />
                                        </div>
                                        <p
                                            style={{
                                                color: "var(--md-sys-color-secondary)",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {selectedProject.domain || "General"} • Team of{" "}
                                            {selectedProject.teamSize}
                                        </p>
                                    </div>
                                    <Button
                                        variant="glass"
                                        onClick={() => setSelectedProject(null)}
                                        style={{ height: "fit-content" }}
                                    >
                                        ✕
                                    </Button>
                                </div>

                                {/* Description */}
                                <div
                                    style={{
                                        marginBottom: "1.5rem",
                                        padding: "1rem",
                                        background: "rgba(0,0,0,0.03)",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontWeight: "bold",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        Description
                                    </h3>
                                    <p style={{ lineHeight: 1.6 }}>
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                {selectedProject.techStack.length > 0 && (
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <h3
                                            style={{
                                                fontWeight: "bold",
                                                marginBottom: "0.75rem",
                                            }}
                                        >
                                            Tech Stack
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            {selectedProject.techStack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        padding: "5px 14px",
                                                        background:
                                                            "var(--md-sys-color-primary-container)",
                                                        color:
                                                            "var(--md-sys-color-on-primary-container)",
                                                        borderRadius: "16px",
                                                        fontSize: "0.85rem",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Team Members */}
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <h3
                                        style={{
                                            fontWeight: "bold",
                                            marginBottom: "0.75rem",
                                        }}
                                    >
                                        Team Members
                                    </h3>
                                    {selectedProject.teamMembers.length > 0 ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.6rem",
                                            }}
                                        >
                                            {selectedProject.teamMembers.map((member, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        if (STUDENT_PROFILES[member]) {
                                                            setSelectedStudentName(member);
                                                        }
                                                    }}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        cursor: STUDENT_PROFILES[member] ? "pointer" : "default",
                                                        padding: "6px 8px",
                                                        borderRadius: "10px",
                                                        transition: "background 0.15s ease",
                                                    }}
                                                    onMouseEnter={(e) => { if (STUDENT_PROFILES[member]) (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)"; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "34px",
                                                            height: "34px",
                                                            borderRadius: "50%",
                                                            background: `hsl(${(i * 72 + 200) % 360}, 55%, 55%)`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                            fontSize: "0.75rem",
                                                            fontWeight: 600,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {member.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <span style={{
                                                        fontSize: "0.95rem",
                                                        fontWeight: 500,
                                                        color: STUDENT_PROFILES[member] ? "var(--md-sys-color-primary)" : "inherit",
                                                        textDecoration: STUDENT_PROFILES[member] ? "underline" : "none",
                                                        textDecorationStyle: "dotted" as const,
                                                        textUnderlineOffset: "3px",
                                                    }}>
                                                        {member}
                                                    </span>
                                                    {STUDENT_PROFILES[member] && (
                                                        <span style={{ fontSize: "0.75rem", color: "var(--md-sys-color-secondary)" }}>→</span>
                                                    )}
                                                    {selectedProject.teamMembers.length === 1 && (
                                                        <span style={{
                                                            fontSize: "0.75rem",
                                                            padding: "2px 8px",
                                                            borderRadius: "8px",
                                                            background: "var(--md-sys-color-tertiary-container)",
                                                            color: "var(--md-sys-color-on-tertiary-container)",
                                                            fontWeight: 500,
                                                        }}>
                                                            Individual
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "12px 16px",
                                            borderRadius: "12px",
                                            background: "rgba(255, 152, 0, 0.08)",
                                            border: "1px dashed rgba(255, 152, 0, 0.3)",
                                        }}>
                                            <span style={{ fontSize: "1.1rem" }}>⏳</span>
                                            <div>
                                                <p style={{ fontWeight: 500, color: "#e67e00", margin: 0 }}>
                                                    No one has accepted this project yet
                                                </p>
                                                <p style={{
                                                    fontSize: "0.8rem",
                                                    color: "var(--md-sys-color-secondary)",
                                                    margin: 0,
                                                    marginTop: "2px",
                                                }}>
                                                    Looking for {selectedProject.teamSize} team member{selectedProject.teamSize !== 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Dates */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "1rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <div>
                                        <h4
                                            style={{
                                                fontSize: "0.85rem",
                                                color: "var(--md-sys-color-secondary)",
                                                marginBottom: "0.25rem",
                                            }}
                                        >
                                            Start Date
                                        </h4>
                                        <p style={{ fontWeight: 500 }}>
                                            {selectedProject.startDate || "—"}
                                        </p>
                                    </div>
                                    <div>
                                        <h4
                                            style={{
                                                fontSize: "0.85rem",
                                                color: "var(--md-sys-color-secondary)",
                                                marginBottom: "0.25rem",
                                            }}
                                        >
                                            End Date
                                        </h4>
                                        <p style={{ fontWeight: 500 }}>
                                            {selectedProject.endDate || "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Project Link */}
                                {selectedProject.projectLink && (
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <h3
                                            style={{
                                                fontWeight: "bold",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            Project Link
                                        </h3>
                                        <a
                                            href={selectedProject.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "var(--md-sys-color-primary)",
                                                textDecoration: "underline",
                                                wordBreak: "break-all",
                                            }}
                                        >
                                            {selectedProject.projectLink}
                                        </a>
                                    </div>
                                )}

                                {/* Actions */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "0.75rem",
                                        paddingTop: "1rem",
                                        borderTop: "1px solid var(--glass-border)",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        style={{
                                            borderColor: "var(--md-sys-color-error)",
                                            color: "var(--md-sys-color-error)",
                                        }}
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    "Are you sure you want to delete this project?"
                                                )
                                            ) {
                                                handleDelete(selectedProject.id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="filled"
                                        onClick={() => setSelectedProject(null)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Add Project Modal */}
            <ProjectFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddProject}
            />

            {/* Student Profile Modal */}
            <StudentProfileModal
                studentName={selectedStudentName}
                onClose={() => setSelectedStudentName(null)}
            />
        </main>
    );
}
