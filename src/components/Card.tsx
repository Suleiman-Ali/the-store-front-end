interface CardProps {
  icon: string;
  text: string;
}

function Card({ icon, text }: CardProps): JSX.Element {
  return (
    <div className="aboutUs__card">
      <i className={`bi ${icon} aboutUs__cardIcon`}></i>
      <p className="aboutUs__cardTitle">{text}</p>
      <p className="aboutUs__cardMessage">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        aliquam eius tempora omnis praesentium est error magnam! Ex ipsum ipsa
        minus. Maiores aut quibusdam ipsam sit obcaecati, accusantium libero
        quam!
      </p>
    </div>
  );
}

export default Card;
