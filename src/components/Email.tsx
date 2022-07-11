import { useState } from 'react';
import { EmailType } from '../data';

interface EmailProps {
  email: EmailType;
}

function Email({ email }: EmailProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const preDate = new Date(email.date as string)
    .toLocaleDateString()
    .split('/');
  const date = `${preDate[1]}/${preDate[0]}/${preDate[2]}`;

  return (
    <div className="admin__emailBox">
      <div className="admin__emailItem">
        <p className="admin__emailProperty">{email.title}</p>
        <p className="admin__emailProperty admin__emailPropertyEmail">
          {email.user_email}
        </p>
        <p className="admin__emailProperty">{date}</p>
        <i
          className={`bi bi-caret-${
            open ? 'down' : 'up'
          }-fill ${'admin__emailIcon'}`}
          onClick={() => setOpen((open) => !open)}
        ></i>
      </div>

      {open && (
        <div className="admin__emailContent">
          <p className="admin__emailHeader">{email.title}</p>
          <p className="admin__emailText">{email.message}</p>
        </div>
      )}
    </div>
  );
}
export default Email;
