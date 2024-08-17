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
            
            <ul className="list-group mt-4">
                {subjects.map(subject => 
                    <li key={subject.id} className="list-group-item">
                        {/* <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>{subject.name}</div>
                            <div>
                                <button type="button" className="btn btn-primary mt-4">Modify</button>                       
                                <button type="button" className="btn btn-primary mt-4">Delete</button>                       
                            </div>
                        </div> */}
                        <div class="d-flex justify-content-between">
                            <div className="d-flex align-items-center">{subject.name}</div>
                            <div className="p-2"></div>
                            <div>
                                <button className="btn btn-primary me-md-2" style={{position: 'relative', left:"-4px"}} type="button">Modify</button>
                                <button className="btn btn-primary" type="button">Delete</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Subjects
