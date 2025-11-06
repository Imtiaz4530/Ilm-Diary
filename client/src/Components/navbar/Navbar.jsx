import { useState } from "react";
import styles from "./Navbar.module.css";
import AddIlmModal from "../addIlmModal/AddIlmModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddIlm = (data) => {
    console.log("Saved Ilm:", data);
    // TODO: send to backend later
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.brand}>
          Ilm Diary
        </Link>

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
