import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Context from '../../context';
import { ProductType } from '../../data';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ProductColors from '../ProductColors';
import ProductPictures from '../ProductPictures';
import ProductSizes from '../ProductSizes';

function ProductPage(): JSX.Element {
  const { addToCart, user } = useContext(Context);
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state as ProductType;
  const [selectedImage, setSelectedImage] = useState<string>(
    product.pictures[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  const addToCartHandler = () => {
    const product_id = product._id;
    const name = product.name;
    const price = product.price;
    const size = selectedSize;
    const color = selectedColor;
    const picture = selectedImage;
    const order = { product_id, name, price, size, color, picture };
    addToCart(order);
    navigate('/cart', { replace: true });
  };

  return (
    <div className="productPage">
      <Navbar />

      <div className="productPage__outbox">
        <Link to="/products" className="productPage__link">
          <i className="bi bi-arrow-left"></i>
          Back to Products
        </Link>

        <div className="productPage__main">
          <div className="productPage__pictures">
            <div className="productPage__mainPictureBox">
              <img
                className="productPage__mainPicture"
                src={selectedImage}
                alt=""
              />
            </div>
            <ProductPictures
              product={product}
              selectedPic={selectedImage}
              onClick={(img: string) => setSelectedImage(img)}
            />
          </div>

          <div className="productPage__details">
            <h1 className="productPage__name">{product.name}</h1>
            <p className="productPage__price">${product.price}</p>
            <p className="productPage__description">{product.description}</p>

            <div className="productPage__detailBox">
              <p className="productPage__intro">Available: </p>
              <p className="productPage__available">
                {product.available === true ? 'YES' : 'NO'}
              </p>
            </div>

            <div className="productPage__detailBox">
              <p className="productPage__intro">Colors:</p>
              <ProductColors
                product={product}
                selectedColor={selectedColor}
                onClick={(color: string) => setSelectedColor(color)}
              />
            </div>

            <div className="productPage__detailBox">
              <p className="productPage__intro">Sizes:</p>
              <ProductSizes
                product={product}
                selectedSize={selectedSize}
                onClick={(size: string) => setSelectedSize(size)}
              />
            </div>

            {user && !user.isAdmin && (
              <button className="productPage__btn" onClick={addToCartHandler}>
                Add To Cart
                <i className={`bi bi-cart-plus-fill productPage__btnIcon`}></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
