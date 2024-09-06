const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([{"id": "1", "name": "My test framework"}])
    });
}

const getById = id => {
    return new Promise((resolve, reject) => {
        resolve({"id": "1", "name": "My test framework"})
    });
}

const create = (newFramework) => {
    return new Promise((resolve, reject) => {
        resolve({newFramework})
    });
}

const deleteFrameworks = id => {
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
    getAll, getById, create, deleteFrameworks, update
}
