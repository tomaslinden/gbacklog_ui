import axios from 'axios'

const baseUrl = '/api/subjects'
// Used during development
// const baseUrl = 'http://localhost:3001/api/subjects'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newSubject => {
    const request = axios.post(baseUrl, newSubject)
    return request.then(response => response.data)
}

export default { 
    getAll, create
}
