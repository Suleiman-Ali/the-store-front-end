import { useContext } from 'react';
import Context from '../../../../context';

interface OrdersProps {
  styles: any;
}

function Orders({ styles }: OrdersProps): JSX.Element {
  const { allOrders, resolveOrder } = useContext(Context);

  return (
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
          <p className={styles.admin__orderProperty}>{order.product_id}</p>
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
  );
}

export default Orders;
