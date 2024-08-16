import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// import subjectService from '../services/subjects'
// Used during development
// import subjectService from '../services/mockSubjects'

const Subjects = ({ subjectService }) => {
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

            <Link to="/createSubject">
                <button type="button" className="btn btn-primary mt-4">Add subject</button>
            </Link>
            
            <ul className="list-group mt-2">
                {subjects.map(subject => 
                    <li key={subject.id} className="list-group-item">{subject.name}</li>
                )}
            </ul>
        </>
    )
}

export default Subjects
