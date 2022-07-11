import Footer from '../Footer';
import Navbar from '../Navbar';
import Featured from '../Featured';
import AboutUs from '../AboutUs';
import TitleBox from '../TitleBoxHome';

function HomePage(): JSX.Element {
  return (
    <div className="home">
      <Navbar />
      <TitleBox />
      <Featured />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default HomePage;
