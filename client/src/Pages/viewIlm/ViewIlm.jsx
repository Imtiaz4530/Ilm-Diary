import { useParams } from "react-router-dom";
import { useState } from "react";

import data from "../../data/ilmData.json";
import styles from "./ViewIlm.module.css";
import EditIlmModal from "../../Components/EditIlmModal/EditIlmModal";

const ViewIlm = () => {
  const { id } = useParams();
  const record = data.find((d) => d.id === Number(id));

  const [showEdit, setShowEdit] = useState(false);

  if (!record) return <p>Data not found</p>;

  const handleUpdate = (updatedData) => {
    console.log("UPDATE:", updatedData);
    // later you will send this to backend
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{record.title}</h2>
        <button className={styles.editBtn} onClick={() => setShowEdit(true)}>
          ✏️ Edit
        </button>
      </div>

      <p className={styles.type}>
        {record.type === "quran" ? "📗 Quran" : "📘 Hadith"}
      </p>

      <div className={styles.box}>
        <p className={styles.arabic}>{record.arabic}</p>
      </div>

      <div className={styles.box}>
        <p className={styles.bangla}>{record.bangla}</p>
      </div>

      <div className={styles.ref}>
        {record.type === "quran"
          ? `Surah ${record.surah} • Ayah ${record.verse}`
          : `${record.book} • Hadith ${record.hadithNo}`}
      </div>

      {showEdit && (
        <EditIlmModal
          onClose={() => setShowEdit(false)}
          onSubmit={handleUpdate}
          data={record}
        />
      )}
    </div>
  );
};

export default ViewIlm;
