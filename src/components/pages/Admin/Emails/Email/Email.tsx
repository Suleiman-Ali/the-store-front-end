import { useState } from 'react';
import { EmailType } from '../../../../../data';

interface EmailProps {
  styles: any;
  email: EmailType;
}

function Email({ styles, email }: EmailProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.admin__emailBox}>
      <div className={styles.admin__emailItem}>
        <p className={styles.admin__emailProperty}>{email.title}</p>
        <p className={styles.admin__emailProperty}>{email.user_email}</p>
        <p className={styles.admin__emailProperty}>
          {new Date(email.date as string).getUTCDay()}/
          {new Date(email.date as string).getUTCMonth()}/
          {new Date(email.date as string).getUTCFullYear()}
        </p>
        <i
          className={`bi bi-caret-${open ? 'down' : 'up'}-fill ${
            styles.admin__emailIcon
          }`}
          onClick={() => setOpen((open) => !open)}
        ></i>
      </div>

      {open && (
        <div className={styles.admin__emailContent}>
          <p className={styles.admin__emailHeader}>{email.title}</p>
          <p className={styles.admin__emailText}>{email.message}</p>
        </div>
      )}
    </div>
  );
}
export default Email;
