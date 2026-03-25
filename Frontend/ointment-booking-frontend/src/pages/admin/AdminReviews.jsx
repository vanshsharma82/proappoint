import { useEffect, useState } from "react";
import axios from "axios";
import adminBg from "../../assets/images/managereviewf.jpg";
import { API_URL } from "../../api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/reviews`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      console.log("REVIEWS RECEIVED:", res.data);
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching reviews:", err);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`${API_URL}/admin/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      fetchReviews();
    } catch (err) {
      console.log("Error deleting review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center"
      style={{
        backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 drop-shadow flex items-center gap-2">
          ⭐ Manage Reviews
        </h1>

        {loading ? (
          <p className="text-lg text-center text-gray-900">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-900">No reviews available.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="
                  bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-lg 
                  hover:scale-[1.02] transition-all border border-white/40
                "
              >
                {/* Professional */}
                <h2 className="text-xl font-semibold text-gray-900">
                  {r.professionalId?.name || "Unknown Professional"}
                </h2>

                {/* Stars */}
                <p className="text-yellow-500 text-xl mt-1">
                  {"★".repeat(r.rating)}
                  <span className="text-gray-300 ml-1">
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </p>

                {/* Review */}
                <p className="mt-3 text-gray-800 italic">"{r.comment}"</p>

                {/* Reviewer */}
                <p className="text-sm mt-2 text-gray-600">
                  — {r.userId?.name || "Anonymous"}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteReview(r._id)}
                  className="
                    mt-4 px-4 py-2 bg-red-600 text-white rounded-xl 
                    hover:bg-red-700 hover:scale-[1.04] active:scale-95 
                    transition-all shadow-lg
                  "
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
