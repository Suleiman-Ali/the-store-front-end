import { FormEventHandler, MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import { ProductType } from '../../../data';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './AddProduct.module.scss';

function AddProduct(): JSX.Element {
  const { brands, categories, addProduct } = useContext(Context);
  const navigate = useNavigate();
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const price = useRef() as MutableRefObject<HTMLInputElement>;
  const available = useRef() as MutableRefObject<HTMLSelectElement>;
  const brand = useRef() as MutableRefObject<HTMLSelectElement>;
  const category = useRef() as MutableRefObject<HTMLSelectElement>;
  const description = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const color = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const size = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const pictures = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let nameText = name.current.value;
    let priceText = +price.current.value;
    let availableText = available.current.value === 'true' ? true : false;
    let brandText = brand.current.value;
    let categoryText = category.current.value;
    let descriptionText = description.current.value;
    let colorsText = color.current.value.split(',').slice(0, 5);
    let sizesText = size.current.value.split(',').slice(0, 5);
    let picturesText = pictures.current.value.split(',').slice(0, 5);

    const product = {
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

    name.current.value =
      price.current.value =
      description.current.value =
      color.current.value =
      size.current.value =
      pictures.current.value =
        '';

    console.log(product);

    addProduct(product as ProductType);
    navigate('/products');
  };

  return (
    <div className={styles.addProduct}>
      <Navbar />
      <form className={styles.addProduct__form} onSubmit={submitHandler}>
        <div className={styles.addProduct__formBox}>
          <label className={styles.addProduct__label} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.addProduct__input}
            placeholder="Name.."
            max={30}
            required
            ref={name}
          />
        </div>

        <div className={styles.addProduct__formBox2}>
          <div className={styles.addProduct__formBox}>
            <label className={styles.addProduct__label} htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              className={styles.addProduct__input}
              placeholder="Price.."
              max={999999}
              min={1}
              required
              ref={price}
            />
          </div>

          <div className={styles.addProduct__formBox}>
            <label className={styles.addProduct__label} htmlFor="available">
              Available
            </label>
            <select
              id="available"
              className={styles.addProduct__select}
              required
              ref={available}
            >
              <option value="true" className={styles.addProduct__option}>
                True
              </option>
              <option value="false" className={styles.addProduct__option}>
                False
              </option>
            </select>
          </div>
        </div>

        <div className={styles.addProduct__formBox2}>
          <div className={styles.addProduct__formBox}>
            <label className={styles.addProduct__label} htmlFor="brand">
              Brand
            </label>
            <select
              id="brand"
              className={styles.addProduct__select}
              required
              ref={brand}
            >
              {brands.map((brand) => (
                <option
                  value={brand._id}
                  className={styles.addProduct__option}
                  key={brand._id}
                >
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.addProduct__formBox}>
            <label className={styles.addProduct__label} htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className={styles.addProduct__select}
              required
              ref={category}
            >
              {categories.map((category) => (
                <option
                  value={category._id}
                  className={styles.addProduct__option}
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.addProduct__formBox}>
          <label className={styles.addProduct__label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={styles.addProduct__textarea}
            placeholder="Description.."
            maxLength={250}
            required
            ref={description}
          />
        </div>

        <div className={styles.addProduct__formBox}>
          <label className={styles.addProduct__label} htmlFor="color">
            Colors
          </label>
          <textarea
            id="color"
            className={styles.addProduct__textarea}
            placeholder="Colors names separated by commas.."
            maxLength={50}
            required
            ref={color}
          />
        </div>

        <div className={styles.addProduct__formBox}>
          <label className={styles.addProduct__label} htmlFor="size">
            Sizes
          </label>
          <textarea
            id="size"
            className={styles.addProduct__textarea}
            placeholder="Sizes names separated by commas.."
            maxLength={50}
            required
            ref={size}
          />
        </div>

        <div className={styles.addProduct__formBox}>
          <label className={styles.addProduct__label} htmlFor="pictures">
            Pictures
          </label>
          <textarea
            id="pictures"
            className={styles.addProduct__textarea}
            placeholder="Pictures links separated by commas.."
            maxLength={750}
            required
            ref={pictures}
          />
        </div>

        <button type="submit" className={styles.addProduct__btn}>
          Add
          <i className={`bi bi-plus-circle-fill ${styles.addProduct__icon}`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default AddProduct;
