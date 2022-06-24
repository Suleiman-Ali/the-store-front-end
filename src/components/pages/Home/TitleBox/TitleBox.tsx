import { Link } from 'react-router-dom';

interface TitleBoxProps {
  styles: any;
}

function TitleBox({ styles }: TitleBoxProps): JSX.Element {
  return (
    <div className={styles.titleBox}>
      <div className={styles.titleBox__left}>
        <h1 className={styles.titleBox__title}>Design Your Comfort Zone</h1>
        <p className={styles.titleBox__text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          excepturi reprehenderit eum, repellat iure voluptatibus nesciunt
          corrupti ullam hic praesentium eligendi et quos sint officia rem
          voluptatum. Sequi accusantium cupiditate fuga deleniti non odio iste
          placeat incidunt dolore quidem ut tenetur reprehenderit cum fugiat
          repellendus aliquid, provident esse. Fuga adipisci provident sunt
          pariatur quae, ipsam aut nesciunt? Officia, cupiditate quidem?
        </p>
        <Link className={styles.titleBox__btn} to="/products">
          Shop Now
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      <div className={styles.titleBox__right}>
        <img
          className={styles.titleBox__img}
          src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}

export default TitleBox;
