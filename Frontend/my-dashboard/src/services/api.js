import axios from "axios";

const api = axios.create({
  baseURL: "http://php-full-project.local",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic requests
export const getData = (endpoint, params = {}) => api.get(endpoint, { params });
export const postData = (endpoint, data) => api.post(endpoint, data);
export const putData = (endpoint, data) => api.put(endpoint, data);
export const deleteData = (endpoint) => api.delete(endpoint);

// Employee-specific helpers
export const getEmployees = () => api.get("/employees");
export const addEmployee = (employee) => api.post("/employees/create", employee);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// File upload with progress
export const uploadWithProgress = (endpoint, data, onProgress) => {
  return api.post(endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      if (onProgress) {
        let percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });
};

export default api;