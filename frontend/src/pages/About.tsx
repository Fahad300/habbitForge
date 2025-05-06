import { useTheme } from "../contexts/ThemeContext";

const About = () => {
    const { theme } = useTheme();
    const cardGradientClass = theme === "light" ? "bg-card-gradient-light" : "bg-card-gradient-dark";

    const features = [
        {
            title: "Habit Tracking",
            description: "Track your daily, weekly, and monthly habits with our intuitive interface.",
            icon: "📊"
        },
        {
            title: "Streak System",
            description: "Build momentum with our streak tracking system that motivates you to maintain consistency.",
            icon: "🔥"
        },
        {
            title: "Rewards",
            description: "Earn points and redeem rewards for achieving your habit goals.",
            icon: "🏆"
        },
        {
            title: "Progress Analytics",
            description: "Visualize your progress with detailed analytics and insights.",
            icon: "📈"
        }
    ];

    return (
        <div style={{ minHeight: "calc(100vh - 80px)" }} className={`bg-base-100 ${cardGradientClass}`}>
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">About HabitForge</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Your personal habit tracking companion designed to help you build better habits,
                        track your progress, and achieve your goals.
                    </p>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div key={index} className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="card-title">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission Statement */}
                <div className="card bg-base-200 shadow-xl mb-16">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Our Mission</h2>
                        <p className="text-lg">
                            At HabitForge, we believe that small, consistent actions lead to significant life changes.
                            Our mission is to empower individuals to build lasting habits through an engaging and
                            supportive platform that makes habit formation enjoyable and rewarding.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Habits?</h2>
                    <p className="mb-8">
                        Join thousands of users who are already building better habits with HabitForge.
                    </p>
                    <a href="/signup" className="btn btn-primary btn-lg">
                        Get Started Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About; 