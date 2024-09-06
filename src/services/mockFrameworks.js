const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "name": "My mock test framework",
                "description": "A mock framework description",
                "facets": [
                    {
                        "name": "My test facet",
                        "handle": "my-test-facet",
                        "description": "A facet description",
                        "_id": "66daf1650b6d034449eb18d3"
                    }
                ],
                "id": "66daf1650b6d034449eb18d2"
            }
        ])
    });
}

const getById = id => {
    return new Promise((resolve, reject) => {
        resolve({
            "name": "My mock test framework",
            "description": "A mock framework description",
            "facets": [
                {
                    "name": "My test facet",
                    "handle": "my-test-facet",
                    "description": "A facet description",
                    "_id": "66daf1650b6d034449eb18d3"
                }
            ],
            "id": "66daf1650b6d034449eb18d2"
        })
    });
}

const create = (newFramework) => {
    return new Promise((resolve, reject) => {
        resolve({newFramework})
    });
}

const deleteFramework = id => {
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
    getAll, getById, create, deleteFramework, update
}
