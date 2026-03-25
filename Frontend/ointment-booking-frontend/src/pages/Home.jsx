import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/homef.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center px-6 pt-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* TRANSPARENT CENTER CARD */}
      <div
        className="
          bg-white/20 backdrop-blur-2xl 
          border border-white/30 
          w-[90%] max-w-5xl rounded-3xl p-10 
          flex flex-col md:flex-row items-center 
          shadow-2xl 
          transition-all duration-500 
          hover:bg-white/30 
          hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
          relative overflow-hidden
          float-animation   /* <— Animation added */
        "
      >

        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 drop-shadow-md">
            Welcome{user && `, ${user.name}`} 👋
          </h1>

          <p className="text-gray-900 font-medium text-lg mb-6 leading-relaxed">
            Book appointments with doctors, tutors, consultants and other
            professionals — all in one place. Manage your schedule effortlessly
            with <b>ProAppoint</b>.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              px-6 py-3 bg-blue-600 text-white rounded-lg 
              shadow-md hover:bg-blue-700 
              transition-all text-lg font-semibold
            "
          >
            Start Booking
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9079/9079529.png"
            alt="Appointment Illustration"
            className="w-64 md:w-80 drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
}
