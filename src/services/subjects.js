import axios from 'axios'

const baseUrl = '/api/subjects'
// Used during development
// Do not commit and restore before rebuilding UI from backlog!
// const baseUrl = 'http://localhost:3001/api/subjects'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getAllFinal = () => {
    const request = axios.get(baseUrl + '?status=final')
    return request.then(response => response.data)
}

const getById = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = newSubject => {
    const request = axios.post(baseUrl, newSubject)
    return request.then(response => response.data)
}

const deleteSubject = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedSubject) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedSubject)
    return request.then(response => response.data)
}

const finalize = (id) => {
    const body = { status: 'final' };
    const request = axios.patch(`${baseUrl}/${id}`, body)
    return request.then(response => response.data)
}

const flag = (id) => {
    const body = { flagged: true };
    const request = axios.patch(`${baseUrl}/${id}`, body)
    return request.then(response => response.data)
}

export default { 
    getAll, getAllFinal, getById, create, deleteSubject, update, finalize
}
