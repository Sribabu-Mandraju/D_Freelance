import React, { useState } from 'react';
import axios from 'axios';

const Cloudinary= () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Freelance_Website"); // ✅ Preset name as a string
    formData.append("cloud_name", "dd33ovgv1"); // ✅ Cloud name as a string

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
        formData
      );
      console.log(res.data);
      setUploadedUrl(res.data.secure_url);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" width="200" />}
      <br />
      <button onClick={handleUpload}>Upload</button>
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
};

export default Cloudinary;
