import { useState, useEffect } from 'react'

import subjectService from '../services/subjects'
// Used during development
// import subjectService from '../services/mockSubjects'

const Subjects = () => {
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
      subjectService
        .getAll()
        .then(subjects => {
          setSubjects(subjects)
        })
    }, []) 

    return (
        <>
            <h1>Review subjects</h1>
            <button type="button" class="btn btn-primary mt-4">Add subject</button>
            <ul class="list-group mt-2">
                {subjects.map(subject => 
                <li class="list-group-item">{subject?.name}</li>
                )}
            </ul>
        </>
    )
}

export default Subjects;
