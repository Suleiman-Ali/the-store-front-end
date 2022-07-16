import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';

function Featured(): JSX.Element | null {
  const { products, categories } = useContext(Context);

  if (!(products.length >= 3)) return null;

  const threeProducts =
    categories.length >= 3
      ? [
          products.filter(
            (product) => product.category_id === categories[0]._id
          )[0],
          products.filter(
            (product) => product.category_id === categories[1]._id
          )[0],
          products.filter(
            (product) => product.category_id === categories[2]._id
          )[0],
        ]
      : [...products.slice(0, 3)];

  return (
    <div className="featured">
      <p className="featured__title">Featured Products</p>

      <div className="featured__products">
        {threeProducts.map((product, index) => (
          <Link
            to={`/product/${product._id}`}
            state={product}
            className={`featured__product ${
              index === 2 && 'featured__lastProduct'
            }`}
            key={product._id}
          >
            <img
              src={product.pictures[0]}
              alt=""
              className="featured__productImg"
            />
            <div className="featured__productBox">
              <p className="featured__productTitle">{product.name}</p>
              <p className="featured__productPrice">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link className="featured__btn" to="/products">
        All Products
        <i className="bi bi-arrow-right"></i>
      </Link>
    </div>
  );
}

export default Featured;
