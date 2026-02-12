"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        link: ""
    });

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
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Add New Project</h1>
                    <p style={{ color: 'var(--md-sys-color-secondary)', marginBottom: '2rem' }}>
                        Showcase your best work to recruiters and faculty.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Project Title</label>
                            <input
                                type="text"
                                placeholder="e.g. AI-Powered Traffic System"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px',
                                    border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)',
                                    color: 'var(--md-sys-color-on-surface)', outline: 'none'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                            <textarea
                                placeholder="Briefly describe what you built..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px',
                                    border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)',
                                    color: 'var(--md-sys-color-on-surface)', outline: 'none', resize: 'vertical'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Technologies (comma separated)</label>
                            <input
                                type="text"
                                placeholder="e.g. React, Node.js, TensorFlow"
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                required
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px',
                                    border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)',
                                    color: 'var(--md-sys-color-on-surface)', outline: 'none'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Project Link (Optional)</label>
                            <input
                                type="url"
                                placeholder="https://github.com/..."
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '12px',
                                    border: '1px solid var(--md-sys-color-outline)',
                                    background: 'var(--md-sys-color-surface-container)',
                                    color: 'var(--md-sys-color-on-surface)', outline: 'none'
                                }}
                            />
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
                                disabled={!formData.title || !formData.description || loading}
                            >
                                {loading ? 'Adding...' : 'Add Project'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </ScrollReveal>
        </main>
    );
}
