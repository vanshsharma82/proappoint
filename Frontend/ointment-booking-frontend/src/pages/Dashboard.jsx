import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashbgImage from "../assets/images/dashboardf.jpg";
import { API_URL } from "../api";

export default function Dashboard() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/professionals`)
      .then((res) => res.json())
      .then((data) => setProfessionals(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredData = professionals.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? p.specialization === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center "
      style={{
        backgroundImage: `url(${dashbgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
    >
      {/* GLASS CONTAINER */}
      <div
        className="
          w-full max-w-6xl p-10 rounded-3xl 
          bg-white/20 backdrop-blur-xl border border-white/30 transition-all duration-500 
      hover:scale-[1.03]
      hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
          shadow-2xl float-animation  max-h-fit
        "
      >
        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search professionals..."
            className="
              w-full md:w-1/2 p-3 rounded-xl border 
              bg-white/50 backdrop-blur-xl shadow-md 
              focus:shadow-xl transition
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="
              p-3 rounded-xl border 
              bg-white/50 backdrop-blur-xl shadow-md 
              focus:shadow-xl transition
            "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Specializations</option>
            <option value="Dentist">Dentist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Physiotherapist">Physiotherapist</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>
        </div>

        {/* PROFESSIONAL CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredData.map((pro) => (
            <div
              key={pro._id}
              onClick={() => navigate(`/professional/${pro._id}`)}
              className="
                bg-white/30 backdrop-blur-xl border border-white/40
                p-6 rounded-3xl shadow-xl 
                hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
                transition-all duration-500 float-animation cursor-pointer
              "
            >
              <img
                src={
                  pro.image ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Pro"
                className="
                  w-24 h-24 mx-auto rounded-full object-cover mb-4 shadow-lg 
                  hover:scale-105 transition
                "
              />

              <h2 className="text-xl font-bold text-center text-gray-900">
                {pro.name}
              </h2>
              <p className="text-blue-700 text-center text-sm font-medium mt-1">
                {pro.specialization}
              </p>

              <p className="text-sm text-gray-600 mt-3 text-center leading-relaxed">
                {pro.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/book/${pro._id}`);
                }}
                className="
                  mt-5 w-full bg-blue-600 text-white py-2 rounded-xl
                  hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-300 shadow-md
                "
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
