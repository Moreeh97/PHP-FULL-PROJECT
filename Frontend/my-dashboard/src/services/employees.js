import { getData, postData, putData, deleteData, uploadWithProgress } from "./api";

//get all employees
export const fetchEmployees = async () => {
  const res = await getData("/employees.php");
  return res.data; 
};

//add employee
export const addEmployeeApi = async (employeeFormData) => {
  const res = await postData("/employees.php", employeeFormData);
  return res.data;
};

//search employees
export const searchEmployeeApi = async (name) => {
  const res = await getData(`/employees.php?name=${encodeURIComponent(name)}`);
  return res.data;
};

//update employees
export const updateEmployeeApi = async (id, employeeFormData) => {
  const res = await putData(`/employees.php?id=${id}`, employeeFormData);
  return res.data;
};

//delete employees
export const deleteEmployeeApi = async (id) => {
  const res = await deleteData(`/employees.php?id=${id}`);
  return res.data;
};

//upload contract
export const uploadContractApi = async (formData, onProgress) => {
  const res = await uploadWithProgress("/upload_contract.php", formData, onProgress);
  return res.data;
};
