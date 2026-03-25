import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/addprofessionalf.jpg";
import { API_URL } from "../../api";
export default function AddProfessional() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    description: "",
    experience: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/admin/professionals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    navigate("/admin/professionals");
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100" 
    style={{
            backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
        backgroundPosition: "center",
          }}>
      <div
        className="max-w-3xl mx-auto bg-white/20 backdrop-blur-2xl p-10 rounded-3xl 
          shadow-xl border border-white/40 float-animation"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Professional</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. 5+ years)"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl w-full hover:bg-blue-700"
          >
            Add Professional
          </button>
        </form>
      </div>
    </div>
  );
}
