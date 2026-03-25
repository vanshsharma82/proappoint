import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import adminBg from "../../assets/images/editprofessionalf.jpg";
import { API_URL } from "../../api";

export default function EditProfessional() {
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultPhoto =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    description: "",
    image: "" // Existing saved path
  });

  const [file, setFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [preview, setPreview] = useState(defaultPhoto);

  // Fetch professional data
  useEffect(() => {
    const fetchPro = async () => {
      try {
        const res = await axios.get(`${API_URL}/professionals/${id}`);

        setForm({
          name: res.data.name,
          specialization: res.data.specialization,
          description: res.data.description || "",
          image: res.data.image || ""
        });

        setPreview(
          res.data.image
            ? (res.data.image.startsWith("http")
                ? res.data.image
                : `${API_URL}${res.data.image}`)
            : defaultPhoto
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
        alert("Failed to load professional.");
      }
    };

    fetchPro();
  }, [id]);

  // Handle Text Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setRemoveImage(false); // Because user chose a new image
    setPreview(URL.createObjectURL(f));
  };

  // Remove Photo
  const handleRemovePhoto = () => {
    setFile(null);
    setRemoveImage(true);
    setPreview(defaultPhoto);
  };

  // Update Professional
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("specialization", form.specialization);
      formData.append("description", form.description);
      // formData.append("removeImage", removeImage);

      // if (file) {
      //   formData.append("image", file);
      // }
      formData.append("removePhoto", removeImage);

if (file) {
  formData.append("photo", file);
}


      // await axios.put(
      //   `http://localhost:4000/admin/professionals/${id}`,
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" }
      //   }
      // );
      await axios.put(
  `${API_URL}/admin/professionals/${id}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);


      alert("Professional updated!");
      navigate("/admin/professionals");
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  // Delete Professional
  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure? This cannot be undone.")) return;

  //   try {
  //     await axios.delete(`http://localhost:4000/admin/professionals/${id}`);
  //     alert("Professional deleted.");
  //     navigate("/admin/professionals");
  //   } catch (err) {
  //     console.log(err);
  //     alert("Delete failed.");
  //   }
  // };
const handleDelete = async () => {
  if (!window.confirm("Are you sure? This cannot be undone.")) return;

  try {
    await axios.delete(`${API_URL}/admin/professionals/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Professional deleted.");
    navigate("/admin/professionals");
  } catch (err) {
    console.log(err);
    alert("Delete failed.");
  }
};

  if (loading)
    return <p className="text-center mt-10 text-xl text-white">Loading...</p>;

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

        <h2 className="text-4xl font-bold mb-8 text-gray-900 drop-shadow">
          Edit Professional
        </h2>

       {/* FORM CARD */}
<div
  className="
    bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-inner
    border border-white/40 space-y-5
  "
>
  {/* === PROFILE IMAGE AT TOP CENTER === */}
  <div className="flex flex-col items-center mb-4">
    <p className="font-semibold text-gray-700 mb-2">Profile Image</p>

    <img
      src={preview}
      className="w-28 h-28 rounded-full object-cover shadow border mb-3"
    />

    <div className="flex gap-4">
      <label
        htmlFor="imageUpload"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
      >
        Choose File
      </label>

      <input
        id="imageUpload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleRemovePhoto}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Remove
      </button>
    </div>
  </div>

  {/* === INPUT FIELDS AFTER IMAGE === */}
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={form.name}
    onChange={handleChange}
    className="
      w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
      shadow-sm focus:ring-2 focus:ring-blue-400 transition
    "
  />

  <input
    type="text"
    name="specialization"
    placeholder="Specialization"
    value={form.specialization}
    onChange={handleChange}
    className="
      w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
      shadow-sm focus:ring-2 focus:ring-blue-400 transition
    "
  />

  <textarea
    name="description"
    rows="3"
    placeholder="Description"
    value={form.description}
    onChange={handleChange}
    className="
      w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
      shadow-sm focus:ring-2 focus:ring-blue-400 transition
    "
  />
</div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="
            flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 hover:scale-[1.03] active:scale-95
            shadow-md
          "
          >
            Save Changes
          </button>

          <button
            onClick={handleDelete}
            className="
            flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold
            hover:bg-red-700 hover:scale-[1.03] active:scale-95
            shadow-md
          "
          >
            Delete Professional
          </button>
        </div>

        <button
          onClick={() => navigate("/admin/professionals")}
          className="
          mt-6 w-full py-3 rounded-xl bg-gray-300 hover:bg-gray-400
          hover:scale-[1.02] active:scale-95 transition
        "
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
