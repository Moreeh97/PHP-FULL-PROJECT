import axios from "axios";

// إعداد Axios مع رابط الباك إند
const api = axios.create({
  baseURL: "http://localhost/PHP-FULL-PROJECT/Backend/api", // عدل حسب مسار PHP
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ دالة عامة للحصول على البيانات
export const getData = (endpoint, params = {}) => {
  return api.get(endpoint, { params });
};

// ✅ دالة عامة لإرسال بيانات (إضافة / تحديث)
export const postData = (endpoint, data) => {
  return api.post(endpoint, data);
};

// ✅ دالة عامة للتحديث
export const putData = (endpoint, data) => {
  return api.put(endpoint, data);
};

// ✅ دالة عامة للحذف
export const deleteData = (endpoint) => {
  return api.delete(endpoint);
};

// ✅ رفع الملفات مع Progress
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



// import axios from "axios"

// const apiClient = axios.create({
//   baseURL: "http://localhost/employee-mgmt/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// export default {

//   //upload file progress
//   uploadFile(file) {
//     const formData = new FormData()
//     formData.append("file", file)

//     return apiClient.post("/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//   },

//   addEmployee(employee) {
//     return apiClient.post("/employees/create", employee)
//   },

//   getEmployees() {
//     return apiClient.get("/employees")
//   },

//   deleteEmployee(id) {
//     return apiClient.delete(`/employees/${id}`)
//   },

//   updateEmployee(id, data) {
//     return apiClient.put(`/employees/${id}`, data)
//   }
// }
