import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>লোড হচ্ছে...</p>
    </div>
  );
};

export default Loading;
