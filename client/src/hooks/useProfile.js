const useProfile = (userRecords, search, filter, user) => {
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
    } else if (filter === "dua") {
      matchesFilter = item.type === "dua";
    } else {
      matchesFilter = item.type === "quran" || item.type === "hadith";
    }

    return matchesSearch && matchesFilter;
  });

  return { filtered };
};

export default useProfile;
