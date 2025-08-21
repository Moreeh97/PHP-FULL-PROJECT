// services/leaves.js
import api from './api'

/**
 * Fetch all leaves
 * @returns {Promise<Array>}
 */
export const fetchLeaves = async () => {
  try {
    const response = await api.get('/leaves')
    return response.data
  } catch (err) {
    console.error('Error fetching leaves:', err)
    throw err
  }
}

/**
 * Add a new leave
 * @param {Object} leaveData
 * @returns {Promise<Object>}
 */
export const addLeave = async (leaveData) => {
  try {
    const response = await api.post('/leaves', leaveData)
    return response.data
  } catch (err) {
    console.error('Error adding leave:', err)
    throw err
  }
}

/**
 * Update a leave by ID
 * @param {number|string} id
 * @param {Object} leaveData
 * @returns {Promise<Object>}
 */
export const updateLeave = async (id, leaveData) => {
  try {
    const response = await api.put(`/leaves/${id}`, leaveData)
    return response.data
  } catch (err) {
    console.error('Error updating leave:', err)
    throw err
  }
}

/**
 * Delete a leave by ID
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export const deleteLeave = async (id) => {
  try {
    await api.delete(`/leaves/${id}`)
  } catch (err) {
    console.error('Error deleting leave:', err)
    throw err
  }
}
