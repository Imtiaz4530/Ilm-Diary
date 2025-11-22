import styles from "./Info.module.css";

const Info = ({ item }) => {
  return (
    <>
      {(item.type === "quran" || item.type === "hadith") && (
        <span className={styles.ref}>
          {item.type === "quran" ? (
            <>
              <span className={styles.hiddenTitle}>সূরা</span> {item.surah} •
              <span className={styles.hiddenTitle}>আয়াত</span>
              {item.lineType === "multiple"
                ? `${item.startingVerse}-${item.endingVerse}`
                : item.verse}
            </>
          ) : (
            <>
              {item.book} • হাদিস {item.hadithNo}
            </>
          )}
        </span>
      )}
    </>
  );
};

export default Info;
