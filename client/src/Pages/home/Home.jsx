import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.css";
import Loading from "../../Components/loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";
import useLimitText from "../../hooks/useLimitText";
import NoRecords from "../../Components/NoRecords/NoRecords";
import Info from "../../Components/Info/Info";
import useProfile from "../../hooks/useProfile";

const Home = ({ records, loading }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const { filtered: filteredRecords } = useProfile(
    records,
    search,
    filter,
    user
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentRecords = filteredRecords?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredRecords?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { limitText } = useLimitText();

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ilm Records</h2>

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
          currentRecords?.map((item) => (
            <div
              className={styles.card}
              key={item._id}
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

              {(item.type === "quran" ||
                item.type === "hadith" ||
                item.type === "dua") && (
                <>
                  <p className={styles.arabic}>{limitText(item.arabic, 120)}</p>
                  <p className={styles.bangla}>{limitText(item.bangla, 180)}</p>
                </>
              )}

              {item.type === "general" && (
                <p className={styles.bangla}>{limitText(item.answer, 200)}</p>
              )}

              <div className={styles.refRow}>
                <Info item={item} />

                <span className={styles.ref}>
                  Created By{" "}
                  <span className={styles.creator}>{item.creator}</span> •{" "}
                  {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
