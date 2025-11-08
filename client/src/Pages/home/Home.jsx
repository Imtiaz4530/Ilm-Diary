import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.css";
import Loading from "../../Components/loading/Loading";

const Home = ({ records, loading }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const filteredRecords = records?.filter((item) => {
    const matchesSearch = item?.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter ? item?.type === filter : true;
    return matchesSearch && matchesFilter;
  });

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

  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + " ...";
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.heading}>📗 Quran /📘 Hadith</h2> */}
      <h2 className={styles.heading}>Ilm Records</h2>

      <input
        type="text"
        className={styles.search}
        placeholder="শিরোনাম দিয়ে খুঁজুন..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value=""
            checked={filter === ""}
            onChange={() => setFilter("")}
          />
          <span></span> সব
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value="quran"
            checked={filter === "quran"}
            onChange={() => setFilter("quran")}
          />
          <span></span> কুরআন
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="filter"
            value="hadith"
            checked={filter === "hadith"}
            onChange={() => setFilter("hadith")}
          />
          <span></span> হাদিস
        </label>
      </div>

      <div className={styles.list}>
        {currentRecords.length === 0 ? (
          <div className={styles.noData}>
            <p className={styles.noIcon}>📭</p>
            <p className={styles.noText}>কোনো তথ্য পাওয়া যায়নি</p>
            <p className={styles.noSub}>নতুন একটি রেকর্ড যোগ করুন...</p>
          </div>
        ) : (
          currentRecords?.map((item) => (
            <div
              className={styles.card}
              key={item._id}
              onClick={() => navigate(`/view/${item._id}`)}
            >
              <div className={styles.type}>
                {item.type === "quran" ? "📗 Quran" : "📘 Hadith"}
              </div>

              <h3 className={styles.title}>{item.title}</h3>

              <p className={styles.arabic}>{limitText(item.arabic, 120)}</p>
              <p className={styles.bangla}>{limitText(item.bangla, 180)}</p>

              <div className={styles.refRow}>
                <span className={styles.ref}>
                  {item.type === "quran"
                    ? `Surah ${item.surah} • Ayah ${item.verse}`
                    : `${item.book} • Hadith ${item.hadithNo}`}
                </span>

                <span className={styles.ref}>
                  {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? styles.activePage : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
