import TitleBox from './TitleBox/TitleBox';
import Card from './Card/Card';

interface AboutUsProps {
  styles: any;
}

function AboutUs({ styles }: AboutUsProps): JSX.Element {
  return (
    <div className={styles.aboutUs}>
      <TitleBox styles={styles} />
      <div className={styles.aboutUs__cards}>
        <Card styles={styles} icon="bi-check2-circle" text="Mission" />
        <Card styles={styles} icon="bi-balloon-fill" text="Vision" />
        <Card styles={styles} icon="bi-hourglass-split" text="History" />
      </div>
    </div>
  );
}

export default AboutUs;
