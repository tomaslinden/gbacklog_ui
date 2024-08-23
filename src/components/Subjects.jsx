import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Subjects = ({ subjectService }) => {
    const [subjects, setSubjects] = useState([])
    const [isShowSubjectDeleteWarning, setShowSubjectDeleteWarning] = useState(false)
    const [subjectSelectedForDeletion, setSubjectSelectedForDeletion] = useState(null)
    const [isSubjectDeleteSuccess, setSubjectDeleteSuccess] = useState(false)
    // Todo add handling for delete subject error

    useEffect(() => {
        getAllSubjects()
    }, []) 

    const getAllSubjects = () => {
        subjectService
            .getAll()
            .then(subjects => {
            setSubjects(subjects)
            })
    }

    const handleSubjectDelete = () => {
        subjectService
            .deleteSubject(subjectSelectedForDeletion.id)
            .then(() => {
                getAllSubjects()
                setSubjectDeleteSuccess(true)
                closeSubjectDeletionDialog()
                setSubjectSelectedForDeletion(null)
                setTimeout(() => {
                    setSubjectDeleteSuccess(false)
                    closeSubjectDeletionDialog()
                }, 3000)
            })
    }

    const closeSubjectDeletionDialog = () => {
        setShowSubjectDeleteWarning(false)
        setSubjectSelectedForDeletion(null)
    }

    return (
        <>
            <h1>Review subjects</h1>

            <Link to="/createSubject">
                <button type="button" className="btn btn-primary mt-4">Add subject</button>
            </Link>

            {isSubjectDeleteSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Subject deleted
                </div>
            )}

            {isShowSubjectDeleteWarning && (
                <div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                    <strong>Are you sure you want to delete this subject?</strong>
                    <div>{subjectSelectedForDeletion.name}</div>
                    <button type="button" className="btn btn-danger mt-2 ms-2" onClick={handleSubjectDelete}>Yes</button>
                    <button type="button" className="btn btn-primary mt-2 ms-2" onClick={closeSubjectDeletionDialog}>No</button>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeSubjectDeletionDialog}></button>
                </div>
            )}

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
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">{subject.name}</div>
                            <div className="p-2"></div>
                            <div>
                                <Link to={`/modifySubject/${subject.id}`}>
                                    <button className="btn btn-primary me-md-2"
                                        style={{position: 'relative', left:"-4px"}}
                                        type="button">
                                        Modify
                                    </button>
                                </Link>

                                <button className="btn btn-primary" type="button"
                                    onClick={() => {
                                        setSubjectSelectedForDeletion(subject)
                                        setShowSubjectDeleteWarning(true)
                                    }}
                                    disabled={isSubjectDeleteSuccess}
                                >Delete</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Subjects
