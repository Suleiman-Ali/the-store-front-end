import Context from '../../context';
import AddButton from '../AddButton';
import Footer from '../Footer';
import InputReffed from '../InputReffed';
import Navbar from '../Navbar';
import { MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCategoryPage(): JSX.Element {
  const { addCategory } = useContext(Context);
  const category = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const submitHandler = () => {
    addCategory(category.current.value);
    navigate('/products');
  };

  return (
    <div className="add">
      <Navbar />
      <form className="add__form" onSubmit={submitHandler}>
        <InputReffed
          ref={category}
          text="Category Name"
          placeHolder="Category.."
        />
        <AddButton buttonCls="add__btn" iconCls="add__icon" />
      </form>
      <Footer />
    </div>
  );
}

export default AddCategoryPage;
