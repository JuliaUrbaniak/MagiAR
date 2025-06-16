import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import logo from '../MagiAR_logo.png';
import spellbook from '../spellbook.png';
import '../App.css';


function HeaderMain() {
  const navigate = useNavigate();

  return (
    <>
      {/* Wersja desktopowa */}
      <header className='d-none d-lg-block'>
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-start align-items-center">
            <img
              src={spellbook}
              className="heightSpellbook spellbook"
              alt="logo"
              onClick={() => navigate("/spellbook")}
            />
          </div>

          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <img src={logo} className="heightLogo mt-2" alt="logo" />
          </div>

          <div className="col-lg-4 d-flex justify-content-end align-items-center">
          </div>
        </div>
      </header>

      {/* Wersja mobilna */}
      <Navbar expand="lg" className="d-block d-lg-none">
        <Container>
          <Navbar.Brand className="mx-auto">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo} className="d-inline-block align-top w-50" alt="Logo" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-auto" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav>
              <Nav.Link onClick={() => navigate("/spellbook")}>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={spellbook} className="w-50 align-top mt-3 mb-3" alt="Spellbook" />
                </div>
              </Nav.Link>
              <Nav.Link>
                <div className="d-flex justify-content-center align-items-center">
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}



export default HeaderMain;
