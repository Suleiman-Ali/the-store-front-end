import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import styles from './About.module.scss';

function About(): JSX.Element {
  return (
    <div className={styles.about}>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.main__left}>
          <img
            className={styles.main__img}
            src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f.jpeg"
            alt=""
          />
        </div>

        <div className={styles.main__right}>
          <h1 className={styles.main__title}>Our Story</h1>
          <p className={styles.main__text}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            accusantium sapiente tempora sed dolore esse deserunt eaque
            excepturi, delectus error accusamus vel eligendi, omnis beatae.
            Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
            dolore, obcaecati incidunt sequi blanditiis est exercitationem
            molestiae delectus saepe odio eligendi modi porro eaque in libero
            minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
            ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
            similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
            iste.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
