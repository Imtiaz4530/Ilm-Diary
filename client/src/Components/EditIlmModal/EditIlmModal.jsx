import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./EditIlmModal.module.css";
import { updateIlmRecord } from "../../api/ilmApi";
import { toast } from "react-toastify";

const EditIlmModal = ({ onClose, data }) => {
  const [formData, setFormData] = useState({
    title: data.title,
    arabic: data.arabic,
    bangla: data.bangla,
    surah: data.surah || "",
    verse: data.verse || "",
    book: data.book || "",
    hadithNo: data.hadithNo || "",
    answer: data.answer || "",
    startingVerse: data.startingVerse || "",
    endingVerse: data.endingVerse || "",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => updateIlmRecord({ id, updatedData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["ilm"]);
      onClose();
    },
    onError: () => {
      toast.error("❌ রেকর্ড আপডেট ব্যর্থ হয়েছে!");
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

    mutate({
      id: data._id,
      data: {
        type: data.type,
        title: formData.title,
        arabic: formData.arabic,
        bangla: formData.bangla,
        surah: data.type === "quran" ? formData.surah : null,
        verse:
          data.type === "quran" && data.lineType === "one"
            ? formData.verse
            : null,
        startingVerse:
          data.type === "quran" && data.lineType === "multiple"
            ? formData.startingVerse
            : null,
        endingVerse:
          data.type === "quran" && data.lineType === "multiple"
            ? formData.endingVerse
            : null,
        book: data.type === "hadith" ? formData.book : null,
        hadithNo: data.type === "hadith" ? formData.hadithNo : null,
        answer: data.type === "general" ? formData.answer : null,
      },
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Edit Ilm</h2>

        {/* ✅ Quran Fields */}
        {data.type === "quran" && (
          <>
            <div className={styles.rowFields}>
              <div className={styles.formGroup}>
                <label>Surah No</label>
                <input
                  type="number"
                  name="surah"
                  value={formData.surah}
                  onChange={handleChange}
                  placeholder="সুরাহ নাম্বার"
                />
              </div>
            </div>

            {/* 🔹 If lineType = one → Ayah field */}
            {data.lineType === "one" && (
              <div className={styles.rowFields}>
                <div className={styles.formGroup}>
                  <label>Ayah No</label>
                  <input
                    type="number"
                    name="verse"
                    value={formData.verse}
                    onChange={handleChange}
                    placeholder="আয়াত নাম্বার"
                  />
                </div>
              </div>
            )}

            {/* 🔹 If lineType = multiple → starting & ending verse fields */}
            {data.lineType === "multiple" && (
              <div className={styles.rowFields}>
                <div className={styles.formGroup}>
                  <label>Starting Verse</label>
                  <input
                    type="number"
                    name="startingVerse"
                    value={formData.startingVerse}
                    onChange={handleChange}
                    placeholder="শুরুর আয়াত"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Ending Verse</label>
                  <input
                    type="number"
                    name="endingVerse"
                    value={formData.endingVerse}
                    onChange={handleChange}
                    placeholder="Ending verse"
                  />
                </div>
              </div>
            )}
          </>
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
                placeholder="হাদিসের বইয়ের নাম"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Hadith No</label>
              <input
                type="number"
                name="hadithNo"
                value={formData.hadithNo}
                onChange={handleChange}
                placeholder="হাদিস নম্বর"
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
            placeholder="হাদিস/কুরআনের/সাধারণ বিষয়"
          />
        </div>

        {data.type !== "general" && (
          <>
            {/* ✅ Arabic */}
            <div className={styles.formGroup}>
              <label>Arabic</label>
              <textarea
                name="arabic"
                className={styles.arabic}
                value={formData.arabic}
                onChange={handleChange}
                placeholder="আরবীতে লিখুন..."
              ></textarea>
            </div>

            {/* ✅ Bangla */}
            <div className={styles.formGroup}>
              <label>Bangla</label>
              <textarea
                name="bangla"
                value={formData.bangla}
                onChange={handleChange}
                placeholder="বাংলা অর্থ লিখুন..."
              ></textarea>
            </div>
          </>
        )}

        {data.type === "general" && (
          <div className={styles.formGroup}>
            <label>Answer</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="উত্তর লিখুন ..."
            ></textarea>
          </div>
        )}

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
