"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AVAILABLE_SKILLS = [
    "React", "Node.js", "Python", "Java", "C++",
    "Machine Learning", "Cloud Computing", "AWS", "Docker",
    "SQL", "MongoDB", "Figma", "Adobe XD", "Cyber Security",
    "Data Science", "Blockchain", "DevOps"
];

export default function AddSkillPage() {
    const router = useRouter();
    const [selectedSkill, setSelectedSkill] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        router.push('/dashboard');
    };

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <ScrollReveal width="100%">
                <Card variant="elevated" style={{ padding: '2.5rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Add New Skill</h1>
                    <p style={{ color: 'var(--md-sys-color-secondary)', marginBottom: '2rem' }}>
                        Select a skill to verify and add to your profile.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Skill Name</label>
                            <select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)',
                                    color: 'var(--md-sys-color-on-surface)',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            >
                                <option value="" disabled>Select a skill...</option>
                                {AVAILABLE_SKILLS.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <Button
                                type="button"
                                variant="glass"
                                onClick={() => router.back()}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="filled"
                                disabled={!selectedSkill || loading}
                            >
                                {loading ? 'Adding...' : 'Add Skill'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </ScrollReveal>
        </main>
    );
}
