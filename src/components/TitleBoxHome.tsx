import HeroImg from '../images/hero.jpeg';
import { Link } from 'react-router-dom';

function TitleBox(): JSX.Element {
  return (
    <div className="titleBox">
      <div className="titleBox__left">
        <h1 className="titleBox__title">Design Your Comfort Zone</h1>
        <p className="titleBox__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          excepturi reprehenderit eum, repellat iure voluptatibus nesciunt
          corrupti ullam hic praesentium eligendi et quos sint officia rem
          voluptatum. Sequi accusantium cupiditate fuga deleniti non odio iste
          placeat incidunt dolore quidem ut tenetur reprehenderit cum fugiat
          repellendus aliquid, provident esse. Fuga adipisci provident sunt
          pariatur quae, ipsam aut nesciunt? Officia, cupiditate quidem?
        </p>
        <Link className="titleBox__btn" to="/products">
          Shop Now
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      <div className="titleBox__right">
        <img className="titleBox__img" src={HeroImg} alt="" />
      </div>
    </div>
  );
}

export default TitleBox;
