import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../assets/img/DoIT .png';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => onUpdateActiveLink('home')}>
           <img  src={logo} alt="Codeadept" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
              onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/Codeadept" 
              className={activeLink === 'CodeAdept' ? 'active navbar-link' : 'navbar-link'} 
              onClick={() => onUpdateActiveLink('CodeAdept')}
            >
              CodeAdept 8.0
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/teams" 
              className={activeLink === 'teams' ? 'active navbar-link' : 'navbar-link'} 
              onClick={() => onUpdateActiveLink('teams')}
            >
              Team
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/contact" 
              className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} 
              onClick={() => onUpdateActiveLink('contact')}
            >
              Contact
            </Nav.Link>
          </Nav>
          
           <span className="navbar-text">
            <Link to="/register">
              <button className="vvd"><span>Register</span></button>
            </Link>
          </span> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
