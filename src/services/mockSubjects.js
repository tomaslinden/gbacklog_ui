const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([{"id": "1", "name": "My test subject"}])
    });
}

export default { 
    getAll 
}
