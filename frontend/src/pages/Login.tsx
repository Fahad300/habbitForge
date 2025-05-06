import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

interface LoginForm {
    username: string;
    password: string;
}

const Login = () => {
    const { theme } = useTheme();
    const cardGradientClass = theme === "light" ? "bg-card-gradient-light" : "bg-card-gradient-dark";

    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginForm>({
        username: "",
        password: ""
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // First, get the token
            const tokenResponse = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "password",
                    username: formData.username,
                    password: formData.password,
                }),
                credentials: "include",
            });

            const tokenData = await tokenResponse.json();

            if (!tokenResponse.ok) {
                if (tokenResponse.status === 401) {
                    throw new Error("Invalid username or password. Please try again.");
                } else if (tokenResponse.status === 404) {
                    throw new Error("User not found. Please check your username.");
                } else {
                    throw new Error(tokenData.detail || "Authentication failed. Please try again.");
                }
            }

            // Store the token
            localStorage.setItem("token", tokenData.access_token);

            // Get user data
            const userResponse = await fetch("http://localhost:8000/users/me", {
                headers: {
                    "Authorization": `Bearer ${tokenData.access_token}`,
                },
            });

            if (!userResponse.ok) {
                if (userResponse.status === 401) {
                    throw new Error("Session expired. Please login again.");
                } else if (userResponse.status === 404) {
                    throw new Error("User profile not found. Please contact support.");
                } else {
                    throw new Error("Unable to load user profile. Please try again.");
                }
            }

            const userData = await userResponse.json();
            localStorage.setItem("user", JSON.stringify(userData));

            // Redirect to dashboard
            navigate("/app");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (err instanceof TypeError && err.message === "Failed to fetch") {
                setError("Unable to connect to the server. Please check your internet connection or try again later.");
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
                    <h2 className="card-title text-2xl font-bold text-center mb-6">Welcome Back</h2>

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
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                placeholder="Enter your username"
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
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 