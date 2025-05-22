import { useNavigate } from "react-router-dom";

import logo from '../MagiAR_logo.png';
import '../App.css';

function HeaderLogo(){
    const navigate = useNavigate();

    return (
        <>
        
        <header>

            <div className='w-100 d-flex justify-content-center'>

                <img src={logo} className="imgHeaderLogo" alt="logo" onClick={() => navigate("/mainPage")}/>

            </div>

        </header>
        
        </>
    );
}

export default HeaderLogo;
