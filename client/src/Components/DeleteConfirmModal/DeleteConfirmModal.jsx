import styles from "./DeleteConfirmModal.module.css";

const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Delete Record?</h3>
        <p className={styles.text}>
          আপনি কি নিশ্চিত যে আপনি এই রেকর্ডটি মুছতে চান?
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>

          <button className={styles.delete} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
