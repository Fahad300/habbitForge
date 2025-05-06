import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add dashboard content here */}
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Current Streaks</h2>
                        <p>Your active habit streaks will appear here.</p>
                    </div>
                </div>
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Recent Activity</h2>
                        <p>Your recent habit completions will appear here.</p>
                    </div>
                </div>
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Achievements</h2>
                        <p>Your latest badges and rewards will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 