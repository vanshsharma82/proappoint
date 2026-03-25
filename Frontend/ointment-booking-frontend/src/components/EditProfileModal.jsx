import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
export default function EditProfileModal({ user, onClose, onUpdate }) {

  const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/848/848006.png";

  const initialPreview =
    user?.photo
      ? (user.photo.startsWith("http")
          ? user.photo
          : `${API_URL}${user.photo}`)
      : defaultPhoto;

  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [photo, setPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [preview, setPreview] = useState(initialPreview);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("removePhoto", removePhoto);

    if (photo) formData.append("photo", photo);

    try {
      const res = await axios.put(
        `${API_URL}/auth/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data.user;

      if (updated.photo) {
        updated.photo =
          updated.photo.startsWith("http")
            ? updated.photo
            : `${API_URL}${updated.photo}`;
      }

      localStorage.setItem("user", JSON.stringify(updated));
      onUpdate(updated);
      onClose();

    } catch (err) {
      console.log("Upload Error:", err);
      alert("Profile update failed!");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setRemovePhoto(false);
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setRemovePhoto(true);
    setPhoto(null);
    setPreview(defaultPhoto);
  };

  return (
    // 🌟 Beautiful soft overlay + blur effect
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">

      {/* 🌟 Glassmorphism modal card */}
      <div className="
        w-full max-w-lg p-8 rounded-2xl 
        bg-white/20 backdrop-blur-2xl 
        shadow-[0_0_30px_rgba(255,255,255,0.25)]
        border border-white/40
        animate-fadeUp
      ">

        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-900">

          {/* NAME */}
          <div>
            <label className="font-medium">Name</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg bg-white/70 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="font-medium">Phone</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg bg-white/70 focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* BIO */}
          <div>
            <label className="font-medium">Bio</label>
            <textarea
              rows={3}
              className="w-full mt-1 p-3 border rounded-lg bg-white/70 focus:outline-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* PHOTO SECTION */}
          <div>
            <label className="font-medium">Profile Photo</label>

            <div className="flex items-center gap-4 mt-2">

              {/* Preview */}
              <img
                src={preview}
                className="w-20 h-20 rounded-full object-cover border shadow"
              />

              {/* Choose File */}
              <label
                htmlFor="photoUpload"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
              >
                Choose File
              </label>

              <input
                type="file"
                id="photoUpload"
                className="hidden"
                onChange={handlePhotoChange}
              />

              {/* Remove */}
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>

          {/* BUTTONS */}
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
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
