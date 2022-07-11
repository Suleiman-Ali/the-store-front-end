import { ProductType } from '../data';

interface ProductPicturesProps {
  product: ProductType;
  selectedPic: string;
  onClick: (img: string) => void;
}

function ProductPictures({
  product,
  selectedPic,
  onClick,
}: ProductPicturesProps): JSX.Element {
  return (
    <div className="productPage__picturesBox">
      {product.pictures.map((img) => (
        <img
          className={`productPage__littleImg ${
            img === selectedPic && 'productPage__littleImgSelected'
          }`}
          src={img}
          alt=""
          key={img}
          onClick={() => onClick(img)}
        />
      ))}
    </div>
  );
}

export default ProductPictures;
