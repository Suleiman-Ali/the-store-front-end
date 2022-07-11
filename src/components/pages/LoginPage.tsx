import jwtDecode from 'jwt-decode';
import {
  FormEventHandler,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import ErrorMessage from '../ErrorMessage';
import Footer from '../Footer';
import InputReffed from '../InputReffed';
import Navbar from '../Navbar';

function LoginPage(): JSX.Element {
  const { userSetter } = useContext(Context);
  const navigate = useNavigate();
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const [error, setError] = useState<string>('');

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const emailText = email.current.value;
    const passwordText = password.current.value;
    email.current.value = password.current.value = '';

    try {
      const { data: token } = await api.post('/auth', {
        email: emailText,
        password: passwordText,
      });
      userSetter(jwtDecode(token));
      localStorage.setItem('JWT_TOKEN', token);
      navigate('/');
    } catch (e) {
      setError('Email or Password is wrong..');
    }
  };

  return (
    <div className="login">
      <Navbar />
      <form className="login__form" onSubmit={login}>
        {error && <ErrorMessage message={error} onClick={() => setError('')} />}
        <InputReffed
          text="Email"
          type="email"
          placeHolder="Email.."
          maxLength={75}
          ref={email}
        />
        <InputReffed
          text="Password"
          type="password"
          placeHolder="Password.."
          maxLength={50}
          ref={password}
        />

        <div className="login__buttonsBox">
          <Link to="/sign-up" className="login__link">
            <i className={`bi bi-arrow-left $"login__icon"`}></i>
            Sing Up
          </Link>

          <button type="submit" className="login__btn">
            Login
            <i className={`bi bi-arrow-right $"login__icon"`}></i>
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default LoginPage;
