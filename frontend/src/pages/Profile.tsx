const Profile = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Profile</h1>

            {/* Profile Information */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center gap-6">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="Profile" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">John Doe</h2>
                            <p className="text-base-content/70">john.doe@example.com</p>
                            <p className="text-base-content/70">Member since January 2024</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Total Streaks</h3>
                        <p className="text-3xl font-bold">12</p>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Current Streaks</h3>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Points Earned</h3>
                        <p className="text-3xl font-bold">1,250</p>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Notifications</span>
                            </label>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Push Notifications</span>
                            </label>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Dark Mode</span>
                            </label>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Language</span>
                            </label>
                            <select className="select select-bordered w-full">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 