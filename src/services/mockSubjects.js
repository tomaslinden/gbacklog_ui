const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([{"id": "1", "name": "My test subject"}])
    });
}

const create = (newSubject) => {
    return new Promise((resolve, reject) => {
        resolve({newSubject})
    });
}

export default { 
    getAll, create
}
