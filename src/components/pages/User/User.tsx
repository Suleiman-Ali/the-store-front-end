import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './User.module.scss';

function User(): JSX.Element {
  const navigate = useNavigate();
  const { user, orders, logout, cancelOrder } = useContext(Context);

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.user}>
      <Navbar />
      <div className={styles.user__main}>
        <div className={styles.user__titleBox}>
          <div className={styles.user__outerTitleBox}>
            <i className={`bi bi-person-fill ${styles.user__icon}`} />
            <div className={styles.user__innerTitleBox}>
              <p className={styles.user__name}>{user?.name}</p>
              <p className={styles.user__email}>{user?.email}</p>
            </div>
          </div>
          <i
            className={`bi bi-box-arrow-right ${styles.user__logoutIcon}`}
            title="Logout"
            onClick={logoutHandler}
          />
        </div>

        <div className={styles.user__orders}>
          <p className={styles.user__ordersText}>
            {orders.length} Orders Found
          </p>
          <div className={styles.user__ordersBox}>
            {orders.map((order) => (
              <div className={styles.user__order} key={order._id}>
                <div className={styles.user__orderBox}>
                  <p className={styles.user__orderInfo}>
                    {order.name} / ${order.price}
                  </p>
                  <p className={styles.user__orderInfo}>
                    {order.color} / {order.size}
                  </p>
                  <p className={styles.user__orderInfo}>
                    {order.shipping_address}
                  </p>
                </div>
                <i
                  className={`bi bi-trash-fill ${styles.user__orderIcon}`}
                  title="Cancel"
                  onClick={() => cancelOrder(order._id as string)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default User;
