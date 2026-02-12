(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/GlassContainer.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "glassContainer": "GlassContainer-module__y1pM6a__glassContainer",
});
}),
"[project]/src/components/ui/GlassContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlassContainer",
    ()=>GlassContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$GlassContainer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/GlassContainer.module.css [app-client] (css module)");
;
;
const GlassContainer = ({ children, className = '', ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$GlassContainer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].glassContainer} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/GlassContainer.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = GlassContainer;
var _c;
__turbopack_context__.k.register(_c, "GlassContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/studentForm/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentFormPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$GlassContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/GlassContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function StudentFormPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        collegeName: "",
        degree: "",
        branch: "",
        yearOfStudy: "",
        expectedGraduationYear: "",
        rollNumber: "",
        collegeEmail: ""
    });
    const degrees = [
        "BTech",
        "MTech",
        "BSc",
        "MSc",
        "BA",
        "MA",
        "BBA",
        "MBA",
        "BE",
        "ME",
        "Other"
    ];
    const years = [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th"
    ];
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev)=>{
                const newErrors = {
                    ...prev
                };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    const validateEmail = (email)=>{
        const validDomains = [
            ".edu",
            ".ac.in",
            ".edu.in",
            ".ac.uk",
            ".edu.au"
        ];
        return validDomains.some((domain)=>email.toLowerCase().endsWith(domain));
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.collegeName.trim()) {
            newErrors.collegeName = "College/University name is required";
        }
        if (!formData.degree) {
            newErrors.degree = "Degree is required";
        }
        if (!formData.branch.trim()) {
            newErrors.branch = "Branch/Major is required";
        }
        if (!formData.yearOfStudy) {
            newErrors.yearOfStudy = "Year of study is required";
        }
        if (!formData.expectedGraduationYear.trim()) {
            newErrors.expectedGraduationYear = "Expected graduation year is required";
        } else {
            const year = parseInt(formData.expectedGraduationYear);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < currentYear || year > currentYear + 10) {
                newErrors.expectedGraduationYear = "Please enter a valid graduation year";
            }
        }
        if (!formData.rollNumber.trim()) {
            newErrors.rollNumber = "Roll number/Enrollment ID is required";
        }
        if (!formData.collegeEmail.trim()) {
            newErrors.collegeEmail = "College email is required";
        } else if (!validateEmail(formData.collegeEmail)) {
            newErrors.collegeEmail = "Email must end with .edu, .ac.in, or similar educational domain";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found. Please login.");
            }
            const response = await fetch("http://localhost:8000/student/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: "temp",
                    college: formData.collegeName,
                    degree: formData.degree,
                    branch: formData.branch,
                    year_of_study: parseInt(formData.yearOfStudy) || 1,
                    expected_graduation_year: parseInt(formData.expectedGraduationYear),
                    roll_no: formData.rollNumber,
                    college_email: formData.collegeEmail,
                    gpa: 0.0
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = "Failed to submit profile";
                if (errorData.detail) {
                    if (Array.isArray(errorData.detail)) {
                        errorMessage = errorData.detail.map((err)=>`${err.loc.join(".")}: ${err.msg}`).join("\n");
                    } else {
                        errorMessage = errorData.detail;
                    }
                }
                throw new Error(errorMessage);
            }
            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(error.message || "An error occurred");
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$GlassContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassContainer"], {
            style: {
                maxWidth: "600px",
                width: "100%",
                padding: "40px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: "center",
                        marginBottom: "2rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: "2rem",
                                marginBottom: "0.5rem",
                                fontWeight: 700
                            },
                            children: "Student Registration"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: "var(--md-sys-color-secondary)"
                            },
                            children: "Please fill in your academic details"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/studentForm/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "collegeName",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "College / University name",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "collegeName",
                                    name: "collegeName",
                                    type: "text",
                                    placeholder: "Enter your college/university name",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.collegeName ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem"
                                    },
                                    value: formData.collegeName,
                                    onChange: handleChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                errors.collegeName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.collegeName
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "degree",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "Degree",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "degree",
                                    name: "degree",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.degree ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem",
                                        cursor: "pointer"
                                    },
                                    value: formData.degree,
                                    onChange: handleChange,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select degree"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this),
                                        degrees.map((degree)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: degree,
                                                children: degree
                                            }, degree, false, {
                                                fileName: "[project]/src/app/studentForm/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                errors.degree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.degree
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "branch",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "Branch / Major",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "branch",
                                    name: "branch",
                                    type: "text",
                                    placeholder: "e.g., Computer Science, Electrical Engineering",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.branch ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem"
                                    },
                                    value: formData.branch,
                                    onChange: handleChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this),
                                errors.branch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.branch
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "yearOfStudy",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "Year of study",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 341,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "yearOfStudy",
                                    name: "yearOfStudy",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.yearOfStudy ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem",
                                        cursor: "pointer"
                                    },
                                    value: formData.yearOfStudy,
                                    onChange: handleChange,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select year"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 362,
                                            columnNumber: 15
                                        }, this),
                                        years.map((year)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: year,
                                                children: [
                                                    year,
                                                    " Year"
                                                ]
                                            }, year, true, {
                                                fileName: "[project]/src/app/studentForm/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                errors.yearOfStudy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.yearOfStudy
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "expectedGraduationYear",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "Expected graduation year",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "expectedGraduationYear",
                                    name: "expectedGraduationYear",
                                    type: "number",
                                    placeholder: "e.g., 2025",
                                    required: true,
                                    min: new Date().getFullYear(),
                                    max: new Date().getFullYear() + 10,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.expectedGraduationYear ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem"
                                    },
                                    value: formData.expectedGraduationYear,
                                    onChange: handleChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this),
                                errors.expectedGraduationYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.expectedGraduationYear
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 417,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "rollNumber",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "Roll number / Enrollment ID",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 439,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 430,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "rollNumber",
                                    name: "rollNumber",
                                    type: "text",
                                    placeholder: "Enter your roll number or enrollment ID",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.rollNumber ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem"
                                    },
                                    value: formData.rollNumber,
                                    onChange: handleChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this),
                                errors.rollNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.rollNumber
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 462,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "collegeEmail",
                                    style: {
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontWeight: 500
                                    },
                                    children: [
                                        "College email",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--md-sys-color-error)"
                                            },
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/studentForm/page.tsx",
                                            lineNumber: 484,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "collegeEmail",
                                    name: "collegeEmail",
                                    type: "email",
                                    placeholder: "student@university.edu",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: errors.collegeEmail ? "1px solid var(--md-sys-color-error)" : "1px solid var(--input-border)",
                                        background: "var(--input-background)",
                                        color: "var(--input-color)",
                                        fontSize: "1rem"
                                    },
                                    value: formData.collegeEmail,
                                    onChange: handleChange
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, this),
                                errors.collegeEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-error)",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: errors.collegeEmail
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--md-sys-color-secondary)",
                                        fontSize: "0.75rem",
                                        marginTop: "0.25rem"
                                    },
                                    children: "Must end with .edu, .ac.in, or similar educational domain"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentForm/page.tsx",
                                    lineNumber: 517,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "filled",
                            type: "submit",
                            disabled: isLoading,
                            style: {
                                height: "48px",
                                fontSize: "1rem",
                                marginTop: "0.5rem"
                            },
                            children: isLoading ? "Submitting..." : "Submit"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentForm/page.tsx",
                            lineNumber: 528,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/studentForm/page.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentForm/page.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/studentForm/page.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(StudentFormPage, "8jJnL+61q6s4QhDRsNtTu592QGA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = StudentFormPage;
var _c;
__turbopack_context__.k.register(_c, "StudentFormPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_82734714._.js.map