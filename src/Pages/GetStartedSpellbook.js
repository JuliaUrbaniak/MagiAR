import { useNavigate } from "react-router-dom";

import spellbook from '../spellbook.png';

import HeaderLogo from '../Components/HeaderLogo';

function GetStartedSpellbook() {
    const navigate = useNavigate();
  return (
    <>

    <div className='container'>

      <div className="row">
        <HeaderLogo />
      </div>

      <div className='d-flex justify-content-center text-center custom-mt-1'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12'>
                <img src={spellbook} className="w-100" alt="logo" />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <p className='text-white m-0'>
                    This is a spellbook every aspiring wizard needs. 
                    It will teach you how to cast spells effectively and help you avoid accidentally cursing yourself. 
                    At the beginning of your magical journey, study it carefully. 
                    But don’t worry you can return to it anytime to learn new spells or refresh the ones you’ve forgotten.
                </p>
            </div>

        </div>
      </div>

      <div className='d-flex justify-content-center text-center custom-mt-1 mb-3'>
        <button className='buttonGetStarted text-white custom-mt-1' onClick={() => navigate("/getStartedCalibrate")}>
          NEXT
        </button>
      </div>

    </div>


    </>
  );
}
export default GetStartedSpellbook;