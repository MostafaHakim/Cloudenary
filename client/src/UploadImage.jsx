import { useState } from "react";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Images"); // তোমার preset নাম বসাও

    try {
      const res = await fetch(
        "cloudinary://983431191483856:EmsEH72WH7JMsRRYGuNJ7ge_zpQ@dxyn1uoui//image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImageUrl(data.secure_url); // uploaded image URL
      setLoading(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-40 mt-2 rounded" />
        </div>
      )}
    </div>
  );
}
