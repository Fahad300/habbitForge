import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingLayout = () => {
    return (
        <div className="min-h-screen bg-base-100" data-theme="habitforge">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default LandingLayout; 