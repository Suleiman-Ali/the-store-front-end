import { useContext } from 'react';
import Context from '../context';
import Email from './Email';

function Emails(): JSX.Element {
  const { allEmails } = useContext(Context);
  return (
    <div className="admin__emails">
      {allEmails.map((email, index) => (
        <Email key={index} email={email} />
      ))}
    </div>
  );
}

export default Emails;
