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
        "https://api.cloudinary.com/v1_1/dxyn1uoui/image/upload", // ✅ তোমার cloud_name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Cloudinary response:", data);
      setImageUrl(data.secure_url); // ✅ Uploaded image URL
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
