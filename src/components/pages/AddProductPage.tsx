import { FormEventHandler, MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context';
import { ProductType } from '../../data';
import AddButton from '../AddButton';
import Footer from '../Footer';
import InputReffed from '../InputReffed';
import Navbar from '../Navbar';
import SelectReffed from '../SelectReffed';
import TextareaReffed from '../TextareaReffed';

function AddProductPage(): JSX.Element {
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
    let colorsText = color.current.value.split(',').slice(0, 3);
    let sizesText = size.current.value.split(',').slice(0, 3);
    let picturesText = pictures.current.value.split(',').slice(0, 3);

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
    <div className="add">
      <Navbar />
      <form className="add__form" onSubmit={submitHandler}>
        <InputReffed ref={name} text="Name" placeHolder="Name.." />

        <div className="add__formBox2">
          <InputReffed
            ref={price}
            text="Price"
            placeHolder="Price.."
            min={1}
            max={999999}
            type="number"
          />

          <SelectReffed
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

        <div className="add__formBox2">
          <SelectReffed ref={brand} text="Brand" items={brands} />
          <SelectReffed ref={category} text="Category" items={categories} />
        </div>

        <TextareaReffed
          ref={description}
          text="Description"
          placeholder="Description.."
          maxLength={500}
        />

        <TextareaReffed
          ref={color}
          text="Colors"
          placeholder="Colors names separated by commas.."
          maxLength={100}
        />

        <TextareaReffed
          ref={size}
          text="Sizes"
          placeholder="Sizes names separated by commas.."
          maxLength={100}
        />

        <TextareaReffed
          ref={pictures}
          text="Pictures"
          placeholder="Pictures names separated by commas.."
          maxLength={1000}
        />

        <AddButton buttonCls="add__btn" iconCls="add__icon" />
      </form>
      <Footer />
    </div>
  );
}

export default AddProductPage;
