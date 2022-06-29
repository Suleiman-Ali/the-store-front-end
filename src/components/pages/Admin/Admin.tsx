import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Admin.module.scss';
import Emails from './Emails/Emails';
import Orders from './Orders/Orders';

function Admin(): JSX.Element {
  const navigate = useNavigate();
  const { user, allEmails, allOrders, logout } = useContext(Context);
  const [show, setShow] = useState<number>(1);

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

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
            onClick={logoutHandler}
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

          {show === 1 && <Emails styles={styles} />}
          {show === 2 && <Orders styles={styles} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
