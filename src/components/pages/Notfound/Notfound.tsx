import { Link } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Notfound.module.scss';

function Notfound(): JSX.Element {
  return (
    <div className={styles.notfound}>
      <Navbar />
      <div className={styles.notfound__main}>
        <h1 className={styles.notfound__title}>404</h1>
        <p className={styles.notfound__text}>
          The page you are looking for does not exist..
        </p>
        <Link to="/" className={styles.notfound__link} replace>
          <i className={`bi bi-arrow-left ${styles.notfound__icon}`}></i>
          Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Notfound;
