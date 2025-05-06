import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

interface SignUpForm {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {
    const { theme } = useTheme();
    const cardGradientClass = theme === "light" ? "bg-card-gradient-light" : "bg-card-gradient-dark";
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpForm>({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): string | null => {
        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match. Please try again.";
        }
        if (formData.password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (formData.username.length < 3) {
            return "Username must be at least 3 characters long.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return "Please enter a valid email address.";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate form
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setIsLoading(false);
            return;
        }

        try {
            console.log("Attempting to sign up user..."); // Debug log
            const response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password
                }),
            });

            console.log("Response status:", response.status); // Debug log
            const data = await response.json();
            console.log("Response data:", data); // Debug log

            if (!response.ok) {
                if (response.status === 400) {
                    if (data.detail.includes("email")) {
                        throw new Error("This email is already registered. Please use a different email or try logging in.");
                    } else if (data.detail.includes("username")) {
                        throw new Error("This username is already taken. Please choose a different username.");
                    } else {
                        throw new Error(data.detail || "Invalid registration data. Please check your information.");
                    }
                } else if (response.status === 422) {
                    throw new Error("Invalid data format. Please check your information.");
                } else {
                    throw new Error(`Registration failed: ${data.detail || "Please try again later."}`);
                }
            }

            // Redirect to login page on successful signup
            navigate("/login");
        } catch (err) {
            console.error("Signup error:", err); // Debug log
            if (err instanceof Error) {
                setError(err.message);
            } else if (err instanceof TypeError && err.message === "Failed to fetch") {
                setError("Unable to connect to the server. Please ensure the backend server is running at http://localhost:8000");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 80px)' }} className={`flex items-center justify-center bg-base-100 ${cardGradientClass}`}>
            <div className="card w-96 bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-6">Create Account</h2>

                    {error && (
                        <div className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                minLength={3}
                                maxLength={50}
                                placeholder="Choose a username (3-50 characters)"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                minLength={8}
                                placeholder="Enter password (min. 8 characters)"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                minLength={8}
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp; 