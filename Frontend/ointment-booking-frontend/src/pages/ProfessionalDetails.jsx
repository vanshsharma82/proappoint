import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/professionalprofilef.jpg";
import { API_URL } from "../api";

export default function ProfessionalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pro, setPro] = useState(null);
  const [services, setServices] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
const [popupText, setPopupText] = useState("");


  const user = JSON.parse(localStorage.getItem("user")); // ⭐ for admin check

  // Fetch Professional Info
  useEffect(() => {
    fetch(`${API_URL}/professionals/${id}`)
      .then((res) => res.json())
      .then((data) => setPro(data))
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch Services of this Professional (PUBLIC route)
  useEffect(() => {
    fetch(`${API_URL}/services/${id}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!pro)
    return <p className="pt-24 text-center text-gray-600">Loading...</p>;
  

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center items-start"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="
          w-full max-w-4xl bg-white/20 backdrop-blur-2xl rounded-3xl 
          border border-white/40 shadow-2xl p-10 mt-10 float-animation
        "
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={
              pro.image ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            className="w-40 h-40 rounded-full shadow-2xl object-cover"
          />

          <div>
            <h1 className="text-4xl font-bold text-gray-900">{pro.name}</h1>
            <p className="text-blue-700 text-xl font-medium mt-1">
              {pro.specialization}
            </p>

            <p className="mt-1 text-gray-700">
              <b>Experience:</b> {pro.experience || "5+ years"}
            </p>

            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < (pro.rating || 4) ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="mt-4 text-gray-700">{pro.description}</p>
          </div>
        </div>

        <div className="border-b border-white/50 my-8"></div>

        {/* WORKING HOURS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Working Hours
          </h2>
          <div className="bg-white/40 p-4 rounded-xl shadow-inner">
            <p className="text-gray-800">Mon–Fri: 10 AM – 6 PM</p>
            <p className="text-gray-800">Sat: 10 AM – 2 PM</p>
            <p className="text-gray-800">Sun: Closed</p>
          </div>
        </div>

        {/* ⭐ SERVICES SECTION ⭐ */}
        {/* <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Services Offered
          </h2>

          {services.length === 0 ? (
            <p className="text-gray-700">No services added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <div
                  key={s._id}
                  className="
                    bg-white/30 p-4 rounded-xl shadow-md 
                    hover:shadow-lg hover:bg-white/40 transition-all cursor-pointer
                  "
                  onClick={() => navigate(`/book/${pro._id}`)} // user can book
                >
                  <h3 className="text-lg font-semibold">{s.name}</h3>

                  <p className="text-sm mt-1 font-medium text-blue-700">
                    Duration: {s.durationMinutes} minutes
                  </p>

                  <p className="text-sm font-semibold mt-1 text-green-700">
                    ₹ {s.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div> */}
        <button
          onClick={() => navigate(`/professional/${pro._id}/services`)}
          className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          View Services
        </button>

        {/* ⭐ ADMIN — Add Service Button ⭐ */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin/services")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            + Add Service
          </button>
        )}

        {/* REVIEWS */}
        {/* ⭐ REVIEWS SECTION (DYNAMIC) ⭐ */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reviews</h2>

          {/* User Review Form (only visible if logged in & not admin) */}
          {user && user.role !== "admin" && (
            <div className="bg-white/40 p-4 rounded-xl shadow mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Write a Review
              </h3>

              <select
                className="w-full p-2 rounded-lg border mb-3"
                value={null}
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    userRating: Number(e.target.value),
                  }))
                }
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} ★
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review here..."
                className="w-full p-3 rounded-lg border bg-white/70 mb-3"
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    userComment: e.target.value,
                  }))
                }
              ></textarea>

              <button
                onClick={async () => {
                  if (!services.userRating || !services.userComment)
                    return alert("Please provide rating & review.");

                  const res = await fetch(`${API_URL}/reviews`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                      professionalId: id,
                      rating: services.userRating,
                      reviewText: services.userComment,
                    }),
                  });

                  const data = await res.json();
                  alert(data.message);

                  // Reload page reviews
                  window.location.reload();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          )}

          {/* ⭐ FETCH REVIEWS ⭐ */}
          <ReviewList professionalId={id} />
        </div>

        {/* CONTACT BUTTONS */}
        {/* <div className="mt-10 flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition">
            📞 Call
          </button>

          <button className="flex-1 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition">
            ✉ Email
          </button>
        </div> */}
        <div className="mt-10 flex gap-4">
  <button
    onClick={() => {
      setPopupText("📞 Call feature is not available yet.");
      setShowPopup(true);
    }}
    className="flex-1 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition"
  >
    📞 Call
  </button>

  <button
    onClick={() => {
      setPopupText("✉ Email feature is not available yet.");
      setShowPopup(true);
    }}
    className="flex-1 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
  >
    ✉ Email
  </button>
</div>


        <button
          onClick={() => navigate(`/book/${pro._id}`)}
          className="
            mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl shadow-xl 
            hover:bg-indigo-700 hover:scale-[1.02] transition-all duration-300
          "
        >
          Book Appointment
        </button>
        {/* 🔔 POPUP MODAL */}
{showPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div
      className="
        bg-white/20 backdrop-blur-2xl 
        border border-white/40 
        rounded-3xl p-8 w-[350px] text-center
        shadow-2xl
      "
    >
      <p className="text-lg font-semibold text-gray-900 mb-6">
        {popupText}
      </p>

      <button
        onClick={() => setShowPopup(false)}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        OK
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
  
}
// function ReviewList({ professionalId }) {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:4000/reviews/${professionalId}`)
//       .then((res) => res.json())
//       .then((data) => setReviews(data));
//   }, [professionalId]);

//   if (reviews.length === 0)
//     return <p className="text-gray-700">No reviews yet.</p>;

//   return (
//     <div className="space-y-4">
//       {reviews.map((r) => (
//         <div key={r._id} className="bg-white/40 p-4 rounded-xl shadow">
//           {/* <p className="font-semibold flex items-center gap-2">
//             <img
//               src={
//                 r.userId?.photo ||
//                 "https://cdn-icons-png.flaticon.com/512/847/847969.png"
//               }
//               className="w-8 h-8 rounded-full"
//             />
//             {r.userId?.name || "Unknown User"}
//           </p> */}
//           <p className="font-semibold flex items-center gap-2">
//             <img
//               src={
//                 r.userId?.photo && r.userId.photo.trim() !== ""
//                   ? `http://localhost:4000${r.userId.photo}`
//                   : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
//               }
//               className="w-8 h-8 rounded-full object-cover shadow"
//               alt="User"
//             />
//             {r.userId?.name || "Unknown User"}
//           </p>

//           {/* Stars */}
//           <p className="text-yellow-500 text-lg">
//             {"★".repeat(r.rating)}{" "}
//             <span className="text-gray-400">{"★".repeat(5 - r.rating)}</span>
//           </p>

//           <p className="text-gray-700 mt-1">{r.comment}</p>
//         </div>
//       ))}
//     </div>
//   );
//}
function ReviewList({ professionalId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/reviews/${professionalId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [professionalId]);

  if (reviews.length === 0)
    return <p className="text-gray-700">No reviews yet.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-white/40 p-4 rounded-xl shadow backdrop-blur-xl"
        >
          {/* USER PHOTO + NAME */}
          <p className="font-semibold flex items-center gap-2">
            <img
              src={
                r.userId?.photo && r.userId.photo.trim() !== ""
                  ? `${API_URL}${r.userId.photo}`
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              className="w-8 h-8 rounded-full object-cover shadow"
              alt="User"
            />
            {r.userId?.name || "Unknown User"}
          </p>

          {/* ⭐ ANIMATED STARS ⭐ */}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xl transition-all duration-300 ${
                  i < r.rating ? "text-yellow-400 scale-110" : "text-gray-300"
                }`}
                style={{
                  animation: i < r.rating ? "pop 0.3s ease forwards" : "none",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* REVIEW TEXT */}
          <p className="text-gray-700 mt-2">{r.reviewText}</p>

          {/* 📅 DATE */}
          <p className="text-xs text-gray-500 mt-1">
            {new Date(r.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}


