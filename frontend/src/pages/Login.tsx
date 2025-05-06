import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

interface LoginForm {
    username: string;
    password: string;
    rememberMe: boolean;
}

const Login = () => {
    const { theme } = useTheme();
    const cardGradientClass = theme === "light" ? "bg-card-gradient-light" : "bg-card-gradient-dark";
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginForm>({
        username: "",
        password: "",
        rememberMe: false
    });
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleOAuthLogin = async (provider: "google" | "apple") => {
        try {
            setIsLoading(true);
            setError("");

            const response = await fetch(`http://localhost:8000/auth/${provider}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to initiate ${provider} login`);
            }

            const data = await response.json();
            if (!data.auth_url) {
                throw new Error(`No authorization URL received from ${provider}`);
            }

            // Redirect to the OAuth provider's login page
            window.location.href = data.auth_url;
        } catch (err) {
            console.error(`${provider} login error:`, err);
            setError(err instanceof Error ? err.message : `Failed to login with ${provider}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const params = new URLSearchParams();
            params.append("username", formData.username);
            params.append("password", formData.password);
            params.append("grant_type", "password");

            if (!formData.username || !formData.password) {
                setError("Please enter both username and password.");
                setIsLoading(false);
                return;
            }

            const tokenResponse = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
                body: params,
                credentials: "include",
            });

            if (!tokenResponse.ok) {
                const errorData = await tokenResponse.json();
                throw new Error(errorData.detail || "Authentication failed. Please try again.");
            }

            const tokenData = await tokenResponse.json();

            // Store the token
            localStorage.setItem("token", tokenData.access_token);
            if (formData.rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }

            // Get user data
            const userResponse = await fetch("http://localhost:8000/users/me", {
                headers: {
                    "Authorization": `Bearer ${tokenData.access_token}`,
                    "Accept": "application/json",
                },
                credentials: "include",
            });

            if (!userResponse.ok) {
                throw new Error("Unable to load user profile. Please try again.");
            }

            const userData = await userResponse.json();
            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/app");
        } catch (err) {
            console.error("Login error:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "calc(100vh - 80px)" }} className={`flex items-center justify-center bg-base-100 ${cardGradientClass}`}>
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

                    {/* OAuth Buttons */}
                    <div className="flex flex-col gap-4 mb-6">
                        <button
                            onClick={() => handleOAuthLogin("google")}
                            className="btn btn-outline gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                        <button
                            onClick={() => handleOAuthLogin("apple")}
                            className="btn btn-outline gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.41-.65 1.29-1.52 2.58-2.25 4.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                                />
                            </svg>
                            Continue with Apple
                        </button>
                    </div>

                    <div className="divider">OR</div>

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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pr-10"
                                    required
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="checkbox checkbox-sm mr-2"
                                />
                                <span className="label-text">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm link link-primary">
                                Forgot password?
                            </Link>
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