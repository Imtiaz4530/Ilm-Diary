import { useContext, useState } from "react";
import { MdLogout } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import styles from "./Navbar.module.css";
import AddIlmModal from "../addIlmModal/AddIlmModal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// onClick={() => handlePageChange(currentPage - 1)}

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const { token, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = user?.role;

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.brand} onClick={handlePageChange}>
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
              <Link to="/profile" className={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase()}
              </Link>

              {role === "admin" && (
                <>
                  <button
                    className={styles.addBtn}
                    onClick={() => setShowModal(true)}
                  >
                    + Record Ilm
                  </button>

                  <button
                    className={styles.addIconBtn}
                    onClick={() => setShowModal(true)}
                  >
                    <IoMdAdd size={22} />
                  </button>
                </>
              )}

              <button className={styles.logoutBtn} onClick={logout}>
                Logout
              </button>

              <button className={styles.logoutIconBtn} onClick={logout}>
                <MdLogout size={22} />
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
