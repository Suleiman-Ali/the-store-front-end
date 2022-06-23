import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar(): JSX.Element {
  const [isBigNav, setIsBigNav] = useState<boolean>(window.innerWidth >= 900);
  const [model, setModel] = useState<boolean>(false);

  useEffect(() => {
    const resizeHandler = () => {
      setModel(false);
      if (window.innerWidth >= 900) setIsBigNav(true);
      else setIsBigNav(false);
    };
    window.addEventListener<'resize'>('resize', resizeHandler);
    return () => window.removeEventListener<'resize'>('resize', resizeHandler);
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__title} to="/">
        The Store
      </Link>

      {isBigNav && (
        <div className={styles.navbar__links}>
          <NavLink className={styles.navbar__link} to="/">
            Home
          </NavLink>
          <Link className={styles.navbar__link} to="/products">
            Products
          </Link>
          <Link className={styles.navbar__link} to="/about">
            About
          </Link>
          <Link className={styles.navbar__link} to="/contact">
            Contact Us
          </Link>
        </div>
      )}

      {isBigNav && (
        <div className={styles.navbar__boxes}>
          <Link className={styles.navbar__box} to="/cart">
            <i className={`bi bi-cart-fill ${styles.navbar__icon}`} />
            <p className={styles.navbar__boxLink}>Cart</p>
          </Link>
          <Link className={styles.navbar__box} to="/login">
            <i className={`bi bi-person-plus-fill ${styles.navbar__icon}`} />
            <p className={styles.navbar__boxLink}>Login</p>
          </Link>
        </div>
      )}

      {!isBigNav && (
        <i
          className={`bi ${model ? 'bi-x' : 'bi-list'} ${
            styles.navbar__toggle
          }`}
          onClick={() => setModel((model) => !model)}
        ></i>
      )}

      {model && (
        <div className={styles.navbar__model}>
          <div className={styles.navbar__modelLinks}>
            <Link className={styles.navbar__modelLink} to="/">
              Home
            </Link>
            <Link className={styles.navbar__modelLink} to="/products">
              Products
            </Link>
            <Link className={styles.navbar__modelLink} to="/about">
              About
            </Link>
            <Link className={styles.navbar__modelLink} to="/contact">
              Contact Us
            </Link>
          </div>

          <div className={styles.navbar__modelBoxes}>
            <Link className={styles.navbar__modelBox} to="/cart">
              <i className={`bi bi-cart-fill ${styles.navbar__modelIcon}`} />
              <p className={styles.navbar__modelBoxLink}>Cart</p>
            </Link>
            <Link className={styles.navbar__modelBox} to="/login">
              <i
                className={`bi bi-person-plus-fill ${styles.navbar__modelIcon}`}
              />
              <p className={styles.navbar__modelBoxLink}>Login</p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
{
  /* <i className={`bi bi-person-fill`} /> */
}

export default Navbar;
