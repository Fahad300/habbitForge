const Rewards = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Rewards & Badges</h1>

            {/* Badges Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Your Badges</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-4xl">🏆</span>
                            </div>
                            <h3 className="card-title">Early Bird</h3>
                            <p className="text-sm">Complete morning exercise 7 days in a row</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-4xl">📚</span>
                            </div>
                            <h3 className="card-title">Bookworm</h3>
                            <p className="text-sm">Read for 30 days straight</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-4xl">🧘‍♂️</span>
                            </div>
                            <h3 className="card-title">Zen Master</h3>
                            <p className="text-sm">Complete 100 meditation sessions</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-4xl">🔥</span>
                            </div>
                            <h3 className="card-title">Streak Master</h3>
                            <p className="text-sm">Maintain a 30-day streak on any habit</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rewards Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Available Rewards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title">Movie Night</h3>
                            <p>Redeem 500 points for a movie night reward</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Redeem (500 pts)</button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title">Extra Screen Time</h3>
                            <p>Redeem 300 points for 1 hour of extra screen time</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Redeem (300 pts)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards; 