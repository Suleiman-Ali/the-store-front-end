import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import { getConfig } from '../../data';
import Footer from '../Footer';
import Navbar from '../Navbar';

function UserPage(): JSX.Element | null {
  const navigate = useNavigate();
  const { user, orders, logout, ordersOfUserSetter } = useContext(Context);
  const [canCancel, setCanCancel] = useState<boolean>(true);

  if (!user) return null;

  const userOrdersEmpty = orders.length <= 0;

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  const cancelOrder = async (id: string) => {
    setCanCancel(false);
    const config = getConfig();

    const oldOrders = [...orders];
    const newOrders = orders.filter((order) => order._id !== id);
    ordersOfUserSetter(newOrders);

    try {
      await api.delete(`/orders/${id}`, config);
    } catch (e) {
      ordersOfUserSetter(oldOrders);
    }
    setCanCancel(true);
  };

  return (
    <div className="user">
      <Navbar />
      <div className="user__main">
        <div className="user__titleBox">
          <div className="user__outerTitleBox">
            <i className={`bi bi-person-fill user__icon`} />
            <div className="user__innerTitleBox">
              <p className="user__name">{user?.name}</p>
              <p className="user__email">{user?.email}</p>
            </div>
          </div>
          <i
            className={`bi bi-box-arrow-right user__logoutIcon`}
            title="Logout"
            onClick={logoutHandler}
          />
        </div>

        {userOrdersEmpty && <p className="notFoundText">No orders found..</p>}

        {!userOrdersEmpty && (
          <div className="user__orders">
            <p className="user__ordersText">{orders.length} Orders Found</p>

            <div className="user__ordersBox">
              {orders.map((order) => (
                <div className="user__order" key={order._id}>
                  <div className="user__orderBox">
                    <p className="user__orderInfo">{order.name}</p>
                    <p className="user__orderInfo">${order.price}</p>
                    <p className="user__orderInfo">{order.color}</p>
                    <p className="user__orderInfo">{order.size}</p>
                    <p className="user__orderInfo user__orderInfoLast">
                      {order.shipping_address}
                    </p>
                  </div>
                  <button
                    className={`bi bi-trash-fill user__orderIcon`}
                    title="Cancel"
                    onClick={() => cancelOrder(order._id as string)}
                    disabled={!canCancel}
                    style={{ opacity: canCancel ? 1 : 0.75 }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default UserPage;
