import React, { useEffect } from 'react';
import '../css/home.css'; // Import styles if you create a separate CSS file.
import axios from "axios";
import Cookies from 'js-cookie';

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
      const response = await axios.post("http://127.0.0.1:8000/pnDetection/predict/", formData, {
        withCredentials: true, 
      });

      setResponse(response.data.prediction); 
    } catch (error) {
      console.error("Error during prediction:", error);
      setResponse("Error during prediction");
    }
  };

  return (
    <div className="home-container">
      <section className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Pneumonia Detector</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
              <button type="submit">Predict</button>
            </form>
            <p>{response}</p>
          </div>
          <div className="feature">
            <h3>Feature 2</h3>
            <p>Describe feature 2 here.</p>
          </div>
          <div className="feature">
            <h3>Feature 3</h3>
            <p>Describe feature 3 here.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2024 My App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
