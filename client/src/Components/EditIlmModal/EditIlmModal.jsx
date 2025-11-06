import { useState } from "react";

import styles from "./EditIlmModal.module.css";

const EditIlmModal = ({ onClose, onSubmit, data }) => {
  const [formData, setFormData] = useState({
    title: data.title,
    arabic: data.arabic,
    bangla: data.bangla,
    surah: data.surah || "",
    verse: data.verse || "",
    book: data.book || "",
    hadithNo: data.hadithNo || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Edit Ilm</h2>

        {/* ✅ Quran Fields */}

        {data.type === "quran" && (
          <div className={styles.rowFields}>
            <div className={styles.formGroup}>
              <label>Surah No</label>
              <input
                type="number"
                name="surah"
                value={formData.surah}
                onChange={handleChange}
                placeholder="Surah number"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Ayah No</label>
              <input
                type="number"
                name="verse"
                value={formData.verse}
                onChange={handleChange}
                placeholder="Ayah number"
              />
            </div>
          </div>
        )}

        {/* ✅ Hadith Fields */}
        {data.type === "hadith" && (
          <div className={styles.rowFields}>
            <div className={styles.formGroup}>
              <label>Book Name</label>
              <input
                type="text"
                name="book"
                value={formData.book}
                onChange={handleChange}
                placeholder="Book name"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Hadith No</label>
              <input
                type="number"
                name="hadithNo"
                value={formData.hadithNo}
                onChange={handleChange}
                placeholder="Hadith number"
              />
            </div>
          </div>
        )}

        {/* ✅ Title */}
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>

        {/* ✅ Arabic */}
        <div className={styles.formGroup}>
          <label>Arabic</label>
          <textarea
            name="arabic"
            className={styles.arabic}
            value={formData.arabic}
            onChange={handleChange}
            placeholder="Arabic text"
          ></textarea>
        </div>

        {/* ✅ Bangla */}
        <div className={styles.formGroup}>
          <label>Bangla</label>
          <textarea
            name="bangla"
            value={formData.bangla}
            onChange={handleChange}
            placeholder="Bangla meaning"
          ></textarea>
        </div>

        {/* ✅ Buttons */}
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submit} onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditIlmModal;
