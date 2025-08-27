import React, { useContext, useEffect } from 'react';
import '../css/home.css'
import axios from "axios";
import Cookies from 'js-cookie';
import devconfig from '../config';
import use_axios from '../requests';
import toast from 'react-hot-toast';
import AuthContext from '../AuthContext';

const Home = () => {
  const {uid} = useContext(AuthContext)
  const [imagePreview, setImagePreview] = React.useState(null);
  const [image, setImage]  = React.useState(null);
  const [prediction_result, setPredictionResult] = React.useState(null);
  const [pneumonia_status, setPneumoniaStatus] = React.useState(false);
  const [probability, setProbability] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

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

  // Handle Form submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictionResult("Processing...") //placeholder till the actual reponse is received
    // FormData to send the image as a file
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(`${devconfig.API_BASE_URL}/pnmodel/predict/`, formData, {
        withCredentials: true, 
      });
      const {pneumonia_status, pneumonia_probability
      } = response.data
      setPneumoniaStatus(pneumonia_status)
      setProbability(pneumonia_probability)
      setPredictionResult(`Pneumonia Status: ${pneumonia_status} Probability: ${pneumonia_probability}`); 
      
    } catch (error) {
      console.error("Error during prediction:", error);
      setPredictionResult("Error during prediction");
    }
  };


  // Handle Prediction save
  const handleSave = async (e) =>{
    e.preventDefault();
    setLoading(true);
    if(image == null){
      toast.error('Cannot save without image')
    }
    else{
      const formData = new FormData()
      formData.append('image', "image")
      formData.append('result',`Pneumonia: ${pneumonia_status}`)
      formData.append('confidence', Number(Number(probability).toFixed(2)))
      try{
        const response = await use_axios.post("/prediction/", formData)
        if (response.status == 201){
          toast.success("Prediction Saved.")
        }
      }
      catch(e){
        toast.error(e.response.data.detail)
      }

    }
  }

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
          <button 
          className='w-full bg-blue-600 hover:bg-gradient-to-l hover:from-teal-500 hover:to-green-500 text-white font-semibold py-2 px-4 rounded-lg transition'
          onClick={handleSave}
          >
          Save Prediction
          </button>
        </form>
        <p className="mt-4 text-gray-700">{prediction_result}</p>
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
