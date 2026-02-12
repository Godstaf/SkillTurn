"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/app/recruiter_dashboard/dashboard.module.css";

const PREDEFINED_SKILLS = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "C++", "C", "Java", "Go", "SQL", "MongoDB",
    "Figma", "Adobe XD", "UI/UX Design", "Machine Learning",
    "Data Analysis", "Project Management", "Agile", "Scrum",
    "HTML", "CSS", "Tailwind CSS", "Docker", "AWS", "Git"
].sort();

interface StudentSkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSkills: string[];
    onUpdate: (skills: string[]) => void;
}

export const StudentSkillModal: React.FC<StudentSkillModalProps> = ({
    isOpen,
    onClose,
    currentSkills,
    onUpdate
}) => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [skillSearch, setSkillSearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSelectedSkills(currentSkills);
            setSkillSearch('');
            setShowSuggestions(false);
        }
    }, [isOpen, currentSkills]);

    const toggleSkill = (skill: string) => {
        const isSelected = selectedSkills.includes(skill);
        const newSkills = isSelected
            ? selectedSkills.filter(s => s !== skill)
            : [...selectedSkills, skill];
        setSelectedSkills(newSkills);
    };

    const handleSave = () => {
        onUpdate(selectedSkills);
        onClose();
    };

    const filteredSuggestions = PREDEFINED_SKILLS.filter(s =>
        s.toLowerCase().includes(skillSearch.toLowerCase()) && !selectedSkills.includes(s)
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        style={{
                            width: '90%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto',
                            background: 'var(--md-sys-color-surface)', borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative',
                            padding: '2rem'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Add My Skills</h2>
                            <Button variant="glass" onClick={onClose} style={{ minWidth: 'auto', padding: '8px' }}>✕</Button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.8rem' }}>
                                Selected Skills
                            </label>

                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px',
                                    border: '1px solid var(--md-sys-color-outline)', borderRadius: '16px',
                                    background: 'var(--md-sys-color-surface-container-low)', minHeight: '60px', alignItems: 'center'
                                }}>
                                    {selectedSkills.map((skill, index) => (
                                        <motion.div
                                            layout
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            key={skill}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                                                borderRadius: '100px', background: 'var(--md-sys-color-primary)',
                                                color: 'var(--md-sys-color-on-primary)', fontSize: '0.9rem',
                                                boxShadow: '0 2px 8px rgba(var(--md-sys-color-primary-rgb), 0.3)'
                                            }}
                                        >
                                            {skill}
                                            <span
                                                onClick={() => toggleSkill(skill)}
                                                style={{ cursor: 'pointer', opacity: 0.8, fontWeight: 'bold', fontSize: '1rem' }}
                                            >✕</span>
                                        </motion.div>
                                    ))}
                                    <input
                                        type="text"
                                        value={skillSearch}
                                        onChange={(e) => {
                                            setSkillSearch(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        placeholder={selectedSkills.length === 0 ? "Search skills to add..." : "Add more..."}
                                        style={{
                                            flex: 1, border: 'none', background: 'transparent', outline: 'none',
                                            color: 'var(--md-sys-color-on-surface)', padding: '4px', minWidth: '150px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                {/* Suggestions Dropdown */}
                                <AnimatePresence>
                                    {showSuggestions && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                            style={{
                                                position: 'absolute', top: '110%', left: 0, right: 0,
                                                maxHeight: '250px', overflowY: 'auto', background: 'var(--md-sys-color-surface)',
                                                borderRadius: '16px', border: '1px solid var(--md-sys-color-outline)',
                                                zIndex: 2000, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: '12px'
                                            }}
                                        >
                                            {filteredSuggestions.length > 0 ? (
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
                                                    {filteredSuggestions.map(skill => (
                                                        <div
                                                            key={skill}
                                                            onClick={() => {
                                                                toggleSkill(skill);
                                                                setSkillSearch('');
                                                            }}
                                                            style={{
                                                                padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                                                                fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface)',
                                                                transition: 'all 0.2s', border: '1px solid transparent'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.background = 'var(--md-sys-color-primary-container)';
                                                                e.currentTarget.style.color = 'var(--md-sys-color-on-primary-container)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.background = 'transparent';
                                                                e.currentTarget.style.color = 'var(--md-sys-color-on-surface)';
                                                            }}
                                                        >
                                                            {skill}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--md-sys-color-secondary)', fontSize: '0.95rem' }}>
                                                    ✨ No other skills found.
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <Button variant="outlined" onClick={onClose}>Cancel</Button>
                            <Button variant="filled" onClick={handleSave}>Update Profile</Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
