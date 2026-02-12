export interface FacultyProject {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    domain: string;
    status: "ongoing" | "completed";
    teamSize: number;
    teamMembers: string[];
    startDate: string;
    endDate: string;
    projectLink: string;
}

export const INITIAL_PROJECTS: FacultyProject[] = [
    {
        id: "1",
        title: "AI-Powered Plagiarism Detection System",
        description:
            "A machine learning based system to detect plagiarism in academic submissions using NLP techniques and transformer models.",
        techStack: ["Python", "TensorFlow", "FastAPI", "React"],
        domain: "Artificial Intelligence",
        status: "ongoing",
        teamSize: 4,
        teamMembers: ["Aarav Patel", "Ishita Sharma", "Rohan Gupta", "Sneha Kulkarni"],
        startDate: "2025-08-01",
        endDate: "",
        projectLink: "https://github.com/example/plagiarism-detect",
    },
    {
        id: "2",
        title: "Smart Campus IoT Dashboard",
        description:
            "An IoT-based monitoring dashboard for campus infrastructure including energy usage, room occupancy, and environmental sensors.",
        techStack: ["Arduino", "Node.js", "MongoDB", "React", "MQTT"],
        domain: "Internet of Things",
        status: "completed",
        teamSize: 6,
        teamMembers: ["Priya Deshmukh", "Arjun Mehta", "Kavya Nair", "Vikram Joshi", "Meera Iyer", "Rahul Patil"],
        startDate: "2024-01-15",
        endDate: "2025-06-30",
        projectLink: "https://github.com/example/smart-campus",
    },
    {
        id: "3",
        title: "Blockchain-based Certificate Verification",
        description:
            "A decentralized application for issuing and verifying academic certificates using Ethereum smart contracts.",
        techStack: ["Solidity", "Ethereum", "Next.js", "IPFS"],
        domain: "Blockchain",
        status: "ongoing",
        teamSize: 3,
        teamMembers: ["Ananya Reddy", "Siddharth Rao", "Tanvi Bhatt"],
        startDate: "2025-09-01",
        endDate: "",
        projectLink: "",
    },
    {
        id: "4",
        title: "Automated Code Review Tool",
        description:
            "A solo research project developing an AI-assisted code review tool that provides actionable feedback on code quality, security vulnerabilities, and best practices.",
        techStack: ["Python", "GPT-4", "Flask", "Docker"],
        domain: "Software Engineering",
        status: "ongoing",
        teamSize: 1,
        teamMembers: ["Nikhil Deshpande"],
        startDate: "2025-10-15",
        endDate: "",
        projectLink: "https://github.com/example/auto-code-review",
    },
    {
        id: "5",
        title: "Predictive Student Performance Analytics",
        description:
            "A data analytics platform to predict student academic performance using historical data and machine learning models to enable early interventions.",
        techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
        domain: "Data Science",
        status: "ongoing",
        teamSize: 4,
        teamMembers: [],
        startDate: "2026-01-10",
        endDate: "",
        projectLink: "",
    },
];
