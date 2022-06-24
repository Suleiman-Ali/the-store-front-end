import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductType } from '../../../data';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Product.module.scss';

function Product(): JSX.Element {
  const { state } = useLocation();
  const product = state as ProductType;
  const [selectedImage, setSelectedImage] = useState<string>(
    product.pictures[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  return (
    <div className={styles.product}>
      <Navbar />

      <div className={styles.product__outbox}>
        <Link to="/products" className={styles.product__link}>
          <i className="bi bi-arrow-left"></i>
          Back to Products
        </Link>

        <div className={styles.product__main}>
          <div className={styles.product__pictures}>
            <div className={styles.product__mainPictureBox}>
              <img
                className={styles.product__mainPicture}
                src={selectedImage}
                alt=""
              />
            </div>
            <div className={styles.product__picturesBox}>
              {product.pictures.map((img) => (
                <img
                  className={`${styles.product__littleImg} ${
                    img === selectedImage && styles.product__littleImgSelected
                  }`}
                  src={img}
                  alt=""
                  key={img}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div className={styles.product__details}>
            <h1 className={styles.product__name}>{product.name}</h1>
            <p className={styles.product__price}>{product.price}</p>
            <p className={styles.product__description}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
              beatae deserunt praesentium dolorum ad et sunt voluptas, doloribus
              nemo libero totam maxime numquam fugiat. Accusantium?
              {/* {product.description} */}
            </p>

            <div className={styles.product__detailBox}>
              <p className={styles.product__intro}>Available: </p>
              <p className={styles.product__available}>
                {product.available.toString().toUpperCase()}
              </p>
            </div>

            <div className={styles.product__detailBox}>
              <p className={styles.product__intro}>Colors:</p>
              <div className={styles.product__colors}>
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className={styles.product__color}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color === selectedColor && (
                      <i
                        className={`bi bi-check ${styles.product__colorIcon}`}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.product__detailBox}>
              <p className={styles.product__intro}>Sizes:</p>
              <div className={styles.product__sizes}>
                {product.sizes.map((size) => (
                  <p
                    className={`${styles.product__size} ${
                      size === selectedSize && styles.product__sizeSelected
                    }`}
                    onClick={() => setSelectedSize(size)}
                    key={size}
                  >
                    {size}
                  </p>
                ))}
              </div>
            </div>

            <button className={styles.product__btn}>
              Add To Cart
              <i
                className={`bi bi-cart-plus-fill ${styles.product__btnIcon}`}
              ></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
