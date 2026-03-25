import { useEffect, useState } from "react";
import axios from "axios";
import adminBg from "../../assets/images/viewallbookingsf.jpg";
import { API_URL } from "../../api";
export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      console.log("BOOKINGS RECEIVED:", res.data);
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/admin/bookings/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      fetchBookings();
    } catch (err) {
      console.log("Status update error:", err);
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
      {/* MAIN CARD */}
      <div
        className="
          w-full max-w-5xl p-10 rounded-3xl
          bg-white/20 backdrop-blur-2xl border border-white/30
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          float-animation transition-all duration-500
          hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
          max-h-fit
        "
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900 drop-shadow flex items-center gap-2">
          📅 All Bookings
        </h1>

        {loading ? (
          <p className="text-lg text-center text-gray-900">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-900 text-center">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="
                  bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-lg 
                  hover:scale-[1.02] transition-all border border-white/40
                "
              >
                <h2 className="text-2xl font-semibold text-gray-900">
                  {b.professional || "Unknown Professional"}
                </h2>

                <p className="text-gray-700 mt-1">
                  👤 <b>{b.clientName}</b> — {b.clientEmail}
                </p>

                <p className="mt-1 text-gray-700">
                  🗓️ {b.date} | ⏰ {b.time}
                </p>

                {b.notes && (
                  <p className="mt-1 text-gray-800">📝 Notes: {b.notes}</p>
                )}

                <div className="mt-4">
                  <label className="font-semibold text-gray-800 mr-2">
                    Status:
                  </label>

                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className="
                      px-4 py-2 rounded-xl border shadow bg-white/80 
                      hover:bg-white transition
                    "
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
