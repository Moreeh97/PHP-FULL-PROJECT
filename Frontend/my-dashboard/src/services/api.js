import axios from "axios"

const apiClient = axios.create({
  baseURL: "http://localhost/employee-mgmt/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export default {

  addEmployee(employee) {
    return apiClient.post("/employees/create", employee)
  },

  getEmployees() {
    return apiClient.get("/employees")
  },

  deleteEmployee(id) {
    return apiClient.delete(`/employees/${id}`)
  },

  updateEmployee(id, data) {
    return apiClient.put(`/employees/${id}`, data)
  }
}
