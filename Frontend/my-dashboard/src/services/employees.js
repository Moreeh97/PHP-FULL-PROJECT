import axios from "axios";

const api = axios.create({
  baseURL: "http://php-full-project.local",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all employees
export async function getEmployeesApi() {
  try {
    const res = await api.get('/employees');
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Add employee
export async function addEmployeeApi(employeeFormData) {
  try {
    const res = await api.post('/employees', employeeFormData);
    return res.data;
  } catch (err) {
    console.error(err); 
    return null;
  }
}

// Search employees
export async function searchEmployeeApi(name) {
  try {
    const res = await api.get(`/employees?name=${encodeURIComponent(name)}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Update employees
export async function updateEmployeeApi(id, employeeFormData) {
  try {
    const res = await api.post(`/employees/${id}`, employeeFormData);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Delete employees
export async function deleteEmployeeApi(id) {
  try {
    const res = await api.delete(`/employees/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Upload contract
export async function uploadContractApi(formData, onProgress) {
  try {
    const res = await uploadWithProgress("/upload_contract.php", formData, onProgress);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  return res.data;
}
