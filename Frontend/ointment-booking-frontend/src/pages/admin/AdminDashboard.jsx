import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admindashbgImage from "../../assets/images/adminpanelf.jpg";


export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/home");
    }
  }, []);

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center items-start"
      style={{
        backgroundImage: `url(${admindashbgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GLASS CARD */}
      <div
        className="
          w-full max-w-4xl p-10 rounded-3xl 
          bg-white/20 backdrop-blur-2xl border border-white/30
          shadow-2xl float-animation transition-all duration-500
          hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
        "
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Admin Dashboard
        </h1>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Link
            to="/admin/professionals"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg backdrop-blur-xl
              hover:scale-[1.04] active:scale-95 transition-all
              text-center font-semibold text-gray-900 border border-white/30
            "
          >
            Manage Professionals
          </Link>

          <Link
            to="/admin/services"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg backdrop-blur-xl
              hover:scale-[1.04] active:scale-95 transition-all
              text-center font-semibold text-gray-900 border border-white/30
            "
          >
            Manage Services
          </Link>

          <Link
            to="/admin/bookings"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg backdrop-blur-xl
              hover:scale-[1.04] active:scale-95 transition-all
              text-center font-semibold text-gray-900 border border-white/30
            "
          >
            View All Bookings
          </Link>

          <Link
            to="/admin/reviews"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg backdrop-blur-xl
              hover:scale-[1.04] active:scale-95 transition-all
              text-center font-semibold text-gray-900 border border-white/30
            "
          >
            Manage Reviews
          </Link>

        </div>
      </div>
    </div>
  );
}
