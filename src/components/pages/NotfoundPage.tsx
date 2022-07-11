import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

function NotfoundPage(): JSX.Element {
  return (
    <div className="notfound">
      <Navbar />
      <div className="notfound__main">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__text">
          The page you are looking for does not exist..
        </p>
        <Link to="/" className="notfound__link" replace>
          <i className={`bi bi-arrow-left notfound__icon`}></i>
          Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotfoundPage;
