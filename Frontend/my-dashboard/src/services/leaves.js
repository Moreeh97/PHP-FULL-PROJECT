import api from './api';

export async function fetchLeaves(employeeId) {
  const { data } = await api.get('/leaves', { params: { employee_id: employeeId } });
  return data;
}

export async function createLeave({ employee_id, from_date, to_date, reason }) {
  const { data } = await api.post('/leaves', { employee_id, from_date, to_date, reason });
  return data.leave;
}

export async function deleteLeave(id) {
  await api.delete(`/leaves/${id}`);
}

export async function setLeaveStatus(id, status) {
  const { data } = await api.patch(`/leaves/${id}/status`, { status });
  return data;
}
