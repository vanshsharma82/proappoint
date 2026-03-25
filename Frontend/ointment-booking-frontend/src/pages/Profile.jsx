import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import bgImage from "../assets/images/profilef.jpg";
import { API_URL } from "../api";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Format Last Login
  const formatDate = (dateStr) => {
    if (!dateStr) return "Not recorded";
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fix image path
  const getPhoto = () => {
    if (!user?.photo) {
      return "https://cdn-icons-png.flaticon.com/512/848/848006.png";
    }

    return user.photo.startsWith("http")
      ? user.photo
      : `${API_URL}${user.photo}`;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-24 flex justify-center items-start px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="
          w-full max-w-4xl bg-white/20 backdrop-blur-2xl
          border border-white/30 rounded-3xl p-12 animate-fadeUp
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          transition-all duration-500 hover:scale-[1.01]
          hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] float-animation
        "
      >
        {/* TITLE */}
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900 drop-shadow">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="text-gray-700 mt-3 max-w-lg">
            Manage your personal details, update profile information, and keep
            your account up to date — all in one place.
          </p>
        </div>

        <div className="w-full border-b border-white/30 my-8"></div>

        {/* PROFILE INFO */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={getPhoto()}
              className="w-40 h-40 rounded-full border-4 border-white/40 shadow-xl object-cover"
            />

            <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition">
              📷
            </button>
          </div>

          {/* DETAILS */}
          <div className="text-gray-900 space-y-4 text-lg">
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>

            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {user?.phone || "Not Added"}
            </p>

            <p>
              <span className="font-semibold">Role:</span>{" "}
              {user?.role?.toUpperCase()}
            </p>

            <div>
              <p className="font-semibold">Bio:</p>
              <p className="text-gray-800">
                {user?.bio ||
                  "No bio added yet. Add more information about yourself."}
              </p>
            </div>

            <p>
              <span className="font-semibold">Last Login:</span>{" "}
              {formatDate(user?.lastLogin)}
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <button
            onClick={() => setShowEdit(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            ✏ Edit Profile
          </button>

          <button
            onClick={() => setShowChangePass(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
          >
            🔐 Change Password
          </button>

          <Link
            to="/dashboard"
            className="px-6 py-3 bg-gray-200/50 backdrop-blur-md border border-white/30 rounded-xl shadow hover:bg-gray-300 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* MODALS */}
        {showEdit && (
          <EditProfileModal
            user={user}
            onClose={() => setShowEdit(false)}
            onUpdate={(newData) => setUser(newData)}
          />
        )}

        {showChangePass && (
          <ChangePasswordModal onClose={() => setShowChangePass(false)} />
        )}
      </div>
    </div>
  );
}
