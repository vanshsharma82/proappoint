import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminBg from "../../assets/images/manageprofessionalf.jpg"; // background for theme
import { API_URL } from "../../api";

export default function ManageProfessionals() {
  const navigate = useNavigate();
  const [pros, setPros] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/home");
      return;
    }

    fetch(`${API_URL}/professionals`)
      .then((res) => res.json())
      .then((data) => setPros(data))
      .catch((err) => console.log(err));
  }, []);

  const deletePro = async (id) => {
    if (!window.confirm("Are you sure you want to delete this professional?"))
      return;

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/admin/professionals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setPros((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center"
      style={{
        backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GLASS CONTAINER */}
      <div
        className="
          w-full max-w-6xl p-10 rounded-3xl 
          bg-white/20 backdrop-blur-2xl border border-white/30
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          float-animation transition-all duration-500
          hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
          max-h-fit
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 drop-shadow">
            Manage Professionals
          </h1>

          <button
            onClick={() => navigate("/admin/add-professional")}
            className="
              px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl
              hover:bg-blue-700 hover:scale-[1.03] active:scale-95
              shadow-lg transition-all
            "
          >
            + Add Professional
          </button>
        </div>

        {/* PROFESSIONAL CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pros.map((pro) => (
            <div
              key={pro._id}
              className="
                bg-white/40 backdrop-blur-xl border border-white/40 
                rounded-2xl p-6 shadow-lg
                hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
                transition-all cursor-pointer float-animation
              "
            >
              <img
                // src={
                //   pro.image ||
                //   "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                // }
                src={
  pro.image
    ? (pro.image.startsWith("http")
        ? pro.image
        : `${API_URL}${pro.image}`)
    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
}

                className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
                alt="professional"
              />

              <h2 className="text-xl font-semibold text-center mt-4 text-gray-900">
                {pro.name}
              </h2>

              <p className="text-center text-blue-700 font-medium">
                {pro.specialization}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => navigate(`/admin/edit-professional/${pro._id}`)}
                  className="
                    flex-1 bg-yellow-500 text-white py-2 rounded-xl 
                    hover:bg-yellow-600 hover:scale-[1.04] active:scale-95 
                    transition-all shadow-md
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePro(pro._id)}
                  className="
                    flex-1 bg-red-600 text-white py-2 rounded-xl 
                    hover:bg-red-700 hover:scale-[1.04] active:scale-95
                    transition-all shadow-md
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {pros.length === 0 && (
          <p className="text-center text-white text-lg mt-6">
            No professionals added yet.
          </p>
        )}
      </div>
    </div>
  );
}
