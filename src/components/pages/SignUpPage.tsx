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

function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const { userSetter } = useContext(Context);
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const [error, setError] = useState<string>('');

  const signUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const nameText = name.current.value;
    const emailText = email.current.value;
    const passwordText = password.current.value;
    name.current.value = email.current.value = password.current.value = '';

    try {
      const { data: userObj } = await api.post('/users', {
        name: nameText,
        email: emailText,
        password: passwordText,
      });

      userSetter(userObj);
      navigate('/');

      const { data: token } = await api.post('/auth', {
        email: emailText,
        password: passwordText,
      });

      const config = {
        headers: { 'x-auth-token': token as string },
      };

      await api.post('/carts', {}, config);

      localStorage.setItem('JWT_TOKEN', token);
    } catch (error) {
      return setError('User already exist..');
    }
  };

  return (
    <div className="signUp">
      <Navbar />
      <form className="signUp__form" onSubmit={signUp}>
        {error && <ErrorMessage message={error} onClick={() => setError('')} />}
        <InputReffed
          text="Name"
          type="text"
          placeHolder="Name.."
          maxLength={50}
          ref={name}
        />
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

        <div className="signUp__buttonsBox">
          <Link to="/login" className="signUp__link">
            <i className={`bi bi-arrow-left $"signUp__icon"`}></i>
            Login
          </Link>

          <button type="submit" className="signUp__btn">
            Sign Up
            <i className={`bi bi-arrow-right $"signUp__icon"`}></i>
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default SignUpPage;
