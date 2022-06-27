import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Context from '../../context';
import { getUserTo, UserType } from '../../data';
import styles from './Navbar.module.scss';

function Navbar(): JSX.Element {
  const { user, isWindowOver1000, cart } = useContext(Context);
  const [model, setModel] = useState<boolean>(false);

  useEffect(() => {
    setModel(false);
  }, [isWindowOver1000]);

  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__title} to="/">
        The Store
      </Link>

      {isWindowOver1000 && (
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

      {isWindowOver1000 && (
        <div className={styles.navbar__boxes}>
          <Link className={styles.navbar__box} to="/cart">
            <i className={`bi bi-cart-fill ${styles.navbar__icon}`} />
            <p className={styles.navbar__boxLink}>Cart</p>
            {cart && cart.products && cart.products.length > 0 && (
              <p className={styles.navbar__sizeOfCart}>
                {cart?.products.length}
              </p>
            )}
          </Link>
          <Link className={styles.navbar__box} to={getUserTo(user).to}>
            <i
              className={`bi ${getUserTo(user).icon}  ${styles.navbar__icon}`}
            />
            <p className={styles.navbar__boxLink}>
              {user ? user.name : 'Login'}
            </p>
          </Link>
        </div>
      )}

      {!isWindowOver1000 && (
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
              {cart && cart.products && cart.products.length > 0 && (
                <p className={styles.navbar__sizeOfCart}>
                  {cart?.products.length}
                </p>
              )}
            </Link>

            <Link className={styles.navbar__modelBox} to={getUserTo(user).to}>
              <i
                className={`bi ${getUserTo(user).icon}  ${
                  styles.navbar__modelIcon
                }`}
              />
              <p className={styles.navbar__modelBoxLink}>
                {user ? user.name : 'Login'}
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
