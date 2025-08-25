import React, { useEffect } from 'react';
import '../css/home.css'
import axios from "axios";
import Cookies from 'js-cookie';
import devconfig from '../config';

const Home = () => {
  const [imagePreview, setImagePreview] = React.useState(null);
  const [image, setImage]  = React.useState(null);
  const [response, setResponse] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Processing...") //placeholder till the actual reponse is received
    // FormData to send the image as a file
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(`${devconfig.API_BASE_URL}/pnmodel/predict/`, formData, {
        withCredentials: true, 
      });
      setResponse(response.data.prediction); 
    } catch (error) {
      console.error("Error during prediction:", error);
      setResponse("Error during prediction");
    }
  };

  return (
    <div className="min-h-screen flex-col flex bg-gradient-to-br from-white to-blue-50 font-sans">
  {/* Main Section */}
  <section className="flex-1 container mx-auto px-6 py-12">
    <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
      Our Healthcare Features
    </h2>

    <div className="grid md:grid-cols-3 gap-10 items-start">
      {/* Pneumonia Detector */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        <h3 className="text-blue-600 font-bold text-2xl mb-4">
          Pneumonia Detector
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="px-2 text-gray-600 font-medium text-sm">
              Upload X-ray
            </legend>
            <input
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="default_size"
              type="file"
              onChange={handleFileChange}
            />
          </fieldset>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl shadow-md"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Predict
          </button>
        </form>
        <p className="mt-4 text-gray-700">{response}</p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        <h3 className="text-blue-600 font-bold text-2xl mb-4">Health Records</h3>
        <p className="text-gray-600 leading-relaxed">
          Securely store and access your medical records from anywhere, anytime.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        <h3 className="text-blue-600 font-bold text-2xl mb-4">
          Smart Appointments
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Book, track, and manage your hospital visits with real-time updates.
        </p>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-blue-900 text-white py-6 mt-auto">
    <div className="container mx-auto text-center">
      <p className="text-sm">© 2024 HealthCare App. All Rights Reserved.</p>
    </div>
  </footer>
</div>

  );
};

export default Home;
