import { FormEventHandler, MutableRefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import Context from '../../../context';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './ContactUs.module.scss';

function ContactUs(): JSX.Element {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const title = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const titleText = title.current.value;
    const messageText = message.current.value;
    title.current.value = message.current.value = '';

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    await api.post(
      '/emails',
      {
        title: titleText,
        message: messageText,
      },
      config
    );
  };

  return (
    <div className={styles.contactUs}>
      <Navbar />
      <form className={styles.contactUs__form} onSubmit={submitHandler}>
        <div className={styles.contactUs__formBox}>
          <label htmlFor="title" className={styles.contactUs__label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={styles.contactUs__input}
            placeholder="Subject.."
            maxLength={50}
            required
            ref={title}
          />
        </div>
        <div className={styles.contactUs__formBox}>
          <label htmlFor="message" className={styles.contactUs__label}>
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className={styles.contactUs__textarea}
            placeholder="Message.."
            maxLength={500}
            required
            ref={message}
          />
        </div>
        <button type="submit" className={styles.contactUs__btn}>
          Send
          <i className={`bi bi-send-fill ${styles.contactUs__icon}`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default ContactUs;
