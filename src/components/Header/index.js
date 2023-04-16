import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <div className={`inner-container ${styles.innerHeader}`}>
        <div className={styles.logoNav}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
