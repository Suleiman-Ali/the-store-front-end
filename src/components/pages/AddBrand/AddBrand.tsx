import { MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './AddBrand.module.scss';

function AddBrand(): JSX.Element {
  const { addBrand } = useContext(Context);
  const brand = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const submitHandler = () => {
    addBrand(brand.current.value);
    navigate('/products');
  };

  return (
    <div className={styles.addBrand}>
      <Navbar />
      <form className={styles.addBrand__form} onSubmit={submitHandler}>
        <div className={styles.addBrand__formBox}>
          <label htmlFor="brand" className={styles.addBrand__label}>
            Brand Name
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            className={styles.addBrand__input}
            placeholder="Brand.."
            maxLength={50}
            required
            ref={brand}
          />
        </div>

        <button type="submit" className={styles.addBrand__btn}>
          Add
          <i className={`bi bi-plus-circle-fill ${styles.addBrand__icon}`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default AddBrand;
