import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <AuthNavbar />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout; 