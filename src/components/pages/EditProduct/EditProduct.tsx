import { FormEventHandler, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../../../context';
import { ProductType } from '../../../data';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './EditProduct.module.scss';

function EditProduct(): JSX.Element {
  const { brands, categories, editProduct } = useContext(Context);
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state as ProductType;
  const [id, setId] = useState<string>(product._id);
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<string>(product.price.toString());
  const [available, setAvailable] = useState<string>(
    product.available === true ? 'true' : 'false'
  );
  const [brand, setBrand] = useState<string>(product.brand_id);
  const [category, setCategory] = useState<string>(product.category_id);
  const [description, setDescription] = useState<string>(product.description);
  const [color, setColor] = useState<string>(product.colors.toString());
  const [size, setSize] = useState<string>(product.sizes.toString());
  const [pictures, setPictures] = useState<string>(product.pictures.toString());

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const idText = id;
    let nameText = name;
    let priceText = +price;
    let availableText = available === 'true' ? true : false;
    let brandText = brand;
    let categoryText = category;
    let descriptionText = description;
    let colorsText = color.split(',').slice(0, 5);
    let sizesText = size.split(',').slice(0, 5);
    let picturesText = pictures.split(',').slice(0, 5);

    const product = {
      _id: idText,
      name: nameText,
      description: descriptionText,
      price: priceText,
      available: availableText,
      colors: colorsText,
      sizes: sizesText,
      pictures: picturesText,
      brand_id: brandText,
      category_id: categoryText,
    };

    setName('');
    setPrice('');
    setDescription('');
    setColor('');
    setSize('');
    setPictures('');

    editProduct(product as ProductType);
    navigate('/products');
  };

  return (
    <div className={styles.editProduct}>
      <Navbar />
      <form className={styles.editProduct__form} onSubmit={submitHandler}>
        <div className={styles.editProduct__formBox}>
          <label className={styles.editProduct__label} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.editProduct__input}
            placeholder="Name.."
            max={30}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.editProduct__formBox2}>
          <div className={styles.editProduct__formBox}>
            <label className={styles.editProduct__label} htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              className={styles.editProduct__input}
              placeholder="Price.."
              max={999999}
              min={1}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className={styles.editProduct__formBox}>
            <label className={styles.editProduct__label} htmlFor="available">
              Available
            </label>
            <select
              id="available"
              className={styles.editProduct__select}
              required
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="true" className={styles.editProduct__option}>
                True
              </option>
              <option value="false" className={styles.editProduct__option}>
                False
              </option>
            </select>
          </div>
        </div>

        <div className={styles.editProduct__formBox2}>
          <div className={styles.editProduct__formBox}>
            <label className={styles.editProduct__label} htmlFor="brand">
              Brand
            </label>
            <select
              id="brand"
              className={styles.editProduct__select}
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <option
                  value={brand._id}
                  className={styles.editProduct__option}
                  key={brand._id}
                >
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.editProduct__formBox}>
            <label className={styles.editProduct__label} htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className={styles.editProduct__select}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option
                  value={category._id}
                  className={styles.editProduct__option}
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.editProduct__formBox}>
          <label className={styles.editProduct__label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={styles.editProduct__textarea}
            placeholder="Description.."
            maxLength={250}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.editProduct__formBox}>
          <label className={styles.editProduct__label} htmlFor="color">
            Colors
          </label>
          <textarea
            id="color"
            className={styles.editProduct__textarea}
            placeholder="Colors names separated by commas.."
            maxLength={50}
            required
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className={styles.editProduct__formBox}>
          <label className={styles.editProduct__label} htmlFor="size">
            Sizes
          </label>
          <textarea
            id="size"
            className={styles.editProduct__textarea}
            placeholder="Sizes names separated by commas.."
            maxLength={50}
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>

        <div className={styles.editProduct__formBox}>
          <label className={styles.editProduct__label} htmlFor="pictures">
            Pictures
          </label>
          <textarea
            id="pictures"
            className={styles.editProduct__textarea}
            placeholder="Pictures links separated by commas.."
            maxLength={750}
            required
            value={pictures}
            onChange={(e) => setPictures(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.editProduct__btn}>
          Edit
          <i className={`bi bi-plus-circle-fill ${styles.editProduct__icon}`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default EditProduct;
