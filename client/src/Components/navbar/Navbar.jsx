import { useState } from "react";
import styles from "./Navbar.module.css";
import AddIlmModal from "../addIlmModal/AddIlmModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

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
      {showModal && <AddIlmModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
