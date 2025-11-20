import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./Profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../Components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { recordsForUser } from "../../api/ilmApi";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["user-records"],
    queryFn: recordsForUser,
  });

  const userRecords = data || [];

  // const filtered = userRecords.filter((item) => {
  //   const matchesSearch = item.title
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   const matchesFilter =
  //     filter === "bookmark"
  //       ? user?.bookmarks?.includes(item._id)
  //       : filter
  //       ? item.type === filter
  //       : true;
  //   return matchesSearch && matchesFilter;
  // });

  const filtered = userRecords?.filter((item) => {
    const matchesSearch = item?.title
      ?.toLowerCase()
      ?.includes(search.toLowerCase());

    let matchesFilter = true;

    if (filter === "quran") {
      matchesFilter = item.type === "quran";
    } else if (filter === "hadith") {
      matchesFilter = item.type === "hadith";
    } else if (filter === "bookmark") {
      matchesFilter = user?.bookmarks?.includes(item._id);
    } else if (filter === "general") {
      matchesFilter = item.type === "general";
    } else {
      matchesFilter = item.type === "quran" || item.type === "hadith";
    }

    return matchesSearch && matchesFilter;
  });

  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + " ...";
  };

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
        <input
          type="text"
          className={styles.search}
          placeholder="Search your posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="filter"
              checked={filter === ""}
              onChange={() => setFilter("")}
            />
            <span></span> All
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="filter"
              value="quran"
              checked={filter === "quran"}
              onChange={() => setFilter("quran")}
            />
            <span></span> Quran
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="filter"
              value="hadith"
              checked={filter === "hadith"}
              onChange={() => setFilter("hadith")}
            />
            <span></span> Hadith
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="filter"
              value="general"
              checked={filter === "general"}
              onChange={() => setFilter("general")}
            />
            <span></span> সাধারণ
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="filter"
              value="bookmark"
              checked={filter === "bookmark"}
              onChange={() => setFilter("bookmark")}
            />
            <span></span> Favorite
          </label>
        </div>

        <div className={styles.list}>
          {filtered.length === 0 ? (
            <div className={styles.noData}>
              <p className={styles.noIcon}>📭</p>
              <p className={styles.noText}>কোনো তথ্য পাওয়া যায়নি</p>
            </div>
          ) : (
            filtered.map((item) => (
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
                  <span className={styles.ref}>
                    {item.type === "quran" ? (
                      <>
                        <span className={styles.hiddenTitle}>সূরা</span>{" "}
                        {item.surah} •{" "}
                        <span className={styles.hiddenTitle}>আয়াত</span>{" "}
                        {item.lineType === "multiple"
                          ? `${item.startingVerse}-${item.endingVerse}`
                          : item.verse}
                      </>
                    ) : (
                      <>
                        {item.book} • হাদিস {item.hadithNo}
                      </>
                    )}
                  </span>

                  <span className={styles.ref}>
                    {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
