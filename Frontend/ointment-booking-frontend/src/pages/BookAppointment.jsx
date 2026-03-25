import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bookappointmentf.jpg";
import { API_URL } from "../api";
export default function BookAppointment() {
  const { professionalId } = useParams();
  const navigate = useNavigate();

  const [professional, setProfessional] = useState(null);
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  // Fetch professional details
  useEffect(() => {
    fetch(`${API_URL}/professionals/${professionalId}`)
      .then((res) => res.json())
      .then((data) => setProfessional(data))
      .catch((err) => console.log(err));
  }, [professionalId]);

  const handleBooking = async () => {
    if (!date || !selectedSlot) {
      alert("Please select a date and time slot");
      return;
    }

    const bookingData = {
      professionalId,
      date,
      time: selectedSlot,
      userId: JSON.parse(localStorage.getItem("user"))?.id,
    };

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      alert("Appointment booked successfully!");
      navigate("/dashboard");
    } else {
      alert("the appointment is already booked, please choose another slot.");
    }
  };

  if (!professional) {
    return <p className="pt-24 text-center text-gray-600">Loading...</p>;
  }

  return (
    <div
      className="min-h-screen pt-24 flex justify-center items-start px-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="
          w-full max-w-4xl bg-white/20 backdrop-blur-2xl rounded-3xl
          border border-white/40 shadow-2xl p-10 mt-10
          float-animation transition-all duration-500
        "
      >
        
        {/* PROFESSIONAL HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={professional.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            className="w-32 h-32 rounded-full object-cover shadow-xl"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {professional.name}
            </h2>
            <p className="text-blue-700 font-medium mt-1">
              {professional.specialization}
            </p>
            <p className="text-gray-700 mt-2">{professional.description}</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-white/50 my-6"></div>

        {/* DATE PICKER */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Select Date</h3>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="
              mt-3 p-3 rounded-xl border bg-white/60 backdrop-blur-lg 
              shadow-md focus:shadow-lg transition
            "
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* SLOT SELECTION */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Available Time</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`
                  p-3 rounded-xl text-center shadow-md transition-all
                  ${selectedSlot === slot
                    ? "bg-blue-600 text-white scale-105"
                    : "bg-white/50 backdrop-blur-lg hover:bg-white/70"}
                `}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* BOOK BUTTON */}
        <button
          onClick={handleBooking}
          className="
            mt-8 w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg
            hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300
          "
        >
          Confirm Appointment
        </button>

      </div>
    </div>
  );
}
