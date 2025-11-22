import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./Profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../Components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { recordsForUser } from "../../api/ilmApi";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";
import useLimitText from "../../hooks/useLimitText";
import useProfile from "../../hooks/useProfile";
import NoRecords from "../../Components/NoRecords/NoRecords";
import Info from "../../Components/Info/Info";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const { data, isLoading } = useQuery({
    queryKey: ["user-records"],
    queryFn: recordsForUser,
  });

  const userRecords = data || [];

  const { filtered } = useProfile(userRecords, search, filter, user);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentRecords = filtered?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filtered?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { limitText } = useLimitText();

  if (isLoading) return <Loading />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        <h2 className={styles.name}>{user.name}</h2>
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
      </div>

      {/* Records Section */}
      <div className={styles.recordsSection}>
        <Filter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          user={user}
        />

        <div className={styles.list}>
          {currentRecords.length === 0 ? (
            <NoRecords />
          ) : (
            currentRecords.map((item) => (
              <div
                key={item._id}
                className={styles.card}
                onClick={() => navigate(`/view/${item._id}`)}
              >
                <div className={styles.type}>
                  {item.type === "quran"
                    ? "📗 Quran"
                    : item.type === "hadith"
                    ? "📘 Hadith"
                    : "📝 General"}
                </div>

                <h3 className={styles.title}>{item.title}</h3>

                {(item.type === "quran" || item.type === "hadith") && (
                  <>
                    <p className={styles.arabic}>
                      {limitText(item.arabic, 120)}
                    </p>
                    <p className={styles.bangla}>
                      {limitText(item.bangla, 180)}
                    </p>
                  </>
                )}

                {item.type === "general" && (
                  <p className={styles.bangla}>{limitText(item.answer, 300)}</p>
                )}

                <div className={styles.refRow}>
                  <Info item={item} />

                  <span className={styles.ref}>
                    {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Profile;
