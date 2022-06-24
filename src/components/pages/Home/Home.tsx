import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import Featured from './Featured/Featured';
import TitleBox from './TitleBox/TitleBox';
import AboutUs from './AboutUs/AboutUs';
import styles from './Home.module.scss';

function Home(): JSX.Element {
  return (
    <div className={styles.home}>
      <Navbar />
      <TitleBox styles={styles} />
      <Featured styles={styles} />
      <AboutUs styles={styles} />
      <Footer />
    </div>
  );
}

export default Home;
