import api from '../../api';
import ErrorMessage from '../ErrorMessage';
import Footer from '../Footer';
import InputReffed from '../InputReffed';
import Navbar from '../Navbar';
import SuccessMessage from '../SuccessMessage';
import TextareaReffed from '../TextareaReffed';
import { FormEventHandler, MutableRefObject, useRef, useState } from 'react';
import { getConfig } from '../../data';

function ContactUsPage(): JSX.Element {
  const title = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const titleText = title.current.value;
    const messageText = message.current.value;
    title.current.value = message.current.value = '';

    try {
      const config = getConfig();
      await api.post(
        '/emails',
        {
          title: titleText,
          message: messageText,
        },
        config
      );
      setSuccess('Message was sent..');
    } catch (e) {
      setError('Message was not sent, try again..');
    }
  };

  return (
    <div className="contactUs">
      <Navbar />
      <form className="contactUs__form" onSubmit={submitHandler}>
        {error && <ErrorMessage message={error} onClick={() => setError('')} />}
        {success && (
          <SuccessMessage message={success} onClick={() => setSuccess('')} />
        )}
        <InputReffed
          text="Title"
          type="text"
          placeHolder="Subject.."
          maxLength={50}
          ref={title}
        />

        <TextareaReffed
          text="Message"
          placeholder="Message.."
          maxLength={500}
          ref={message}
        />

        <button type="submit" className="contactUs__btn">
          Send
          <i className={`bi bi-send-fill $"contactUs__icon"`} />
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default ContactUsPage;
