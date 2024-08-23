const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([{"id": "1", "name": "My test subject"}])
    });
}

const getById = id => {
    return new Promise((resolve, reject) => {
        resolve({"id": "1", "name": "My test subject"})
    });
}

const create = (newSubject) => {
    return new Promise((resolve, reject) => {
        resolve({newSubject})
    });
}

const deleteSubject = id => {
    return new Promise((resolve, reject) => {
        resolve()
    });
}

const update = id => {
    return new Promise((resolve, reject) => {
        resolve()
    });
}

export default { 
    getAll, getById, create, deleteSubject, update
}
