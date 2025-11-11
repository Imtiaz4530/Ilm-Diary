import styles from "./NotFoundRoute.module.css";
import { Link } from "react-router-dom";

const NotFoundRoute = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.msg}>Page Not Found</p>

      <Link to="/" className={styles.homeBtn}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundRoute;
