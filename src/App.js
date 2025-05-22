import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import logo from './MagiAR_logo.png';
import wizard from './wizard.png';
import HeaderLogo from './Components/HeaderLogo';

import GetStartedSpellbook from './Pages/GetStartedSpellbook';
import GetStartedCalibrate from './Pages/GetStartedCalibrate';
import MainPage from './Pages/MainPage';
import Spellbook from './Pages/Spellbook';


function Home() {
  const navigate = useNavigate();
  
  return (
    <>

    <div className='container'>

      <div className="row">
        <HeaderLogo />
      </div>
        <div className='row brightVioletBoxApp custom-mt-1 align-items-center text-center'>
          <div className="col-lg-3 col-12 ">
            <img src={wizard} className="" alt="logo" />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-8 col-12 d-flex justify-content-center">
            <p className='text-white m-0'>
              Feel like a real wizard with our app that lets you cast spells using a wand! 
              Learn magical incantations and train your spellcasting skills. 
              A flick of the wrist, a spark in the air and magic becomes reality. 
              And the best part? 
              All you need is a laser pointer that becomes your true wand.
            </p>
          </div>
        </div>

      <div className='d-flex justify-content-center text-center custom-mt-1 sticky-button-bottom mb-3'>
        <button className='buttonGetStarted text-white custom-mt-1' onClick={() => navigate("/getStartedSpellbook")}>
          GET STARTED
        </button>
      </div>

    </div>


    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getStartedSpellbook" element={<GetStartedSpellbook />} />
        <Route path="/getStartedCalibrate" element={<GetStartedCalibrate />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/spellbook" element={<Spellbook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;