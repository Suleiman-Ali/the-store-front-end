import { useContext, useState } from 'react';
import api from '../api';
import Context from '../context';
import { getConfig } from '../data';

function Orders(): JSX.Element {
  const { allOrders, allOrdersSetter } = useContext(Context);
  const [canResolve, setCanResolve] = useState<boolean>(true);

  const resolveOrder = async (id: string) => {
    setCanResolve(false);
    const config = getConfig();
    const oldOrders = [...allOrders];
    const newOrders = allOrders.filter((order) => order._id !== id);
    allOrdersSetter(newOrders);

    try {
      await api.delete(`/orders/${id}`, config);
    } catch (e) {
      allOrdersSetter(oldOrders);
    }
    setCanResolve(true);
  };

  return (
    <div className="admin__orders">
      {allOrders.map((order) => {
        const preDate = new Date(order.date as string)
          .toLocaleDateString()
          .split('/');
        const date = `${preDate[1]}/${preDate[0]}/${preDate[2]}`;

        return (
          <div className="admin__orderItem" key={order._id}>
            <p className="admin__orderProperty">{order.name.toUpperCase()}</p>
            <div className="admin__orderPropertyBox">
              <p className="admin__orderProperty">
                {order.color.toUpperCase()}
              </p>
              <p className="admin__orderProperty">{order.size.toUpperCase()}</p>
            </div>

            <div className="admin__orderPropertyBox">
              <p className="admin__orderProperty">P:{order.product_id}</p>
              <p className="admin__orderProperty">U:{order.user_id}</p>
            </div>

            <div className="admin__orderPropertyBox">
              <p className="admin__orderProperty">
                {order.shipping_address.toUpperCase()}
              </p>
              <p className="admin__orderProperty">{date}</p>
            </div>

            {canResolve && (
              <button
                className={`bi bi-check-lg admin__orderIcon`}
                title="Resolve"
                onClick={() => resolveOrder(order._id as string)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
