const Streaks = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Streaks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add streaks content here */}
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Daily Meditation</h2>
                        <p className="text-2xl font-bold text-primary">7 days</p>
                        <div className="flex items-center gap-2">
                            <div className="badge badge-primary">Current Streak</div>
                            <div className="badge badge-ghost">Best: 30 days</div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Morning Exercise</h2>
                        <p className="text-2xl font-bold text-primary">14 days</p>
                        <div className="flex items-center gap-2">
                            <div className="badge badge-primary">Current Streak</div>
                            <div className="badge badge-ghost">Best: 45 days</div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Reading</h2>
                        <p className="text-2xl font-bold text-primary">3 days</p>
                        <div className="flex items-center gap-2">
                            <div className="badge badge-primary">Current Streak</div>
                            <div className="badge badge-ghost">Best: 21 days</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Streaks; 