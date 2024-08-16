const baseUrl = '/api/subjects'

const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([{"name": "My test subject"}])
    });
}

export default { 
    getAll 
}
