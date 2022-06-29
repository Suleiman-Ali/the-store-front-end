import { useContext } from 'react';
import Context from '../../../../context';
import Email from './Email/Email';

interface EmailsProps {
  styles: any;
}

function Emails({ styles }: EmailsProps): JSX.Element {
  const { allEmails } = useContext(Context);
  return (
    <div className={styles.admin__emails}>
      {allEmails.map((email, index) => (
        <Email key={index} email={email} styles={styles} />
      ))}
    </div>
  );
}

export default Emails;
