import { MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import InputReffed from '../../InputReffed/InputReffed';
import Navbar from '../../Navbar/Navbar';
import AddButton from '../../AddButton/AddButton';
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
    <div className={styles.add}>
      <Navbar />
      <form className={styles.add__form} onSubmit={submitHandler}>
        <InputReffed
          ref={category}
          styles={styles}
          text="Category Name"
          placeHolder="Category.."
        />
        <AddButton buttonCls={styles.add__btn} iconCls={styles.add__icon} />
      </form>
      <Footer />
    </div>
  );
}

export default AddCategory;
