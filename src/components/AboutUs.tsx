import Card from './Card';
import TitleBox from './TitleBox';

function AboutUs(): JSX.Element {
  return (
    <div className="aboutUs">
      <TitleBox />
      <div className="aboutUs__cards">
        <Card icon="bi-check2-circle" text="Mission" />
        <Card icon="bi-balloon-fill" text="Vision" />
        <Card icon="bi-hourglass-split" text="History" />
      </div>
    </div>
  );
}

export default AboutUs;
