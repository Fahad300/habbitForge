import { useTheme } from "../contexts/ThemeContext";

const Features = () => {
    const { theme } = useTheme();
    const cardGradientClass = theme === "light" ? "bg-card-gradient-light" : "bg-card-gradient-dark";

    const detailedFeatures = [
        {
            title: "Track Your Progress",
            description: "Monitor your daily habits and see your progress over time with detailed analytics.",
            image: "/src/assets/tracking.jpg",
            features: [
                "Daily habit tracking",
                "Progress visualization",
                "Streak counting",
                "Achievement badges",
                "Streak Counting",
                "Achievement Badges",
                "Advanced Analytics & Insights"
            ]
        },
        {
            title: "Join a Thriving Community of Goal-Getters",
            description: "Transform solitary habit-building into a collaborative, uplifting experience with features designed to fuel accountability, inspiration, and camaraderie. Humans thrive on connection. By blending friendly competition, shared vulnerability, and collective celebration, HabitForge's community turns isolation into empowerment. Whether you're an introvert or a social butterfly, you'll find fuel to keep going—and maybe even make lifelong friends along the way.",
            image: "/src/assets/community.jpg",
            features: [
                "Group challenges",
                "Progress sharing",
                "Motivational feed",
                "Accountability partners",
                "Peer Recognition & Shoutouts",
                "Social Media Integration",
                "Motivational Feed"
            ]
        },
        {
            title: "Smart Reminders",
            description: "Never miss a habit with intelligent reminders that adapt to your schedule.",
            image: "/src/assets/reminders.jpg",
            features: [
                "Customizable notifications",
                "Smart scheduling",
                "Progress nudges",
                "Habit suggestions"
            ]
        }
    ];

    const whyChooseHabitForge = [
        {
            title: "Gamified Motivation That Actually Works",
            description: "Turn habit-building into a game with streak counters, achievement badges, and challenges designed to keep you hooked.",
            image: "/src/assets/track-icon.png",
        },
        {
            title: "Smart Insights, Not Just Data",
            description: "Go beyond basic tracking with AI-powered analytics that spot patterns you might miss. Discover how habits connect.",
            image: "/src/assets/community-icon.png",
        },
        {
            title: "Flexible Enough for Real Life",
            description: "Life's unpredictable? HabitForge adapts. Set custom habits, use grace periods to protect streaks after a busy day, and tweak goals anytime.",
            image: "/src/assets/reminder-icon.png",
        }
    ];

    return (
        <div className="py-24 bg-base-100">
            {/* Detailed Features Section */}
            <div className="container mx-auto px-4 mb-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-5xl font-bold mb-6">Powerful Features for Your Success</h2>
                    <p className="text-xl text-base-content/80">
                        Everything you need to build and maintain habits that last
                    </p>
                </div>
                <div className="space-y-32">
                    {detailedFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="lg:w-1/2 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl relative z-10 transform group-hover:scale-105 transition-all duration-300"
                                    />
                                </div>
                            </div>
                            <div className="lg:w-1/2 text-left space-y-6">
                                <h3 className="text-4xl font-bold">{feature.title}</h3>
                                <p className="text-lg text-base-content/80 leading-relaxed">{feature.description}</p>
                                <ul className="space-y-4">
                                    {feature.features.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 group">
                                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <img src="/src/assets/tick.png" alt="tick" className="w-4 h-4" />
                                            </span>
                                            <span className="text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Features Cards */}
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-5xl font-bold mb-6">Why Choose HabitForge?</h2>
                    <p className="text-xl text-base-content/80">
                        The smart way to build habits that stick
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyChooseHabitForge.map((feature, index) => (
                        <div
                            key={index}
                            className={`card ${cardGradientClass} shadow-xl group hover:shadow-2xl transition-all duration-300`}
                        >
                            <div className="card-body items-center text-center p-8">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-20 h-20"
                                    />
                                </div>
                                <h3 className="card-title text-2xl mb-4">{feature.title}</h3>
                                <p className="text-base-content/80">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features; 