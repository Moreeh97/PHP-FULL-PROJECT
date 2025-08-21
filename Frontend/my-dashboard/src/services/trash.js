// services/trash.js
import api from './api'

/**
 * Fetch deleted employees
 * @returns {Promise<Array>}
 */
export const fetchTrash = async () => {
  try {
    const response = await api.get('/trash-employees')
    return response.data
  } catch (err) {
    console.error('Error fetching trash employees:', err)
    throw err
  }
}

/**
 * Restore employee from trash
 * @param {Object} employee
 * @returns {Promise<Object>}
 */
export const restoreEmployee = async (employee) => {
  try {
    const response = await api.post('/employees', employee)
    return response.data
  } catch (err) {
    console.error('Error restoring employee:', err)
    throw err
  }
}

/**
 * Delete employee permanently
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export const deletePermanently = async (id) => {
  try {
    await api.delete(`/trash-employees/${id}`)
  } catch (err) {
    console.error('Error deleting permanently:', err)
    throw err
  }
}

/**
 * Empty trash
 * @returns {Promise<void>}
 */
export const emptyTrash = async () => {
  try {
    await api.delete(`/trash-employees`)
  } catch (err) {
    console.error('Error emptying trash:', err)
    throw err
  }
}
