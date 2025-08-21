import api, { uploadWithProgress } from './api';

// جلب الموظفين
export async function fetchEmployees() {
  const { data } = await api.get('/employees');
  return data;
}

// ملخّص الرواتب
export async function fetchSummary() {
  const { data } = await api.get('/summary');
  return data; // { count, total_base, total_bonus, total_deductions, total_net }
}

// إنشاء موظف (JSON فقط)
export async function createEmployee(payload) {
  const { data } = await api.post('/employees', payload);
  return data.employee;
}

// إنشاء موظف مع عقد (FormData)
export async function createEmployeeWithContract(fields, file, onProgress) {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => form.append(k, v ?? ''));
  if (file) form.append('contract', file);
  // يستخدم helper فيه onUploadProgress
  const res = await uploadWithProgress('/employees', form, onProgress);
  return res.employee;
}

// تحديث موظف (JSON)
export async function updateEmployee(id, payload) {
  const { data } = await api.put(`/employees/${id}`, payload);
  return data.employee;
}

// تحديث موظف مع عقد
export async function updateEmployeeWithContract(id, fields, file, onProgress) {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => form.append(k, v ?? ''));
  if (file) form.append('contract', file);
  const { data } = await api.put(`/employees/${id}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    },
  });
  return data.employee;
}

// حذف مؤقت
export async function softDeleteEmployee(id) {
  await api.delete(`/employees/${id}`);
}

// استعادة
export async function restoreEmployee(id) {
  await api.patch(`/employees/${id}/restore`);
}

// حذف دائم
export async function forceDeleteEmployee(id) {
  await api.delete(`/employees/${id}/force`);
}

// سلة المحذوفات
export async function fetchTrash() {
  const { data } = await api.get('/trash');
  return data;
}
