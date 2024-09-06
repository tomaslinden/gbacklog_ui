import axios from 'axios'

const baseUrl = '/api/frameworks'
// Used during development
// Do not commit and restore before rebuilding UI from backlog!
// const baseUrl = 'http://localhost:3001/api/frameworks'

const getAll = () => {
    const request = axios.get(baseUrl)
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

const deleteFramework = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newSubject) => {
    const request = axios.put(`${baseUrl}/${id}`, newSubject)
    return request.then(response => response.data)
}

export default { 
    getAll, getById, create, deleteFramework, update
}
