import { FormEventHandler, MutableRefObject, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './SingUp.module.scss';

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const { signUp } = useContext(Context);
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const nameText = name.current.value;
    const emailText = email.current.value;
    const passwordText = password.current.value;
    name.current.value = email.current.value = password.current.value = '';
    signUp(nameText, emailText, passwordText);
    navigate('/');
  };

  return (
    <div className={styles.signUp}>
      <Navbar />
      <form className={styles.signUp__form} onSubmit={submitHandler}>
        <div className={styles.signUp__formBox}>
          <label htmlFor="name" className={styles.signUp__label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={styles.signUp__input}
            placeholder="Name.."
            required
            maxLength={50}
            ref={name}
          />
        </div>
        <div className={styles.signUp__formBox}>
          <label htmlFor="email" className={styles.signUp__label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.signUp__input}
            placeholder="Email.."
            required
            maxLength={75}
            ref={email}
          />
        </div>
        <div className={styles.signUp__formBox}>
          <label htmlFor="password" className={styles.signUp__label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.signUp__input}
            placeholder="Password"
            required
            maxLength={50}
            ref={password}
          />
        </div>
        <div className={styles.signUp__buttonsBox}>
          <Link to="/login" className={styles.signUp__link}>
            <i className={`bi bi-arrow-left ${styles.signUp__icon}`}></i>
            Login
          </Link>

          <button type="submit" className={styles.signUp__btn}>
            Sign Up
            <i className={`bi bi-arrow-right ${styles.signUp__icon}`}></i>
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default SignUp;
