interface CardProps {
  styles: any;
  icon: string;
  text: string;
}

function Card({ styles, icon, text }: CardProps): JSX.Element {
  return (
    <div className={styles.aboutUs__card}>
      <i className={`bi ${icon} ${styles.aboutUs__cardIcon}`}></i>
      <p className={styles.aboutUs__cardTitle}>{text}</p>
      <p className={styles.aboutUs__cardMessage}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        aliquam eius tempora omnis praesentium est error magnam! Ex ipsum ipsa
        minus. Maiores aut quibusdam ipsam sit obcaecati, accusantium libero
        quam!
      </p>
    </div>
  );
}

export default Card;
