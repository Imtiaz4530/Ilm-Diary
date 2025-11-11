import { useContext } from "react";
import styles from "./Profile.module.css";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Avatar */}
        <div className={styles.avatar}>
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        {/* Name */}
        <h2 className={styles.name}>{user.name}</h2>

        {/* Username */}
        <p className={styles.username}>@{user.username}</p>

        <div className={styles.infoBox}>
          <div className={styles.infoRow}>
            <span>Email:</span>
            <p>{user.email}</p>
          </div>

          {user.createdAt && (
            <div className={styles.infoRow}>
              <span>Joined:</span>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <button className={styles.editBtn}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
