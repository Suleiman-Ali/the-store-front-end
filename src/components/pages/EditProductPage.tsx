import Context from '../../context';
import Footer from '../Footer';
import InputChange from '../InputChange';
import Navbar from '../Navbar';
import TextareaChange from '../TextareaChange';
import { FormEventHandler, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductType } from '../../data';

function EditProductPage(): JSX.Element {
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
    <div className="editProduct">
      <Navbar />
      <form className="editProduct__form" onSubmit={submitHandler}>
        <InputChange
          text="Name"
          type="text"
          placeHolder="Name.."
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <div className="editProduct__formBox2">
          <InputChange
            text="Price"
            type="number"
            placeHolder="Price.."
            min={1}
            max={999999}
            value={price}
            onChange={(e) => setPrice(e.currentTarget.value)}
          />

          <div className="editProduct__formBox">
            <label className="editProduct__label" htmlFor="available">
              Available
            </label>
            <select
              id="available"
              className="editProduct__select"
              required
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="true" className="editProduct__option">
                True
              </option>
              <option value="false" className="editProduct__option">
                False
              </option>
            </select>
          </div>
        </div>

        <div className="editProduct__formBox2">
          <div className="editProduct__formBox">
            <label className="editProduct__label" htmlFor="brand">
              Brand
            </label>
            <select
              id="brand"
              className="editProduct__select"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <option
                  value={brand._id}
                  className="editProduct__option"
                  key={brand._id}
                >
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="editProduct__formBox">
            <label className="editProduct__label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="editProduct__select"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option
                  value={category._id}
                  className="editProduct__option"
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TextareaChange
          text="Description"
          placeHold="Description.."
          maxLength={250}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <TextareaChange
          text="Colors"
          placeHold="Colors names separated by commas.."
          maxLength={50}
          value={color}
          onChange={(e) => setColor(e.currentTarget.value)}
        />
        <TextareaChange
          text="Sizes"
          placeHold="Sizes names separated by commas.."
          maxLength={50}
          value={size}
          onChange={(e) => setSize(e.currentTarget.value)}
        />
        <TextareaChange
          text="Pictures"
          placeHold="Pictures links separated by commas."
          maxLength={750}
          value={pictures}
          onChange={(e) => setPictures(e.currentTarget.value)}
        />
        <button type="submit" className="editProduct__btn">
          Edit
          <i className={`bi bi-plus-circle-fill $"editProduct__icon"`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default EditProductPage;
