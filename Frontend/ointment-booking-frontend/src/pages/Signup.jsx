import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import signupBg from "../assets/images/loginf.jpg"; // using same bg for theme
import { API_URL } from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!user.name || !user.email || !user.password)
      return setError("All fields are required");

    setLoading(true);
    try {
      // const res = await axios.post("http://localhost:4000/auth/signup", user);

      const res = await axios.post(`${API_URL}/auth/signup`, user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Email already exists or invalid input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          w-full fixed top-0 left-0 z-50
          bg-[#0d1a3a]/80 backdrop-blur-lg 
          text-white px-10 py-4 shadow-lg 
          flex justify-between items-center
        "
      >
        <h1 className="text-2xl font-bold tracking-wide">ProAppoint</h1>

        <Link
          to="/"
          className="
            px-4 py-2 bg-white/10 hover:bg-white/20 
            rounded-lg transition border border-white/20
          "
        >
          Login
        </Link>
      </nav>

      {/* PAGE BACKGROUND */}
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-24"
        style={{
          backgroundImage: `url(${signupBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Floating Glass Card */}
        <div
          className="
            w-[90%] max-w-5xl mx-auto p-10 rounded-3xl
            bg-white/20 backdrop-blur-2xl border border-white/30
            flex flex-col md:flex-row items-center
            shadow-2xl transition-all duration-500 
            hover:bg-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
            relative overflow-hidden float-animation
          "
        >
          {/* LEFT PANEL */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0d1a3a]/90 to-[#1d3b70]/90 text-white p-12 rounded-2xl">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md">
              PA
            </div>

            <h2 className="text-3xl font-bold mb-6">Create Account</h2>

            <div className="space-y-4 text-white/90">
              <div className="bg-white/10 px-5 py-3 rounded-xl shadow">
                ✔ Register in seconds
              </div>
              <div className="bg-white/10 px-5 py-3 rounded-xl shadow">
                ✔ Book appointments instantly
              </div>
              <div className="bg-white/10 px-5 py-3 rounded-xl shadow">
                ✔ Track & manage bookings
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>

            {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

            {/* Full Name */}
            <label className="text-gray-900 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border px-4 py-3 rounded-lg mb-4 bg-white/70 backdrop-blur-sm"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            {/* Email */}
            <label className="text-gray-900 text-sm mb-1">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-3 rounded-lg mb-4 bg-white/70 backdrop-blur-sm"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            {/* Password */}
            <label className="text-gray-900 text-sm mb-1">Password</label>
            <div className="relative mb-6">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              {/* Eye Icon */}
              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-700"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Create Account Button */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="
                w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg
                shadow-md transition disabled:opacity-50 mb-3
              "
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-sm text-gray-900">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline font-medium">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
