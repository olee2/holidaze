import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hamburger from '../../assets/hamburger.svg';

function Nav() {
  const location = useLocation();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(false);
  }, [location]);

  const handleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <nav>
      <button type="button" className="hamburger" onClick={handleDisplay}>
        <img
          src={hamburger}
          className={`${display && 'active-hamburger'}`}
          alt="hamburger icon"
        />
      </button>

      <div className={`nav-container ${display && 'show'}`}>
        <div className="link-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
