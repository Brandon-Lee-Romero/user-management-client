import api from "./api";

const resource = "/api/users"

export const allUsers = () => api.get(resource)

export const readUser = () => api.get(resource)

export const createUser = user => api.post(resource, user)

export const updateUser = (id, user) => api.put(`${resource}/${id}`, user)

export const deleteUser = id => api.delete(`${resource}/${id}`)

export const bulkDeleteUsers = ids => api.delete(`${resource}/bulk-destroy`,  { data: { id: ids } })
