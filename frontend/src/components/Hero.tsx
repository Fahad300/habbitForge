import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Hero = () => {
    const { theme } = useTheme();
    const gradientClass = theme === "light" ? "bg-gradient-light" : "bg-gradient-dark";

    return (
        <div className={`hero min-h-[90vh] ${gradientClass} bg-base-100 relative overflow-hidden`}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            <div className="hero-content flex-col lg:flex-row relative z-10">
                <div className="text-center lg:text-left lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-6xl font-bold leading-tight">
                            Forge Your Habits,
                            <span className="text-primary block">Shape Your Future</span>
                        </h1>
                        <p className="text-xl leading-relaxed">
                            HabitForge helps you build and maintain positive habits through personalized tracking,
                            community support, and smart analytics. Start your journey to a better you today!
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/signup"
                            className="btn btn-primary text-white btn-lg hover:scale-105 transition-transform"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/about"
                            className="btn btn-outline btn-base-100 text-white btn-lg hover:scale-105 transition-transform"
                        >
                            Learn More
                        </Link>
                    </div>
                    <div className="flex items-center gap-8 pt-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-base-100 bg-primary/20"></div>
                            ))}
                        </div>
                        <p className="text-sm">Join 10,000+ users building better habits</p>
                    </div>
                </div>
                <div className="lg:w-1/2 flex justify-center relative">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                        <img
                            src="/src/assets/hero.png"
                            alt="Habit tracking illustration"
                            className="max-w-lg w-full relative z-10 transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero; 