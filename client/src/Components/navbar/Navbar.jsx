import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import AddIlmModal from "../addIlmModal/AddIlmModal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.brand}>
          Ilm Diary
        </Link>

        <div className={styles.rightSide}>
          {!token ? (
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <>
              <button
                className={styles.addBtn}
                onClick={() => setShowModal(true)}
              >
                + Record Ilm
              </button>

              <button className={styles.logoutBtn} onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      {showModal && <AddIlmModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
