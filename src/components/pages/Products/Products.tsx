import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../context';
import {
  getOfBrand,
  getOfCategory,
  getOfKeyword,
  getOfRange,
  ProductType,
  sort,
} from '../../../data';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Products.module.scss';

function Products(): JSX.Element {
  const {
    categories,
    brands,
    products,
    isWindowOver1000,
    user,
    deleteCategory,
    deleteBrand,
    deleteProduct,
  } = useContext(Context);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [f_range, setRange] = useState<number>(0);
  const [f_category, setCategory] = useState<string>('All');
  const [f_brand, setBrand] = useState<string>('All');
  const [f_sort, setSort] = useState<string>('Price/Lowest');
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);

  const clearFilters = () => {
    setRange(0);
    setCategory('All');
    setBrand('All');
    setSort('Price/Lowest');
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [isWindowOver1000]);

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    const ofKeyword = getOfKeyword(products, keyword);
    const ofBrand = getOfBrand(ofKeyword, f_brand);
    const ofCategory = getOfCategory(ofBrand, f_category);
    const ofRange = getOfRange(ofCategory, f_range);
    const sorted = sort(ofRange, f_sort);
    setFilteredProducts(sorted);
  }, [products, f_range, f_category, f_brand, f_sort, keyword]);

  return (
    <div className={styles.products}>
      <Navbar />

      <div className={styles.products__main}>
        <div className={styles.products__mainTitleBox}>
          {!isWindowOver1000 && (
            <i
              className={`bi bi-${openMenu ? 'x' : 'three-dots'} ${
                styles.products__listBtn
              }`}
              onClick={() => setOpenMenu((menu) => !menu)}
            />
          )}
          <div className={styles.products__sizeBox}>
            <p className={styles.products__size}>
              {filteredProducts.length} Products Found
            </p>

            {user && user.isAdmin === true && (
              <Link to="/add-product" className={styles.products__productIconA}>
                <i className={`bi bi-plus-circle-fill`}></i>
              </Link>
            )}
          </div>
        </div>

        {!isWindowOver1000 && openMenu && (
          <div className={styles.products__edits}>
            <input
              type="text"
              className={styles.products__input}
              placeholder="Keyword.."
            />
            <div className={styles.products__editsBox}>
              <div className={styles.products__outerBox}>
                <div className={styles.products__boxTitleBox}>
                  <p className={styles.products__boxTitle}>Category</p>
                  {user && user.isAdmin === true && (
                    <Link
                      to="/add-category"
                      className={styles.products__boxIcon}
                    >
                      <i className={`bi bi-plus-circle-fill `} title="Add"></i>
                    </Link>
                  )}
                </div>

                <div className={styles.products__innerBox}>
                  {categories.map((category) => (
                    <div className={styles.products__editItemBox}>
                      <p
                        className={styles.products__editItem}
                        key={category._id}
                      >
                        {category.name}
                      </p>
                      {user?.isAdmin && (
                        <i
                          className={`bi bi-x-circle-fill ${styles.products__editItemIcon}`}
                          title="Delete"
                          onClick={() => deleteCategory(category._id)}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.products__outerBox}>
                <div className={styles.products__boxTitleBox}>
                  <p className={styles.products__boxTitle}>Brand</p>
                  {user && user.isAdmin && (
                    <Link to="/add-brand" className={styles.products__boxIcon}>
                      <i className={`bi bi-plus-circle-fill`} title="Add"></i>
                    </Link>
                  )}
                </div>
                <div className={styles.products__innerBox}>
                  {brands.map((brand) => (
                    <div className={styles.products__editItemBox}>
                      <p className={styles.products__editItem} key={brand._id}>
                        {brand.name}
                      </p>
                      {user?.isAdmin && (
                        <i
                          className={`bi bi-x-circle-fill ${styles.products__editItemIcon}`}
                          title="Delete"
                          onClick={() => deleteBrand(brand._id)}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.products__outerBox}>
                <p className={styles.products__boxTitle}>Price</p>
                <div className={styles.products__innerBox}>
                  <p className={styles.products__priceNumber}>{f_range}</p>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={f_range}
                    className={styles.products__priceSlider}
                  />
                </div>
              </div>
              <div className={styles.products__outerBox}>
                <p className={styles.products__boxTitle}>Sort By</p>
                <div className={styles.products__innerBox}>
                  <p className={styles.products__editItem}>Price/Lowest</p>
                  <p className={styles.products__editItem}>Price/Highest</p>
                  <p className={styles.products__editItem}>Name/A-Z</p>
                  <p className={styles.products__editItem}>Name/Z-A</p>
                </div>
              </div>
              <button className={styles.products__btnClear}>
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className={styles.products__mainContent}>
          {isWindowOver1000 && (
            <div className={styles.products__edits}>
              <input
                type="text"
                className={styles.products__input}
                placeholder="Keyword.."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className={styles.products__editsBox}>
                <div className={styles.products__outerBox}>
                  <div className={styles.products__boxTitleBox}>
                    <p className={styles.products__boxTitle}>Category</p>
                    {user && user.isAdmin && (
                      <Link
                        to="/add-category"
                        className={styles.products__boxIcon}
                      >
                        <i className={`bi bi-plus-circle-fill`} title="Add"></i>
                      </Link>
                    )}
                  </div>
                  <div className={styles.products__innerBox}>
                    <p
                      className={`${styles.products__editItem} ${
                        f_category === 'All' ? styles.products__selected : ''
                      }`}
                      onClick={() => setCategory('All')}
                    >
                      All
                    </p>
                    {categories.map((category) => (
                      <div className={styles.products__editItemBox}>
                        <p
                          className={`${styles.products__editItem} ${
                            f_category === category._id
                              ? styles.products__selected
                              : ''
                          }`}
                          onClick={() => setCategory(category._id)}
                          key={category._id}
                        >
                          {category.name}
                        </p>
                        {user && user.isAdmin === true && (
                          <i
                            className={`bi bi-x-circle-fill ${styles.products__editItemIcon}`}
                            title="Delete"
                            onClick={() => deleteCategory(category._id)}
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.products__outerBox}>
                  <div className={styles.products__boxTitleBox}>
                    <p className={styles.products__boxTitle}>Brand</p>
                    {user && user.isAdmin && (
                      <Link
                        to="/add-brand"
                        className={styles.products__boxIcon}
                      >
                        <i className={`bi bi-plus-circle-fill`} title="Add"></i>
                      </Link>
                    )}
                  </div>

                  <div className={styles.products__innerBox}>
                    <p
                      className={`${styles.products__editItem} ${
                        f_brand === 'All' ? styles.products__selected : ''
                      }`}
                      onClick={() => setBrand('All')}
                    >
                      All
                    </p>
                    {brands.map((brand) => (
                      <div className={styles.products__editItemBox}>
                        <p
                          className={`${styles.products__editItem} ${
                            f_brand === brand._id
                              ? styles.products__selected
                              : ''
                          }`}
                          onClick={() => setBrand(brand._id)}
                          key={brand._id}
                        >
                          {brand.name}
                        </p>
                        {user && user.isAdmin === true && (
                          <i
                            className={`bi bi-x-circle-fill ${styles.products__editItemIcon}`}
                            title="Delete"
                            onClick={() => deleteBrand(brand._id)}
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.products__outerBox}>
                  <p className={styles.products__boxTitle}>Price</p>
                  <div className={styles.products__innerBox}>
                    <p className={styles.products__priceNumber}>${f_range}</p>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={f_range}
                      className={styles.products__priceSlider}
                      onChange={(e) => setRange(+e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.products__outerBox}>
                  <p className={styles.products__boxTitle}>Sort By</p>
                  <div className={styles.products__innerBox}>
                    <p
                      className={`${styles.products__editItem} ${
                        f_sort === 'Price/Lowest'
                          ? styles.products__selected
                          : ''
                      }`}
                      onClick={() => setSort('Price/Lowest')}
                    >
                      Price/Lowest
                    </p>
                    <p
                      className={`${styles.products__editItem} ${
                        f_sort === 'Price/Highest'
                          ? styles.products__selected
                          : ''
                      }`}
                      onClick={() => setSort('Price/Highest')}
                    >
                      Price/Highest
                    </p>
                    <p
                      className={`${styles.products__editItem} ${
                        f_sort === 'Name/A-Z' ? styles.products__selected : ''
                      }`}
                      onClick={() => setSort('Name/A-Z')}
                    >
                      Name/A-Z
                    </p>
                    <p
                      className={`${styles.products__editItem} ${
                        f_sort === 'Name/Z-A' ? styles.products__selected : ''
                      }`}
                      onClick={() => setSort('Name/Z-A')}
                    >
                      Name/Z-A
                    </p>
                  </div>
                </div>
                <button
                  className={styles.products__btnClear}
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
          <div className={styles.products__products}>
            {filteredProducts.map((product) => (
              <div className={styles.products__productBox}>
                <Link
                  to={`/product/${product._id}`}
                  state={product}
                  key={product._id}
                  className={styles.products__product}
                >
                  <img
                    src={product.pictures[0]}
                    alt=""
                    className={styles.products__productImg}
                  />

                  <div className={styles.products__productBox}>
                    <p className={styles.products__productName}>
                      {product.name}
                    </p>
                    <p className={styles.products__productPrice}>
                      ${product.price}
                    </p>
                  </div>
                </Link>
                {user && user.isAdmin === true && (
                  <div className={styles.products__icons}>
                    <i
                      className={`bi bi-x-circle-fill ${styles.products__productIconD}`}
                      title="Delete"
                      onClick={() => deleteProduct(product._id)}
                    ></i>
                    <Link
                      to="/edit-product"
                      state={product}
                      className={styles.products__productIconE}
                    >
                      <i
                        className={`bi  bi-slash-circle-fill`}
                        title="Edit"
                      ></i>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
