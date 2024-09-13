const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "name": "Free-form",
                "description": "A framework allowing free-form reviews to be made",
                "facets": [
                    {
                        "name": "Free form notes",
                        "handle": "free-form-notes",
                        "description": "Free form notes of the review subject",
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
            "name": "Free-form",
            "description": "A framework allowing free-form reviews to be made",
            "facets": [
                {
                    "name": "Free form notes",
                    "handle": "free-form-notes",
                    "description": "Free form notes of the review subject",
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
