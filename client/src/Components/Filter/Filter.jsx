import styles from "./Filter.module.css";

const Filter = ({ search, setSearch, filter, setFilter, user }) => {
  return (
    <>
      <input
        type="text"
        className={styles.search}
        placeholder="শিরোনাম দিয়ে খুঁজুন..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value=""
            checked={filter === ""}
            onChange={() => setFilter("")}
          />
          <span></span> সব
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value="quran"
            checked={filter === "quran"}
            onChange={() => setFilter("quran")}
          />
          <span></span> কুরআন
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value="hadith"
            checked={filter === "hadith"}
            onChange={() => setFilter("hadith")}
          />
          <span></span> হাদিস
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value="dua"
            checked={filter === "dua"}
            onChange={() => setFilter("dua")}
          />
          <span></span> দোয়া
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value="general"
            checked={filter === "general"}
            onChange={() => setFilter("general")}
          />
          <span></span> সাধারণ
        </label>

        {user && (
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="filter"
              value="bookmark"
              checked={filter === "bookmark"}
              onChange={() => setFilter("bookmark")}
            />
            <span></span> ফেভারিট
          </label>
        )}
      </div>
    </>
  );
};

export default Filter;
