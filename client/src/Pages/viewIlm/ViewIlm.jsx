import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import styles from "./ViewIlm.module.css";
import EditIlmModal from "../../Components/EditIlmModal/EditIlmModal";
import {
  bookmarkIlmRecords,
  deleteIlmRecord,
  fetchSingleIlmRecords,
} from "../../api/ilmApi";
import DeleteConfirmModal from "../../Components/DeleteConfirmModal/DeleteConfirmModal";
import NotFound from "../../Components/NotFound/NotFound";
import Loading from "../../Components/loading/Loading";
import { AuthContext } from "../../context/AuthContext";

const ViewIlm = ({ records, loading }) => {
  const [saved, setSaved] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { user, updateUser } = useContext(AuthContext);

  const disabledButton = !user || user?.role === "user";

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: singleRecord, isLoading: singleLoading } = useQuery({
    queryKey: ["single-ilm", id],
    queryFn: () => fetchSingleIlmRecords(id),
    enabled: !records,
  });
  const record = records?.find((d) => d._id === id) || singleRecord;

  useEffect(() => {
    if (user?.bookmarks?.includes(record?._id)) {
      setSaved(true);
    }
  }, [user, record]);

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

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: bookmarkIlmRecords,

    onSuccess: (data) => {
      setSaved(data.bookmarked);

      if (data.user) {
        updateUser(data.user);
      }
      queryClient.invalidateQueries(["ilm-records"]);
      queryClient.invalidateQueries(["single-ilm"]);
    },
  });

  if (loading || singleLoading) return <Loading />;

  if (!record) return <NotFound />;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{record?.title}</h2>

        <div className={styles.btnGroup}>
          {user && record.type !== "general" && (
            <button
              className={styles.bookmarkBtn}
              onClick={() => toggleBookmark(record._id)}
            >
              {saved ? <FaHeart /> : <FaRegHeart />}
            </button>
          )}

          <>
            <button
              className={styles.editBtn}
              disabled={disabledButton}
              onClick={() => setShowEdit(true)}
            >
              ✏️ Edit
            </button>

            <button
              className={styles.deleteBtn}
              disabled={disabledButton}
              onClick={() => setShowDeleteModal(true)}
            >
              🗑️ Delete
            </button>

            {/* Icon Buttons (Mobile Only) */}
            <div className={styles.iconBtnGroup}>
              <button
                className={styles.editIconBtn}
                disabled={disabledButton}
                onClick={() => setShowEdit(true)}
              >
                ✏️
              </button>

              <button
                className={styles.deleteIconBtn}
                disabled={disabledButton}
                onClick={() => setShowDeleteModal(true)}
              >
                🗑️
              </button>
            </div>
          </>
        </div>
      </div>

      <p className={styles.type}>
        {record.type === "quran"
          ? "📗 Quran"
          : record.type === "hadith"
          ? "📘 Hadith"
          : "📝 General"}
      </p>

      {record.type !== "general" && (
        <>
          <div className={styles.box}>
            <p className={styles.arabic}>{record?.arabic}</p>
          </div>

          <div className={styles.box}>
            <p className={styles.bangla}>{record?.bangla}</p>
          </div>
        </>
      )}

      {record.type === "general" && (
        <div className={styles.box}>
          <p className={styles.answer}>{record?.answer}</p>
        </div>
      )}

      <div className={styles.refRow}>
        {record.type !== "general" && (
          <span className={styles.ref}>
            {record.type === "quran" && (
              <>
                <span className={styles.hiddenTitle}>সূরা</span> {record.surah}{" "}
                • <span className={styles.hiddenTitle}>আয়াত</span>{" "}
                {record.lineType === "multiple"
                  ? `${record.startingVerse}-${record.endingVerse}`
                  : record.verse}
              </>
            )}

            {record.type === "hadith" && (
              <>
                {record.book} • হাদিস {record.hadithNo}
              </>
            )}
          </span>
        )}
        <span className={styles.ref}>
          Created By <span className={styles.creator}>{record.creator}</span> •{" "}
          {new Date(record?.createdAt).toLocaleDateString("bn-BD")}
        </span>
      </div>

      {showEdit && (
        <EditIlmModal onClose={() => setShowEdit(false)} data={record} />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteRecord(record?._id);
            toast.info("⌛ ডিলিট করা হচ্ছে...");
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ViewIlm;
