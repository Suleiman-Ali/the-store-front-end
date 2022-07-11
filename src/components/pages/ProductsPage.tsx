import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context';
import {
  ProductType,
  getOfKeyword,
  getOfBrand,
  getOfCategory,
  getOfRange,
  sort,
} from '../../data';
import Edits from '../Edits';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ProductsItems from '../ProductsItems';

function ProductsPage(): JSX.Element {
  const { categories, brands, products, isWindowOver1000, user } =
    useContext(Context);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [f_range, setRange] = useState<number>(0);
  const [f_category, setCategory] = useState<string>('All');
  const [f_brand, setBrand] = useState<string>('All');
  const [f_sort, setSort] = useState<string>('Price/Lowest');
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);

  const keywordHandler = (keyword: string) => setKeyword(keyword);
  const categoryHandler = (category: string) => setCategory(category);
  const brandHandler = (brand: string) => setBrand(brand);
  const sortHandler = (sort: string) => setSort(sort);
  const rangeHandler = (range: number) => setRange(range);
  const clearFilters = () => {
    setRange(0);
    setCategory('All');
    setBrand('All');
    setSort('Price/Lowest');
    setKeyword('');
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
    <div className="products">
      <Navbar />

      <div className="products__main">
        <div className="products__mainTitleBox">
          {!isWindowOver1000 && (
            <i
              className={`bi bi-${
                openMenu ? 'x' : 'three-dots'
              } ${'products__listBtn'}`}
              onClick={() => setOpenMenu((menu) => !menu)}
            />
          )}
          <div className="products__sizeBox">
            <p className="products__size">
              {filteredProducts.length} Products Found
            </p>

            {user && user.isAdmin === true && (
              <Link to="/add-product" className="products__productIconA">
                <i className={`bi bi-plus-circle-fill`}></i>
              </Link>
            )}
          </div>
        </div>

        {!isWindowOver1000 && openMenu && (
          <Edits
            keyword={keyword}
            f_sort={f_sort}
            f_brand={f_brand}
            f_category={f_category}
            f_range={f_range}
            keywordHandler={keywordHandler}
            categoryHandler={categoryHandler}
            brandHandler={brandHandler}
            sortHandler={sortHandler}
            rangeHandler={rangeHandler}
            clearFilters={clearFilters}
          />
        )}

        <div className="products__mainContent">
          {isWindowOver1000 && (
            <Edits
              keyword={keyword}
              f_sort={f_sort}
              f_brand={f_brand}
              f_category={f_category}
              f_range={f_range}
              keywordHandler={keywordHandler}
              categoryHandler={categoryHandler}
              brandHandler={brandHandler}
              sortHandler={sortHandler}
              rangeHandler={rangeHandler}
              clearFilters={clearFilters}
            />
          )}

          <ProductsItems products={filteredProducts} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
