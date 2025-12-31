import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {

  return (
    <header className={styles.header}>
      <p className={styles.logo}>
        <NavLink to="/dashboard" className={styles.link}>Shopify</NavLink>
      </p>

      <nav className={styles.nav}>
          <li className={styles.navItem}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Profile
            </NavLink>
          </li>
      </nav>
    </header>
  );
};

export default Header;