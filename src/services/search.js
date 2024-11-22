import axios from 'axios'

const baseUrl = '/api/search'
// Used during development
// Do not commit and restore before rebuilding UI from backlog!
// const baseUrl = 'http://localhost:3001/api/search'

const searchWithTerm = (searchTerm) => {
    const request = axios.get(`${baseUrl}?searchTerm=${searchTerm}`)
    return request.then(response => response.data)
}

export default { 
    searchWithTerm
}
