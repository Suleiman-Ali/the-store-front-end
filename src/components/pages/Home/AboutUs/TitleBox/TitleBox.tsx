interface TitleBoxProps {
  styles: any;
}

function TitleBox({ styles }: TitleBoxProps): JSX.Element {
  return (
    <div className={styles.aboutUs__titleBox}>
      <p className={styles.aboutUs__title}>Everything you Desire..</p>
      <p className={styles.aboutUs__message}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum
        debitis consectetur reprehenderit non aliquam voluptates dolore aut vero
        consequuntur.
      </p>
    </div>
  );
}

export default TitleBox;
