import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.icon}>⚠️</div>

        <h2 className={styles.title}>রেকর্ড পাওয়া যায়নি</h2>
        <p className={styles.text}>
          আপনি যে তথ্যটি খুঁজছেন, তা বর্তমানে ডাটাবেজে নেই।
        </p>

        <Link to="/" className={styles.homeBtn}>
          ⬅️ হোম পেইজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
