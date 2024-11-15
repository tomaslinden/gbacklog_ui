import axios from 'axios'

const baseUrl = '/api/reviews'
// Used during development
// Do not commit and restore before rebuilding UI from backlog!
// const baseUrl = 'http://localhost:3001/api/reviews'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = newReview => {
    const request = axios.post(baseUrl, newReview)
    return request.then(response => response.data)
}

const deleteReview = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedReview) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedReview)
    return request.then(response => response.data)
}

const flag = (id) => {
    const body = { flagged: true };
    const request = axios.patch(`${baseUrl}/${id}`, body)
    return request.then(response => response.data)
}

export default { 
    getAll, getById, create, deleteReview, update
}
