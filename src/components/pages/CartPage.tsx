import { MutableRefObject, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import { getConfig } from '../../data';
import Footer from '../Footer';
import Navbar from '../Navbar';

function CartPage(): JSX.Element | null {
  const { user, cart, clearCart, checkout, cartSetter } = useContext(Context);
  const navigate = useNavigate();
  const address = useRef() as MutableRefObject<HTMLInputElement>;
  const [canDelete, setCanDelete] = useState<boolean>(true);

  if (!cart) return null;

  const cartIsEmpty = cart.products.length <= 0;

  const getSubtotal = () => {
    if (!(cart && cart.products)) return;
    let sum = 0;
    for (let product of cart.products) sum += product.price;
    return sum;
  };

  const checkoutHandler = () => {
    if (!user || !cart) return;
    const orders = cart.products.map((product) => ({
      user_id: user._id,
      product_id: product._id as string,
      name: product.name,
      color: product.color,
      size: product.size,
      price: product.price,
      shipping_address: address.current.value,
    }));
    checkout(orders);
    navigate(`/user/${user._id}`, { replace: true });
  };

  const deleteFromCart = async (id: string) => {
    if (!cart) return;
    setCanDelete(false);

    const oldCart = { ...cart };
    const newCart = {
      ...cart,
      products: [...cart.products.filter((order) => order._id !== id)],
    };
    cartSetter(newCart);

    try {
      const config = getConfig();
      await api.put('/carts', newCart, config);
    } catch (e) {
      cartSetter(oldCart);
    }
    setCanDelete(true);
  };

  return (
    <div className="cart">
      <Navbar />

      {cartIsEmpty && <p className="notFoundText">Cart is empty..</p>}

      {!cartIsEmpty && (
        <div className="cart__main">
          <div className="cart__titleBox">
            <p className="cart__size">{cart?.products.length} Products Found</p>
            <button
              className="cart__clearBtn"
              onClick={clearCart}
              disabled={!canDelete}
            >
              Clear Cart
            </button>
          </div>

          <div className="cart__orders">
            {cart.products.map((order, index) => (
              <div className="cart__orderBox" key={index}>
                <div className="cart__order">
                  <img src={order.picture} alt="" className="cart__img" />
                  <div className="cart__infos">
                    <p className="cart__info">{order.name}</p>
                    <p className="cart__info">${order.price}</p>
                    <p className="cart__info">{order.color}</p>
                    <p className="cart__info cart__infoLast">{order.size}</p>
                  </div>
                </div>
                <button
                  className={`bi bi-trash-fill cart__icon`}
                  title="Remove"
                  onClick={() => deleteFromCart(order._id as string)}
                  disabled={!canDelete}
                  style={{ opacity: canDelete ? 1 : 0.75 }}
                />
              </div>
            ))}
          </div>

          <div className="cart__payment">
            <input
              type="text"
              className="cart__paymentAddress"
              placeholder="Shipping Address.."
              required
              ref={address}
            />
            <div className="cart__paymentBox">
              <div className="cart__paymentInnerBox">
                <p className="cart__paymentLabel">Subtotal:</p>
                <p className="cart__paymentValue">${getSubtotal()}</p>
              </div>
              <div className="cart__paymentInnerBox">
                <p className="cart__paymentLabel">Shipping Fee:</p>
                <p className="cart__paymentValue">${0}</p>
              </div>
              <div className="cart__paymentInnerBox">
                <p className="cart__paymentLabel">Total:</p>
                <p className="cart__paymentValue">${getSubtotal()}</p>
              </div>
            </div>

            <button className="cart__paymentBtn" onClick={checkoutHandler}>
              Checkout
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CartPage;
