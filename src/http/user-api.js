import api from "./api";

const resource = "/users"

export const allUsers = () => api.get(resource)

export const readUsers = () => api.get(resource)

export const createUsers = user => api.post(resource, user)

export const updateUsers = (id, user) => api.put(`${resource}/${id}`, user)

export const deleteUsers = id => api.delete(`${resource}/${id}`)

export const bulkDeleteUsers = id => api.delete(`${resource}/bulk-destroy`, id)
