import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bookingservicef.jpg";
import { API_URL } from "../api";
export default function ProfessionalServices() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pro, setPro] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/professionals/${id}`)
      .then((res) => res.json())
      .then((data) => setPro(data));

    fetch(`${API_URL}/services/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [id]);

  if (!pro) return <p className="pt-24 text-center">Loading...</p>;

  return (
  <div
    className="min-h-screen pt-24 px-6 flex justify-center"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* MAIN GLASS CONTAINER */}
    <div
      className="
        w-full max-w-4xl p-10 rounded-3xl
        bg-white/20 backdrop-blur-2xl border border-white/30
        shadow-[0_8px_40px_rgba(0,0,0,0.25)]
        float-animation transition-all duration-500
        hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
        max-h-fit
      "
    >
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 drop-shadow">
        Services by {pro.name}
      </h1>

      {/* SERVICES LIST */}
      {services.length === 0 ? (
        <p className="text-gray-800 text-lg">No services available.</p>
      ) : (
        <div className="space-y-5">
          {services.map((s) => (
            <div
              key={s._id}
              className="
                bg-white/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg
                border border-white/40 flex justify-between items-center
                hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
                transition-all cursor-pointer
              "
            >
              <div>
                <p className="text-xl font-bold text-gray-900">{s.name}</p>

                <p className="text-gray-700 mt-1">
                  ⏱ Duration: {s.duration} minutes
                </p>

                <p className="text-green-700 font-semibold mt-1">
                  ₹ {s.price}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/book/${pro._id}?service=${s._id}`)
                }
                className="
                  px-5 py-2 bg-blue-600 text-white rounded-xl
                  hover:bg-blue-700 hover:scale-[1.05] active:scale-95
                  shadow-md transition-all
                "
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="
          mt-8 w-full py-3 rounded-xl bg-gray-400 text-white
          hover:bg-gray-500 hover:scale-[1.02] active:scale-95
          transition-all shadow
        "
      >
        ← Back
      </button>
    </div>
  </div>
);

}
