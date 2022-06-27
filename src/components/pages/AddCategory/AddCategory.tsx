import { MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './AddCategory.module.scss';

function AddCategory(): JSX.Element {
  const { addCategory } = useContext(Context);
  const category = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const submitHandler = () => {
    addCategory(category.current.value);
    navigate('/products');
  };

  return (
    <div className={styles.addCategory}>
      <Navbar />
      <form className={styles.addCategory__form} onSubmit={submitHandler}>
        <div className={styles.addCategory__formBox}>
          <label htmlFor="category" className={styles.addCategory__label}>
            Category Name
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className={styles.addCategory__input}
            placeholder="Category.."
            maxLength={50}
            required
            ref={category}
          />
        </div>

        <button type="submit" className={styles.addCategory__btn}>
          Add
          <i className={`bi bi-plus-circle-fill ${styles.addCategory__icon}`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default AddCategory;
