import { FormEventHandler, MutableRefObject, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './Login.module.scss';

function Login(): JSX.Element {
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const emailText = email.current.value;
    const passwordText = password.current.value;
    email.current.value = password.current.value = '';
    login(emailText, passwordText);
    navigate('/');
  };

  return (
    <div className={styles.login}>
      <Navbar />
      <form className={styles.login__form} onSubmit={submitHandler}>
        <div className={styles.login__formBox}>
          <label htmlFor="email" className={styles.login__label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.login__input}
            placeholder="Email.."
            required
            maxLength={75}
            ref={email}
          />
        </div>
        <div className={styles.login__formBox}>
          <label htmlFor="password" className={styles.login__label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.login__input}
            placeholder="Password"
            required
            maxLength={50}
            ref={password}
          />
        </div>
        <div className={styles.login__buttonsBox}>
          <Link to="/sign-up" className={styles.login__link}>
            <i className={`bi bi-arrow-left ${styles.login__icon}`}></i>
            Sing Up
          </Link>

          <button type="submit" className={styles.login__btn}>
            Login
            <i className={`bi bi-arrow-right ${styles.login__icon}`}></i>
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
