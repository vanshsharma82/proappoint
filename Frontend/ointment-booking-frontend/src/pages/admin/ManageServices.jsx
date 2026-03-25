import { useEffect, useState } from "react";
import axios from "axios";
import adminBg from "../../assets/images/manageservicef.jpg";
import { API_URL } from "../../api";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    professionalId: ""
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Correct API base URL
  const API = `${API_URL}/admin/services`;

  // Load all professionals
  const loadProfessionals = async () => {
    try {
      const res = await axios.get(`${API_URL}/professionals`);
      setProfessionals(res.data);
    } catch (err) {
      console.log("Error loading professionals:", err);
    }
  };

  // Load all services
  const loadServices = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/services-all`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setServices(res.data);
    } catch (err) {
      console.log("Error loading services:", err);
    }
  };

  useEffect(() => {
    loadProfessionals();
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update service
  const saveService = async () => {
    if (!form.name || !form.duration || !form.price || !form.professionalId)
      return alert("All fields are required");

    const data = {
      name: form.name,
      duration: Number(form.duration),
      price: Number(form.price),
      professionalId: form.professionalId,
    };

    try {
      if (editingId) {
        // UPDATE
        await axios.put(
          `${API}/${editingId}`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
        );
      } else {
        // CREATE
        await axios.post(
          API,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
        );
      }

      alert("Service saved!");

      setForm({ name: "", duration: "", price: "", professionalId: "" });
      setEditingId(null);

      loadServices();
    } catch (err) {
      console.log("Error saving service:", err);
      alert("Failed to save service.");
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      professionalId: service.professionalId?._id || "",
    });
  };

  const deleteService = async (sid) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API}/${sid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      loadServices();
    } catch (err) {
      console.log("Error deleting service:", err);
    }
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
    {/* MAIN GLASS CONTAINER */}
    <div
      className="
        w-full max-w-5xl p-10 rounded-3xl
        bg-white/20 backdrop-blur-2xl border border-white/30
        shadow-[0_8px_40px_rgba(0,0,0,0.25)] 
        float-animation transition-all duration-500
        hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
      "
    >
      <h2 className="text-4xl font-bold mb-10 text-gray-900 drop-shadow">
        Manage Services
      </h2>

      {/* FORM CARD */}
      <div
        className="
          bg-white/40 backdrop-blur-xl p-8 rounded-2xl shadow-inner 
          border border-white/50 space-y-4 mb-10
        "
      >
        <input
          name="name"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl border bg-white/70 backdrop-blur
            shadow-sm focus:ring-2 focus:ring-blue-400 transition
          "
        />

        <input
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl border bg-white/70 backdrop-blur
            shadow-sm focus:ring-2 focus:ring-blue-400 transition
          "
        />

        <input
          name="price"
          placeholder="Price (Rs)"
          value={form.price}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl border bg-white/70 backdrop-blur
            shadow-sm focus:ring-2 focus:ring-blue-400 transition
          "
        />

        <select
          name="professionalId"
          value={form.professionalId}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl border bg-white/70 backdrop-blur
            shadow-sm focus:ring-2 focus:ring-blue-400 transition
          "
        >
          <option value="">Select Professional</option>
          {professionals.map((pro) => (
            <option key={pro._id} value={pro._id}>
              {pro.name} — {pro.specialization}
            </option>
          ))}
        </select>

        <button
          onClick={saveService}
          className="
            w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 hover:scale-[1.03] active:scale-95
            shadow-lg transition-all
          "
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* SERVICES LIST */}
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 drop-shadow">
        Existing Services
      </h3>

      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s._id}
            className="
              bg-white/50 backdrop-blur-xl p-5 rounded-2xl shadow-lg
              border border-white/40 flex justify-between items-center
              hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
              transition-all cursor-pointer
            "
          >
            <div>
              <p className="text-xl font-bold text-gray-900">{s.name}</p>
              <p className="text-gray-800 mt-1">
                ⏱ {s.duration} min — ₹{s.price}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                👨‍⚕️ {s.professionalId?.name}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => startEdit(s)}
                className="
                  px-5 py-2 bg-yellow-500 text-white rounded-xl 
                  hover:bg-yellow-600 hover:scale-[1.05] active:scale-95
                  shadow-md transition-all
                "
              >
                Edit
              </button>

              <button
                onClick={() => deleteService(s._id)}
                className="
                  px-5 py-2 bg-red-600 text-white rounded-xl 
                  hover:bg-red-700 hover:scale-[1.05] active:scale-95
                  shadow-md transition-all
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

}
