import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

export default function ChangePasswordModal({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating password");
    }
  };

  return (
    // 🔥 Smooth transparent dark overlay + blur
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">

      <div className="
        w-full max-w-lg p-8 rounded-2xl 
        bg-white/20 backdrop-blur-2xl 
        shadow-[0_0_30px_rgba(255,255,255,0.25)]
        border border-white/40
        animate-fadeUp
      ">

        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-900">

          <div>
            <label className="font-medium">Old Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg border bg-white/70 focus:outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">New Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg border bg-white/70 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Confirm New Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg border bg-white/70 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300/80 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
