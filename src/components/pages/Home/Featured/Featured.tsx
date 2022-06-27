import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../../context';

interface FeaturedProps {
  styles: any;
}

function Featured({ styles }: FeaturedProps): JSX.Element {
  const { products } = useContext(Context);
  const threeProducts = products.slice(0, 3);

  return (
    <div className={styles.featured}>
      <p className={styles.featured__title}>Featured Products</p>
      <div className={styles.featured__products}>
        {threeProducts.map((product, index) => (
          <Link
            to={`/product/${product._id}`}
            state={product}
            className={`${styles.featured__product} ${
              index === 2 && styles.featured__lastProduct
            }`}
            key={product._id}
          >
            <img
              src={product.pictures[0]}
              alt=""
              className={styles.featured__productImg}
            />
            <div className={styles.featured__productBox}>
              <p className={styles.featured__productTitle}>{product.name}</p>
              <p className={styles.featured__productPrice}>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link className={styles.featured__btn} to="/products">
        All Products
        <i className="bi bi-arrow-right"></i>
      </Link>
    </div>
  );
}

export default Featured;
