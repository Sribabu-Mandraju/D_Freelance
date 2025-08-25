import React, { useState } from "react";
import axios from "axios";

const Cloudinary = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create previews for all selected images
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select images first.");
      return;
    }

    setIsUploading(true);
    const newUrls = [];

    try {
      // Upload images one by one
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("file", images[i]);
        formData.append("upload_preset", "Freelance_Website");
        formData.append("cloud_name", "dd33ovgv1");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
          formData
        );

        // Store the secure_url (viewable link) and public_id
        newUrls.push({
          url: res.data.secure_url,
          publicId: res.data.public_id,
          
          originalName: images[i].name,
        });

        console.log(`Uploaded ${images[i].name}:`, res.data);
      }

      setUploadedUrls((prev) => [...prev, ...newUrls]);
      alert(`${images.length} images uploaded successfully!`);

      // Clear the current selection
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const removeImage = (index) => {
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Upload Multiple Images to Cloudinary
      </h2>

      {/* File Input */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Selected Images ({previews.length}):
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {images[index]?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isUploading || images.length === 0}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
      >
        {isUploading
          ? `Uploading ${images.length} images...`
          : `Upload ${images.length} Images`}
      </button>

      {/* Uploaded Images with Links */}
      {uploadedUrls.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Uploaded Images ({uploadedUrls.length}):
          </h3>
          <div className="space-y-4">
            {uploadedUrls.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-4">
                  <img
                    src={item.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-700 mb-2">
                      {item.originalName}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={item.url}
                        readOnly
                        className="flex-1 p-2 border rounded text-sm bg-white"
                      />
                      <button
                        onClick={() => copyToClipboard(item.url)}
                        className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Public ID: {item.publicId}
                    </p>
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cloudinary;
