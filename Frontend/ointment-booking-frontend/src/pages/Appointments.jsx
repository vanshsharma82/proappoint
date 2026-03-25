import { useEffect, useState } from "react";
import appointbgImage from "../assets/images/appointmentback.jpg";
import { API_URL } from "../api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("active"); // active | history

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`${API_URL}/bookings/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.log(err));
  }, []);

  const cancelBooking = async (bookingId) => {
    const res = await fetch(
      `${API_URL}/bookings/cancel/${bookingId}`,
      { method: "PUT" }
    );

    if (res.ok) {
      alert("Appointment cancelled!");
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === bookingId ? { ...appt, status: "cancelled" } : appt
        )
      );
    }
  };
const filteredAppointments =
  view === "active"
    ? appointments.filter((a) => a.status !== "cancelled")
    : appointments.filter((a) => a.status === "cancelled");

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center"
      style={{
        backgroundImage: `url(${appointbgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GLASS CONTAINER */}
      <div
        className="
        w-full max-w-5xl p-10 rounded-3xl 
        bg-white/20 backdrop-blur-2xl border border-white/30
        shadow-2xl float-animation transition-all duration-500
        hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
        max-h-fit
      "
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          My Appointments
        </h1>
        <div className="flex justify-center gap-4 mb-8">
  <button
    onClick={() => setView("active")}
    className={`px-6 py-2 rounded-xl font-semibold transition-all
      ${
        view === "active"
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-white/40 text-gray-800"
      }`}
  >
    Booked Appointments
  </button>

  <button
    onClick={() => setView("history")}
    className={`px-6 py-2 rounded-xl font-semibold transition-all
      ${
        view === "history"
          ? "bg-gray-700 text-white shadow-lg"
          : "bg-white/40 text-gray-800"
      }`}
  >
    Watch History
  </button>
</div>


        <div className="space-y-6">
          {filteredAppointments.map((appt) => {
            const pro = appt.professionalId;
            const slot = appt.slotId;

            const isCancelled = appt.status === "cancelled";

            const cardClasses = isCancelled
              ? "bg-white/20 backdrop-blur-xl border border-white/30 opacity-60 shadow-md"
              : "bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]";

            return (
              <div
                key={appt._id}
                className={`rounded-3xl p-6 transition-all float-animation ${cardClasses}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Professional Image */}
                  <img
                    src={
                      pro?.image ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    className="w-24 h-24 rounded-full shadow-xl object-cover"
                  />

                  {/* Appointment Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {pro?.name}
                    </h2>
                    <p className="text-blue-700 font-medium">
                      {pro?.specialization}
                    </p>

                    <p className="text-gray-700 mt-2">
                      <b>Date:</b> {slot?.date}
                    </p>
                    <p className="text-gray-700">
                      <b>Time:</b> {slot?.time}
                    </p>

                    {/* STATUS BADGE */}
                    <span
                      className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold 
                        ${
                          appt.status === "confirmed"
                            ? "bg-green-200 text-green-700"
                            : appt.status === "cancelled"
                            ? "bg-gray-300 text-gray-700"
                            : "bg-yellow-200 text-yellow-700"
                        }
                      `}
                    >
                      {appt.status.toUpperCase()}
                    </span>
                  </div>

                  {/* CANCEL BUTTON */}
                  {!isCancelled && (
                    <button
                      onClick={() => cancelBooking(appt._id)}
                      className="
                        px-6 py-3 bg-red-600 text-white rounded-xl shadow-md 
                        hover:bg-red-700 hover:scale-105 
                        transition-all duration-300
                      "
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredAppointments.length === 0 && (
            <p className="text-center text-gray-200 text-lg">
              You don’t have any appointments yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
