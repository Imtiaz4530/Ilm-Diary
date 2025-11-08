import API from "./axios";

// 🟢 Fetch all ilm records
export const fetchIlmRecords = async () => {
  const res = await API.get("/ilm/");
  return res.data;
};

// 🟢 Create new ilm records
export const createIlmRecord = async (storyData) => {
  const res = await API.post("/ilm/create", storyData);
  return res.data;
};

// 🟢 Edit ilm records
export const updateIlmRecord = async ({ id, updatedData }) => {
  const res = await API.post(`/ilm/edit/${id}`, updatedData);
  return res.data;
};

// 🟢 Delete ilm records
export const deleteIlmRecord = async (id) => {
  const res = await API.delete(`/ilm/delete/${id}`);
  return res.data;
};

// 🟢 Signup
export const signup = async (data) => {
  const res = await API.post(`/user/signup`, data);
  return res.data;
};

// 🟢 Login
export const login = async (data) => {
  const res = await API.post(`/user/login`, data);
  return res.data;
};
