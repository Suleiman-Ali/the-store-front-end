import Context from '../../context/index';
import Footer from '../Footer';
import InputReffed from '../InputReffed';
import Navbar from '../Navbar';
import AddButton from '../AddButton';
import { MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBrandPage(): JSX.Element {
  const { addBrand } = useContext(Context);
  const brand = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const submitHandler = () => {
    addBrand(brand.current.value);
    navigate('/products');
  };

  return (
    <div className="add">
      <Navbar />
      <form className="add__form" onSubmit={submitHandler}>
        <InputReffed ref={brand} text="Brand Name" placeHolder="Brand.." />
        <AddButton buttonCls="add__btn" iconCls="add__icon" />
      </form>
      <Footer />
    </div>
  );
}

export default AddBrandPage;
