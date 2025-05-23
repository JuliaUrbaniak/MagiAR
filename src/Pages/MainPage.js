import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import spellbook from '../spellbook.png';

import HeaderMain from '../Components/HeaderMain';

import '../App.css';

function MainPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Uzyskaj dostęp do kamery
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Ustaw strumień jako źródło dla elementu <video>
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Błąd podczas uzyskiwania dostępu do kamery:", err);
      });
  }, []);

    const navigate = useNavigate();
  return (
    <>

    <div className='container'>

      <div className="row">
        <HeaderMain />
      </div>

      <div className='d-flex justify-content-center text-center mt-2 mt-lg-5'>

        <video ref={videoRef} autoPlay playsInline muted className="custom-video mb-4" />

      </div>

    </div>


    </>
  );
}
export default MainPage;