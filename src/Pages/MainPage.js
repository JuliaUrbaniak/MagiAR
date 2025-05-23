import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import spellbook from '../spellbook.png';

import HeaderMain from '../Components/HeaderMain';

import '../App.css';

function MainPage() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

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

  function captureFrame() {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }

  async function handleCalibration() {
    const image = captureFrame();
    const response = await fetch('https://magiar-backend.onrender.com/kalibracja', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image }),
    });
    const data = await response.json();
    alert(`Threshold ustawiony: ${data.threshold}`);
  }

  async function handleCastSpell() {
    const image = captureFrame();
    const response = await fetch('https://magiar-backend.onrender.com/zaklecie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image }),
    });
    const data = await response.json();
    alert(`Zaklęcie wykryte: ${data.zaklecie}`);
  }

  return (
    <>
      <div className='container'>

        <div className="row">
          <HeaderMain />
        </div>

        <div className='d-flex flex-column align-items-center text-center mt-2 mt-lg-5'>

          <video ref={videoRef} autoPlay playsInline muted className="custom-video mb-4" />

          <div className="d-flex gap-3">
            <button onClick={handleCalibration} className="btn btn-primary">Kalibracja</button>
            <button onClick={handleCastSpell} className="btn btn-success">Rzuć zaklęcie</button>
          </div>

        </div>

      </div>
    </>
  );
}

export default MainPage;
