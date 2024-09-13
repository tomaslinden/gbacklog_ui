const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([{"id": "1", "name": "My test review"}])
    });
}

const getById = id => {
    return new Promise((resolve, reject) => {
        resolve({"id": "1", "name": "My test review"})
    });
}

const create = (newReview) => {
    return new Promise((resolve, reject) => {
        resolve({newReview})
    });
}

const deleteReview = id => {
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
    getAll, getById, create, deleteReview, update
}
