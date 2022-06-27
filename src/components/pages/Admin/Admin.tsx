import { useContext, useState } from 'react';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Admin.module.scss';

function Admin(): JSX.Element {
  const { user, allEmails, allOrders, resolveOrder, logout } =
    useContext(Context);
  const [show, setShow] = useState<number>(1);

  return (
    <div className={styles.admin}>
      <Navbar />
      <div className={styles.admin__main}>
        <div className={styles.admin__titleBox}>
          <div className={styles.admin__outerTitleBox}>
            <i className={`bi bi-person-fill ${styles.admin__icon}`} />
            <div className={styles.admin__innerTitleBox}>
              <p className={styles.admin__name}>{user?.name}</p>
              <p className={styles.admin__email}>{user?.email}</p>
            </div>
          </div>
          <i
            className={`bi bi-box-arrow-right ${styles.admin__logoutIcon}`}
            title="Logout"
            onClick={logout}
          />
        </div>

        <div className={styles.admin__items}>
          <div className={styles.admin__itemsTitleBox}>
            <div className={styles.admin__itemsTitleBoxInner}>
              <p className={styles.admin__option} onClick={() => setShow(1)}>
                Emails
                {show === 1 && (
                  <i
                    className={`bi bi-caret-down-fill ${styles.admin__selectedIcon}`}
                  />
                )}
              </p>
              <p className={styles.admin__option} onClick={() => setShow(2)}>
                Orders
                {show === 2 && (
                  <i
                    className={`bi bi-caret-down-fill ${styles.admin__selectedIcon}`}
                  />
                )}
              </p>
            </div>
            <p className={styles.admin__count}>
              {show === 1 ? allEmails.length : allOrders.length}{' '}
              {show === 1 ? 'Emails' : 'Orders'} Found
            </p>
          </div>

          {show === 1 && (
            <div className={styles.admin__emails}>
              {allEmails.map((email, index) => (
                <div className={styles.admin__emailItem} key={index}>
                  <p className={styles.admin__emailProperty}>{email.title}</p>
                  <p className={styles.admin__emailProperty}>
                    {email.user_email}
                  </p>
                  <p className={styles.admin__emailProperty}>
                    {new Date(email.date as string).getUTCDay()}/
                    {new Date(email.date as string).getUTCMonth()}/
                    {new Date(email.date as string).getUTCFullYear()}
                  </p>
                  <i
                    className={`bi bi-caret-up-fill ${styles.admin__emailIcon}`}
                  ></i>
                </div>
              ))}
            </div>
          )}
          {show === 2 && (
            <div className={styles.admin__orders}>
              {allOrders.map((order) => (
                <div className={styles.admin__orderItem} key={order._id}>
                  <p className={styles.admin__orderProperty}>
                    {order.name.toUpperCase()}
                  </p>
                  <p className={styles.admin__orderProperty}>
                    {order.color.toUpperCase()} / {order.size.toUpperCase()}
                  </p>
                  <p className={styles.admin__orderProperty}>
                    {order.shipping_address.toUpperCase()}
                  </p>
                  <p className={styles.admin__orderProperty}>
                    {order.product_id}
                  </p>
                  <p className={styles.admin__orderProperty}>
                    {new Date(order.date as string).getUTCDay()}/
                    {new Date(order.date as string).getUTCMonth()}/
                    {new Date(order.date as string).getUTCFullYear()}
                  </p>
                  <i
                    className={`bi bi-check-lg ${styles.admin__orderIcon}`}
                    title="Resolve"
                    onClick={() => resolveOrder(order._id as string)}
                  ></i>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
