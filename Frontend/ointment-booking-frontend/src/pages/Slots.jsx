import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

function Slots() {
  const pro = JSON.parse(localStorage.getItem("selectedProfessional"));
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    if (!date) return;
    const res = await axios.get(`${API_URL}/slots/${pro._id}/${date}`);
    setSlots(res.data);
  };

  const bookSlot = async (slotId) => {
    await axios.post(`${API_URL}/slots/book`, { slotId });
    alert("Slot booked successfully!");
    fetchSlots(); // reload
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Available Slots for {pro.name}</h2>

      <label>Select Date:</label><br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /><br /><br />

      <button onClick={fetchSlots}>Load Slots</button>

      <h3 style={{ marginTop: "20px" }}>Time Slots</h3>

      {slots.length === 0 ? (
        <p>No slots available for this date</p>
      ) : (
        slots.map(slot => (
          <div key={slot._id} style={{ marginBottom: "10px" }}>
            {slot.time} —
            {slot.isBooked ? (
              <span style={{ color: "red", marginLeft: "8px" }}>
                Booked
              </span>
            ) : (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => bookSlot(slot._id)}
              >
                Book
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Slots;
