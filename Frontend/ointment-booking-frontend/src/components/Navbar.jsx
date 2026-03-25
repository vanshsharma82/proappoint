import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")); // 👈 ADD THIS

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-blue-300 font-semibold" : "text-white";

  return (
    <nav className="w-full bg-[#0d1a3a] text-white px-10 py-4 shadow-md flex justify-between items-center">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/home")}
        className="text-2xl font-bold tracking-wide cursor-pointer"
      >
        ProAppoint
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center space-x-8 text-lg">

        <Link to="/home" className={`${isActive("/home")} hover:text-blue-300 transition`}>
          Home
        </Link>

        <Link to="/dashboard" className={`${isActive("/dashboard")} hover:text-blue-300 transition`}>
          Dashboard
        </Link>

        <Link to="/about" className={`${isActive("/about")} hover:text-blue-300 transition`}>
          About Us
        </Link>

        <Link to="/profile" className={`${isActive("/profile")} hover:text-blue-300 transition`}>
          Profile
        </Link>

        <Link to="/appointments" className="hover:text-blue-300">
          Appointments
        </Link>
        <Link to="/contact" className= "hover:text-blue-300 transition">Contact Us</Link>
       


        {/* ⭐ ADMIN LINK (visible only if user.role === "admin") */}
        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-blue-300">
            Admin Panel
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition shadow-md hover:shadow-red-400/40"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
