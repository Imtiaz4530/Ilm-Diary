import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./AddIlmModal.module.css";
import { createIlmRecord } from "../../api/ilmApi";

const AddIlmModal = ({ onClose }) => {
  const [type, setType] = useState("quran");
  const [formData, setFormData] = useState({
    title: "",
    arabic: "",
    bangla: "",
    surah: "",
    verse: "",
    book: "",
    hadithNo: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createIlmRecord,
    onSuccess: () => {
      queryClient.invalidateQueries(["stories"]);

      setFormData({ title: "", link: "", content: "" });
      navigate("/");
    },
    onError: () => {
      toast.error("❌ রেকর্ড সংরক্ষণ ব্যর্থ হয়েছে!");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ilmRecordData = {
      title: formData.title,
      type: type,
      arabic: formData.arabic,
      bangla: formData.bangla,
      surah: type === "quran" ? formData.surah : null,
      verse: type === "quran" ? formData.verse : null,
      book: type === "hadith" ? formData.book : null,
      hadithNo: type === "hadith" ? formData.hadithNo : null,
    };

    mutate(ilmRecordData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Add Ilm</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Type</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="quran"
                  checked={type === "quran"}
                  onChange={() => setType("quran")}
                />
                <span></span> Quran
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="hadith"
                  checked={type === "hadith"}
                  onChange={() => setType("hadith")}
                />
                <span></span> Hadith
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="হাদিস/কুরআনের বিষয়"
              onChange={handleChange}
              value={formData.title}
              required
            />
          </div>

          {type === "quran" && (
            <div className={styles.rowFields}>
              <div className={styles.formGroup}>
                <label>Surah No.</label>
                <input
                  type="number"
                  name="surah"
                  value={formData.surah}
                  onChange={(e) =>
                    setFormData({ ...formData, surah: e.target.value })
                  }
                  placeholder="সুরাহ নাম্বার"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Verse No.</label>
                <input
                  type="number"
                  name="verse"
                  value={formData.verse}
                  onChange={(e) =>
                    setFormData({ ...formData, verse: e.target.value })
                  }
                  placeholder="আয়াত নাম্বার"
                  required
                />
              </div>
            </div>
          )}

          {type === "hadith" && (
            <div className={styles.rowFields}>
              <div className={styles.formGroup}>
                <label>Book Name</label>
                <input
                  type="text"
                  name="book"
                  value={formData.book}
                  onChange={(e) =>
                    setFormData({ ...formData, book: e.target.value })
                  }
                  placeholder="হাদিসের বইয়ের নাম"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Hadith No.</label>
                <input
                  type="number"
                  name="hadithNo"
                  value={formData.hadithNo}
                  onChange={(e) =>
                    setFormData({ ...formData, hadithNo: e.target.value })
                  }
                  placeholder="হাদিস নম্বর"
                  required
                />
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Arabic</label>
            <textarea
              name="arabic"
              placeholder="Write Arabic text..."
              className={styles.arabic}
              onChange={handleChange}
              value={formData.arabic}
              required
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label>Bangla Meaning</label>
            <textarea
              name="bangla"
              placeholder="বাংলা অর্থ লিখুন..."
              onChange={handleChange}
              value={formData.bangla}
              required
            ></textarea>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIlmModal;
