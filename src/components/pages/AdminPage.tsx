import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context';
import Emails from '../Emails';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Orders from '../Orders';

function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  const { user, allEmails, allOrders, logout } = useContext(Context);
  const [show, setShow] = useState<number>(1);

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin">
      <Navbar />
      <div className="admin__main">
        <div className="admin__titleBox">
          <div className="admin__outerTitleBox">
            <i className={`bi bi-person-fill admin__icon`} />
            <div className="admin__innerTitleBox">
              <p className="admin__name">{user?.name}</p>
              <p className="admin__email">{user?.email}</p>
            </div>
          </div>
          <i
            className={`bi bi-box-arrow-right admin__logoutIcon`}
            title="Logout"
            onClick={logoutHandler}
          />
        </div>

        <div className="admin__items">
          <div className="admin__itemsTitleBox">
            <div className="admin__itemsTitleBoxInner">
              <p className="admin__option" onClick={() => setShow(1)}>
                Emails
                {show === 1 && (
                  <i className={`bi bi-caret-down-fill admin__selectedIcon`} />
                )}
              </p>
              <p className="admin__option" onClick={() => setShow(2)}>
                Orders
                {show === 2 && (
                  <i className={`bi bi-caret-down-fill admin__selectedIcon`} />
                )}
              </p>
            </div>
            <p className="admin__count">
              {show === 1 ? allEmails.length : allOrders.length}{' '}
              {show === 1 ? 'Emails' : 'Orders'} Found
            </p>
          </div>

          {show === 1 && <Emails />}
          {show === 2 && <Orders />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
