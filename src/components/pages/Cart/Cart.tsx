import { MutableRefObject, useContext, useRef } from 'react';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Cart.module.scss';

function Cart(): JSX.Element {
  const { user, cart, deleteFromCart, clearCart, checkout } =
    useContext(Context);
  const address = useRef() as MutableRefObject<HTMLInputElement>;

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
  };

  return (
    <div className={styles.cart}>
      <Navbar />

      <div className={styles.cart__main}>
        <div className={styles.cart__titleBox}>
          <p className={styles.cart__size}>
            {cart?.products.length} Products Found
          </p>
          <button className={styles.cart__clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className={styles.cart__orders}>
          {cart?.products?.map((order, index) => (
            <div className={styles.cart__orderBox} key={index}>
              <div className={styles.cart__order}>
                <img src={order.picture} alt="" className={styles.cart__img} />
                <p className={styles.cart__info}>
                  {order.name} / ${order.price} / {order.color} / {order.size}
                </p>
              </div>
              <i
                className={`bi bi-trash-fill ${styles.cart__icon}`}
                title="Remove"
                onClick={() => deleteFromCart(order._id as string)}
              />
            </div>
          ))}
        </div>

        <div className={styles.cart__payment}>
          <input
            type="text"
            className={styles.cart__paymentAddress}
            placeholder="Shipping Address.."
            required
            ref={address}
          />
          <div className={styles.cart__paymentBox}>
            <div className={styles.cart__paymentInnerBox}>
              <p className={styles.cart__paymentLabel}>Subtotal:</p>
              <p className={styles.cart__paymentValue}>${getSubtotal()}</p>
            </div>
            <div className={styles.cart__paymentInnerBox}>
              <p className={styles.cart__paymentLabel}>Shipping Few:</p>
              <p className={styles.cart__paymentValue}>${0}</p>
            </div>
            <div className={styles.cart__paymentInnerBox}>
              <p className={styles.cart__paymentLabel}>Total:</p>
              <p className={styles.cart__paymentValue}>${getSubtotal()}</p>
            </div>
          </div>

          <button className={styles.cart__paymentBtn} onClick={checkoutHandler}>
            Checkout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
