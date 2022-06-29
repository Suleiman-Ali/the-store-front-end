import { MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import InputReffed from '../../InputReffed/InputReffed';
import Navbar from '../../Navbar/Navbar';
import AddButton from '../../AddButton/AddButton';
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
    <div className={styles.add}>
      <Navbar />
      <form className={styles.add__form} onSubmit={submitHandler}>
        <InputReffed
          ref={brand}
          styles={styles}
          text="Brand Name"
          placeHolder="Brand.."
        />
        <AddButton buttonCls={styles.add__btn} iconCls={styles.add__icon} />
      </form>
      <Footer />
    </div>
  );
}

export default AddBrand;
