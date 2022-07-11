import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';
import { ProductType } from '../data';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ProductItemProps {
  product: ProductType;
  canDelete: boolean;
  onClick: () => void;
}

function ProductItem({
  product,
  canDelete,
  onClick,
}: ProductItemProps): JSX.Element {
  const { user } = useContext(Context);
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <>
      {!loaded && (
        <div className="skeletonProductBox">
          <Skeleton className="skeletonProductBox__big" />
          <Skeleton className="skeletonProductBox__small" />
        </div>
      )}

      <div className={`products__productBox ${loaded ? '' : 'hidden'}`}>
        <Link
          to={`/product/${product._id}`}
          state={product}
          key={product._id}
          className="products__product"
        >
          <img
            src={product.pictures[0]}
            alt=""
            className="products__productImg"
            onLoad={() => setLoaded(true)}
          />

          <div className="products__productBox">
            <p className="products__productName">{product.name}</p>
            <p className="products__productPrice">${product.price}</p>
          </div>
        </Link>
        {user && user.isAdmin === true && (
          <div className="products__icons">
            <button
              className={`bi bi-x-circle-fill products__productIconD`}
              title="Delete"
              onClick={onClick}
              disabled={!canDelete}
              style={{ opacity: canDelete ? 1 : 0.75 }}
            />
            <Link
              to="/edit-product"
              state={product}
              className="products__productIconE"
            >
              <i className={`bi  bi-slash-circle-fill`} title="Edit"></i>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductItem;
