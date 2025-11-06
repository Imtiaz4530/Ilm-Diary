import API from "./axios";

// 🟢 Fetch all ilm records
export const fetchIlmRecords = async () => {
  const res = await API.get("/ilm/");
  return res.data;
};

// // 🟢 Fetch a single story by ID
// export const fetchStoryById = async (id) => {
//   const res = await API.get(`/stories/${id}`);
//   return res.data;
// };

// 🟢 Create new ilm records
export const createIlmRecord = async (storyData) => {
  const res = await API.post("/ilm/create", storyData);
  return res.data;
};

// 🟢 Edit ilm records
// export const addStoryPart = async (storyData) => {
//   const res = await API.post("/story/add", storyData);
//   return res.data;
// };
