import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Streaks from "./pages/Streaks";
import Feed from "./pages/Feed";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        <Routes>
          {/* Public Routes with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Protected Routes with AuthLayout */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AuthLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="streaks" element={<Streaks />} />
            <Route path="feed" element={<Feed />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
