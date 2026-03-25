import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api";
export default function AdminProServices() {
  const { id } = useParams(); // professional ID
  const [pro, setPro] = useState(null);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load professional details
  useEffect(() => {
    axios.get(`${API_URL}/professionals/${id}`)
      .then(res => setPro(res.data));
  }, [id]);

  // Load services of this professional only
  const loadServices = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${API_URL}/api/admin/services/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setServices(res.data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveService = async () => {
    const token = localStorage.getItem("token");

    if (!form.name || !form.duration || !form.price)
      return alert("All fields required!");

    if (editingId) {
      await axios.put(
        `${API_URL}/api/admin/services/${editingId}`,
        {
          name: form.name,
          duration: form.duration,
          price: form.price
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `${API_URL}/api/admin/services`,
        {
          professionalId: id,
          name: form.name,
          duration: form.duration,
          price: form.price
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setForm({ name: "", duration: "", price: "" });
    setEditingId(null);
    loadServices();
  };

  const deleteService = async (sid) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this service?")) return;

    await axios.delete(
      `${API_URL}/api/admin/services/${sid}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadServices();
  };

  if (!pro) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{pro.name} - Services</h1>

      {/* Add / Edit Service Form */}
      <div className="p-4 bg-white rounded-xl shadow-md mb-6">
        <input
          className="block w-full mb-2 p-2 border rounded"
          name="name"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="block w-full mb-2 p-2 border rounded"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
        />

        <input
          className="block w-full mb-2 p-2 border rounded"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
        />

        <button
          onClick={saveService}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* Service List */}
      <h2 className="text-xl font-semibold mb-3">Existing Services</h2>

      {services.map(s => (
        <div key={s._id} className="p-4 bg-gray-100 mb-2 rounded shadow flex justify-between">
          <div>
            <p className="font-bold">{s.name}</p>
            <p>{s.durationMinutes} minutes — ₹{s.price}</p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingId(s._id);
                setForm({ name: s.name, duration: s.durationMinutes, price: s.price });
              }}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteService(s._id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
