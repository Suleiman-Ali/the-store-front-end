import { FormEventHandler, MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import { ProductType } from '../../../data';
import AddButton from '../../AddButton/AddButton';
import Footer from '../../Footer/Footer';
import InputReffed from '../../InputReffed/InputReffed';
import Navbar from '../../Navbar/Navbar';
import SelectReffed from '../../SelectReffed/SelectReffed';
import TextareaReffed from '../../TextareaReffed/TextareaReffed';
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

    addProduct(product as ProductType);
    navigate('/products');
  };

  return (
    <div className={styles.add}>
      <Navbar />
      <form className={styles.add__form} onSubmit={submitHandler}>
        <InputReffed
          styles={styles}
          ref={name}
          text="Name"
          placeHolder="Name.."
        />

        <div className={styles.add__formBox2}>
          <InputReffed
            styles={styles}
            ref={price}
            text="Price"
            placeHolder="Price.."
            min={1}
            max={999999}
            type="number"
          />

          <SelectReffed
            styles={styles}
            ref={available}
            text="Available"
            items={[
              {
                _id: 'true',
                name: 'True',
              },
              {
                _id: 'false',
                name: 'False',
              },
            ]}
          />
        </div>

        <div className={styles.add__formBox2}>
          <SelectReffed
            styles={styles}
            ref={brand}
            text="Brand"
            items={brands}
          />
          <SelectReffed
            styles={styles}
            ref={category}
            text="Category"
            items={categories}
          />
        </div>

        <TextareaReffed
          styles={styles}
          ref={description}
          text="Description"
          placeholder="Description.."
          maxLength={500}
        />

        <TextareaReffed
          styles={styles}
          ref={color}
          text="Colors"
          placeholder="Colors names separated by commas.."
          maxLength={100}
        />

        <TextareaReffed
          styles={styles}
          ref={size}
          text="Sizes"
          placeholder="Sizes names separated by commas.."
          maxLength={100}
        />

        <TextareaReffed
          styles={styles}
          ref={pictures}
          text="Pictures"
          placeholder="Pictures names separated by commas.."
          maxLength={1000}
        />

        <AddButton buttonCls={styles.add__btn} iconCls={styles.add__icon} />
      </form>
      <Footer />
    </div>
  );
}

export default AddProduct;
