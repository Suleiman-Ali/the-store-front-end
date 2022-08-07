import api from '../api';
import Context from '../context';
import EditItem from './EditItem';
import { getConfig } from '../data';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

interface EditsProps {
  keyword: string;
  f_category: string;
  f_brand: string;
  f_sort: string;
  f_range: number;
  keywordHandler: (keyword: string) => void;
  categoryHandler: (category: string) => void;
  brandHandler: (brand: string) => void;
  sortHandler: (sort: string) => void;
  rangeHandler: (range: number) => void;
  clearFilters: () => void;
}

function Edits({
  keyword,
  keywordHandler,
  f_category,
  categoryHandler,
  f_brand,
  brandHandler,
  f_range,
  rangeHandler,
  f_sort,
  sortHandler,
  clearFilters,
}: EditsProps): JSX.Element {
  const { user, categories, brands, brandsSetter, categoriesSetter } =
    useContext(Context);
  const [canDeleteCategory, setCanDeleteCategory] = useState<boolean>(true);
  const [canDeleteBrand, setCanDeleteBrand] = useState<boolean>(true);

  const deleteCategory = async (id: string) => {
    setCanDeleteCategory(false);
    const config = getConfig();

    const oldCategories = [...categories];
    const newCategories = categories.filter((cat) => cat._id !== id);
    categoriesSetter(newCategories);

    try {
      await api.delete(`/categories/${id}`, config);
    } catch (e) {
      categoriesSetter(oldCategories);
    }
    setCanDeleteCategory(true);
  };

  const deleteBrand = async (id: string) => {
    setCanDeleteBrand(false);
    const config = getConfig();

    const oldBrands = [...brands];
    const newBrands = brands.filter((brand) => brand._id !== id);
    brandsSetter(newBrands);

    try {
      await api.delete(`/brands/${id}`, config);
    } catch (e) {
      brandsSetter(oldBrands);
    }
    setCanDeleteBrand(true);
  };

  return (
    <div className="products__edits">
      <input
        type="text"
        className="products__input"
        placeholder="Keyword.."
        value={keyword}
        onChange={(e) => keywordHandler(e.target.value)}
      />
      <div className="products__editsBox">
        <div className="products__outerBox">
          <div className="products__boxTitleBox">
            <p className="products__boxTitle">Category</p>
            {user && user.isAdmin === true && (
              <Link to="/add-category" className="products__boxIcon">
                <i className={`bi bi-plus-circle-fill `} title="Add"></i>
              </Link>
            )}
          </div>
          <div className="products__innerBox">
            <p
              className={`products__editItem ${
                f_category === 'All' ? 'products__selected' : ''
              }`}
              onClick={() => categoryHandler('All')}
            >
              All
            </p>
            {categories.map((category) => (
              <div className="products__editItemBox" key={category._id}>
                <EditItem
                  item={category}
                  compare={f_category}
                  onClick={() => categoryHandler(category._id)}
                  isDelete={true}
                  onDelete={() => deleteCategory(category._id)}
                  canDelete={canDeleteCategory}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="products__outerBox">
          <div className="products__boxTitleBox">
            <p className="products__boxTitle">Brand</p>
            {user && user.isAdmin && (
              <Link to="/add-brand" className="products__boxIcon">
                <i className={`bi bi-plus-circle-fill`} title="Add"></i>
              </Link>
            )}
          </div>
          <div className="products__innerBox">
            <p
              className={`products__editItem ${
                f_brand === 'All' ? 'products__selected' : ''
              }`}
              onClick={() => brandHandler('All')}
            >
              All
            </p>
            {brands.map((brand) => (
              <div className="products__editItemBox" key={brand._id}>
                <EditItem
                  item={brand}
                  compare={f_brand}
                  onClick={() => brandHandler(brand._id)}
                  isDelete={true}
                  onDelete={() => deleteBrand(brand._id)}
                  canDelete={canDeleteBrand}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="products__outerBox">
          <p className="products__boxTitle">Price</p>
          <div className="products__innerBox">
            <p className="products__priceNumber">${f_range}</p>
            <input
              type="range"
              min="0"
              max="5000"
              value={f_range}
              className="products__priceSlider"
              onChange={(e) => rangeHandler(+e.target.value)}
            />
          </div>
        </div>

        <div className="products__outerBox">
          <p className="products__boxTitle">Sort By</p>
          <div className="products__innerBox">
            <EditItem
              item={{ name: 'Price/Lowest', _id: 'Price/Lowest' }}
              compare={f_sort}
              onClick={() => sortHandler('Price/Lowest')}
            />
            <EditItem
              item={{ name: 'Price/Highest', _id: 'Price/Highest' }}
              compare={f_sort}
              onClick={() => sortHandler('Price/Highest')}
            />
            <EditItem
              item={{ name: 'Name/A-Z', _id: 'Name/A-Z' }}
              compare={f_sort}
              onClick={() => sortHandler('Name/A-Z')}
            />
            <EditItem
              item={{ name: 'Name/Z-A', _id: 'Name/Z-A' }}
              compare={f_sort}
              onClick={() => sortHandler('Name/Z-A')}
            />
          </div>
        </div>
        <button className="products__btnClear" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Edits;
