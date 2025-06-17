import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

import spellbook from '../spellbook.png';

import HeaderMain from '../Components/HeaderMain';

import '../App.css';

function MainPage() {
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(null);
    const [calibrating, setCalibrating] = useState(false);

    const [flash, setFlash] = useState(false);
    const [showScanningText, setShowScanningText] = useState(false);

    const [castingCountdown, setCastingCountdown] = useState(null);
    const [showCastingText, setShowCastingText] = useState(false);

    const [detectedSpell, setDetectedSpell] = useState(null);

    const SPELL_INFO = {
        "Glacius_V": {
            name: "Glacius",
            icon: "❄️",
        },
        "Ignis_A": {
            name: "Ignis",
            icon: "🔥",
        },
        "Protego_O": {
            name: "Protego",
            icon: "🛡️",
        },
        "Fulmen_Triangle": {
            name: "Fulmen",
            icon: "⚡",
        },
        "Silencio_Line_Horizontal": {
            name: "Silencio",
            icon: "🤫",
        },
        "Umbra_Bowl": {
            name: "Umbra",
            icon: "🌑",
        },
        "Ascensio_Line_Vertical": {
            name: "Ascensio",
            icon: "☁️",
        },
        "Tenebrae_C": {
            name: "Tenebrae",
            icon: "🖤",
        },
        "Tempestas_7": {
            name: "Tempestas",
            icon: "🌪️",
        },
        "Lux_L": {
            name: "Lux",
            icon: "✨",
        },
    };

    useEffect(() => {
        if (detectedSpell) {
            console.log("🔮 WYKRYTO ZAKLĘCIE:", detectedSpell);
        }
    }, [detectedSpell]);


    useEffect(() => {
        // Get camera access
        navigator.mediaDevices.getUserMedia({video: true})
            .then((stream) => {
                // Set stream as video source
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                console.error("Error accessing camera:", err);
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
        setCalibrating(true);
        let seconds = 5;
        setCountdown(seconds);

        const interval = setInterval(() => {
            seconds -= 1;
            setCountdown(seconds);

            if (seconds === 0) {
                clearInterval(interval);
                setCountdown(null);
                setCalibrating(false);

                //Start short flash animation
                setShowScanningText(true);
                setFlash(true);

                setTimeout(() => {
                    setFlash(false);

                    setTimeout(async () => {
                        setShowScanningText(false);

                        const image = captureFrame();

                        const response = await fetch('https://magiar-backend.onrender.com/kalibracja', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({image}),
                        });
                        const data = await response.json();
                        alert(`${JSON.stringify(data, null, 2)}`);

                    }, 1000);
                }, 150); // flash lasts 150 ms
            }
        }, 1000);
    }

    async function sendFramesToBackend(frames) {
        try {
            const response = await fetch('https://magiar-backend.onrender.com/zaklecie', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({frames}),
            });

            const data = await response.json();
            if (data?.zaklecie) {
                setDetectedSpell(data.zaklecie);
                console.log("🧙 Spell detected:", data.zaklecie);

                setTimeout(() => {
                    setDetectedSpell(null);
                }, 4000);
            } else {
                console.log("😶 No spell detected.");
            }
        } catch (error) {
            console.error("❌ Error sending frames:", error);
        }
    }

    async function handleCastSpell() {
        let seconds = 3;
        setCastingCountdown(seconds);

        const countdownInterval = setInterval(() => {
            seconds -= 1;
            setCastingCountdown(seconds);

            if (seconds === 0) {
                clearInterval(countdownInterval);
                setCastingCountdown(null);
                setShowCastingText(true);

                const frames = [];
                const intervalMs = 100;
                const durationMs = 5000;
                const startTime = Date.now();

                const frameInterval = setInterval(() => {
                    const now = Date.now();
                    if (now - startTime >= durationMs) {
                        clearInterval(frameInterval);
                        setShowCastingText(false);

                        // Send all collected frames to backend
                        sendFramesToBackend(frames);
                        return;
                    }

                    const frame = captureFrame();
                    frames.push(frame);
                }, intervalMs);
            }
        }, 1000);
    }

    return (
        <>
            <div className='container'>
                <div className="row">
                    <HeaderMain/>
                </div>

                <div className='d-flex flex-column align-items-center text-center mt-2 mt-lg-5 position-relative'>

                    {detectedSpell && SPELL_INFO[detectedSpell] && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '10%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                padding: '20px 30px',
                                borderRadius: '15px',
                                boxShadow: '0 0 20px rgba(156, 39, 176, 0.8)',
                                width: '300px',
                                textAlign: 'center',
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                animation: 'fadeScale 0.5s ease',
                                zIndex: 999
                            }}
                        >
                            <div style={{fontSize: '4rem'}}>{SPELL_INFO[detectedSpell].icon}</div>
                            <h2 style={{margin: '10px 0'}}>{SPELL_INFO[detectedSpell].name}</h2>
                        </div>
                    )}

                    {/* Countdown before casting */}
                    {castingCountdown !== null && (
                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            zIndex: 2
                        }}>
                            {castingCountdown}
                        </div>
                    )}

                    {/* "CAST!" text */}
                    {showCastingText && (
                        <div style={{
                            position: 'absolute',
                            top: '5%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'rgb(156, 39, 176)',
                            fontSize: '4rem',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 10px black',
                            zIndex: 3
                        }}>
                            CAST!
                        </div>
                    )}

                    {/* Flash */}
                    {flash && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            opacity: 0.8,
                            zIndex: 3
                        }}/>
                    )}

                    {/* Calibrating */}
                    {showScanningText && (
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: '10%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 600,
                            backgroundColor: 'rgb(156, 39, 176)',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            zIndex: 3
                        }}>
                            Calibrating...
                        </div>
                    )}

                    <video ref={videoRef} autoPlay playsInline muted className="custom-video mb-4"/>

                    {/* Circle and countdown */}
                    {calibrating && (
                        <>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100px',
                                height: '100px',
                                border: '4px solid red',
                                borderRadius: '50%',
                                zIndex: 2
                            }}></div>

                            <div style={{
                                position: 'absolute',
                                top: '10%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                zIndex: 2
                            }}>
                                {countdown}
                            </div>
                        </>
                    )}

                    <div className="d-flex gap-3 mb-4">
                        <button
                            onClick={handleCalibration}
                            className="btn btn-primary"
                            style={{
                                backgroundColor: '#9c27b0',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'white',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                minWidth: '150px'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Calibrate
                        </button>
                        <button
                            onClick={handleCastSpell}
                            className="btn btn-success"
                            style={{
                                backgroundColor: '#4caf50',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'white',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                minWidth: '150px'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Cast Spell
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;