import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./ViewIlm.module.css";
import EditIlmModal from "../../Components/EditIlmModal/EditIlmModal";
import { deleteIlmRecord } from "../../api/ilmApi";
import DeleteConfirmModal from "../../Components/DeleteConfirmModal/DeleteConfirmModal";
import NotFound from "../../Components/NotFound/NotFound";
import { toast } from "react-toastify";

const ViewIlm = ({ records }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id } = useParams();

  const record = records.find((d) => d._id === id);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteRecord } = useMutation({
    mutationFn: (id) => deleteIlmRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["ilm"]);
      navigate("/");
    },
    onError: () => {
      toast.error("❌ ডিলিট ব্যর্থ হয়েছে!");
    },
  });

  if (!record) return <NotFound />;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{record.title}</h2>

        <div className={styles.btnGroup}>
          <button className={styles.editBtn} onClick={() => setShowEdit(true)}>
            ✏️ Edit
          </button>

          <button
            className={styles.deleteBtn}
            onClick={() => setShowDeleteModal(true)}
          >
            🗑️ Delete
          </button>
        </div>
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

      <div className={styles.refRow}>
        <span className={styles.ref}>
          {record.type === "quran"
            ? `Surah ${record.surah} • Ayah ${record.verse}`
            : `${record.book} • Hadith ${record.hadithNo}`}
        </span>

        <span className={styles.ref}>
          {new Date(record.createdAt).toLocaleDateString("bn-BD")}
        </span>
      </div>

      {showEdit && (
        <EditIlmModal onClose={() => setShowEdit(false)} data={record} />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteRecord(record._id);
            toast.info("⌛ ডিলিট করা হচ্ছে...");
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ViewIlm;
