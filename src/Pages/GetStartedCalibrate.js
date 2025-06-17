import { useNavigate } from "react-router-dom";

import HeaderLogo from '../Components/HeaderLogo';

function GetStartedCalibrate() {
    const navigate = useNavigate();

  return (
    <>

    <div className='container'>

      <div className="row">
        <HeaderLogo />
      </div>

      <div className='d-flex justify-content-center text-center custom-mt-1'>
        <div className='row brightVioletBoxCalibrate align-items-center'>
            <div className='col-lg-4 col-12 mb-lg-0 mb-4'>
                <button className='buttonCalibrate'>
                    CALIBRATE
                </button>
            </div>
            
            <div className='col-lg-1'></div>

            <div className='col-lg-7 col-12'>
                <p className='text-white m-0'>
                    This is the calibration button. 
                    Every wand has unique parameters that need to be calibrated so you can properly train your spellcasting. 
                    At the start of each spellcasting session, tap this button and point your wand’s laser at the designated circle to calibrate.
                    If your wand starts losing power while casting spells, simply recalibrate it by repeating the process.
                </p>
            </div>

        </div>
      </div>

      <div className='d-flex justify-content-center text-center custom-mt-1 mb-3'>
        <button className='buttonGetStarted text-white custom-mt-1' onClick={() => navigate("/mainPage")}>
          START
        </button>
      </div>

    </div>


    </>
  );
}
export default GetStartedCalibrate;