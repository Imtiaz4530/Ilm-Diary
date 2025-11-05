import { useState } from "react";
import styles from "./Navbar.module.css";
import AddIlmModal from "../addIlmModal/AddIlmModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddIlm = (data) => {
    console.log("Saved Ilm:", data);
    // TODO: send to backend later
  };

  return (
    <>
        <nav className={styles.navbar}>
            <div className={styles.brand}>Ilm Diary</div>
            <button className={styles.addBtn} onClick={() => setShowModal(true)}>
                + Record Ilm
            </button>
        </nav>
        {showModal && (
            <AddIlmModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddIlm}
            />
        )}
    </>
  );
};

export default Navbar;
