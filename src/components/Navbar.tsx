import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Context from '../context';
import { getUserTo } from '../data';

function Navbar(): JSX.Element {
  const { user, isWindowOver1000, cart } = useContext(Context);
  const [model, setModel] = useState<boolean>(false);

  useEffect(() => {
    setModel(false);
  }, [isWindowOver1000]);

  return (
    <nav className="navbar">
      <Link className="navbar__title" to="/">
        The Store
      </Link>

      {isWindowOver1000 && (
        <div className="navbar__links">
          <NavLink className="navbar__link" to="/">
            Home
          </NavLink>
          <Link className="navbar__link" to="/products">
            Products
          </Link>
          <Link className="navbar__link" to="/about">
            About
          </Link>
          {user && !user.isAdmin && (
            <Link className="navbar__link" to="/contact">
              Contact Us
            </Link>
          )}
        </div>
      )}

      {isWindowOver1000 && (
        <div className="navbar__boxes">
          {user && !user.isAdmin && (
            <Link className="navbar__box" to="/cart">
              <i className={`bi bi-cart-fill navbar__icon`} />
              <p className="navbar__boxLink">Cart</p>
              {cart && cart.products && cart.products.length > 0 && (
                <p className="navbar__sizeOfCart">{cart?.products.length}</p>
              )}
            </Link>
          )}
          <Link className="navbar__box" to={getUserTo(user).to}>
            <i className={`bi ${getUserTo(user).icon}  navbar__icon`} />
            <p className="navbar__boxLink">{user ? user.name : 'Login'}</p>
          </Link>
        </div>
      )}

      {!isWindowOver1000 && (
        <i
          className={`bi ${model ? 'bi-x' : 'bi-list'} ${'navbar__toggle'}`}
          onClick={() => setModel((model) => !model)}
        ></i>
      )}

      {model && (
        <div className="navbar__model">
          <div className="navbar__modelLinks">
            <Link className="navbar__modelLink" to="/">
              Home
            </Link>
            <Link className="navbar__modelLink" to="/products">
              Products
            </Link>
            <Link className="navbar__modelLink" to="/about">
              About
            </Link>
            {user && !user.isAdmin && (
              <Link className="navbar__modelLink" to="/contact">
                Contact Us
              </Link>
            )}
          </div>

          <div className="navbar__modelBoxes">
            {user && !user.isAdmin && (
              <Link className="navbar__modelBox" to="/cart">
                <i className={`bi bi-cart-fill navbar__modelIcon`} />
                <p className="navbar__modelBoxLink">Cart</p>
                {cart && cart.products && cart.products.length > 0 && (
                  <p className="navbar__sizeOfCart">{cart?.products.length}</p>
                )}
              </Link>
            )}

            <Link className="navbar__modelBox" to={getUserTo(user).to}>
              <i
                className={`bi ${getUserTo(user).icon}  ${'navbar__modelIcon'}`}
              />
              <p className="navbar__modelBoxLink">
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
