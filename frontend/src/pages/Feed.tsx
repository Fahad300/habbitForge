const Feed = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Activity Feed</h1>
            <div className="space-y-4">
                {/* Add feed content here */}
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="John Doe" />
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title">John Doe</h2>
                                <p className="text-sm text-base-content/70">2 hours ago</p>
                            </div>
                        </div>
                        <p>Completed 30 days of daily meditation! 🧘‍♂️</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-ghost btn-sm">Like</button>
                            <button className="btn btn-ghost btn-sm">Comment</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://ui-avatars.com/api/?name=Jane+Smith&background=random" alt="Jane Smith" />
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title">Jane Smith</h2>
                                <p className="text-sm text-base-content/70">5 hours ago</p>
                            </div>
                        </div>
                        <p>Just earned the "Early Bird" badge for completing morning exercise 7 days in a row! 🌅</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-ghost btn-sm">Like</button>
                            <button className="btn btn-ghost btn-sm">Comment</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://ui-avatars.com/api/?name=Mike+Johnson&background=random" alt="Mike Johnson" />
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title">Mike Johnson</h2>
                                <p className="text-sm text-base-content/70">1 day ago</p>
                            </div>
                        </div>
                        <p>Reached 100 days of reading streak! 📚</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-ghost btn-sm">Like</button>
                            <button className="btn btn-ghost btn-sm">Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed; 