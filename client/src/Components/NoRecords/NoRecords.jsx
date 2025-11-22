import styles from "./NoRecords.module.css";

const NoRecords = () => {
  return (
    <div className={styles.noData}>
      <p className={styles.noIcon}>📭</p>
      <p className={styles.noText}>কোনো তথ্য পাওয়া যায়নি</p>
    </div>
  );
};

export default NoRecords;
