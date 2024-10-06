import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { ConfirmationAlert } from '../common/ConfirmationAlert';

const Subjects = ({ subjectService }) => {
    const [subjects, setSubjects] = useState([])

    // Todo combinde delete and finalization functionality (remove duplication)
    const [isShowSubjectDeleteWarning, setShowSubjectDeleteWarning] = useState(false)
    const [subjectSelectedForDeletion, setSubjectSelectedForDeletion] = useState(null)
    const [isSubjectDeleteSuccess, setSubjectDeleteSuccess] = useState(false)
    const [isShowSubjectFinalizationWarning, setShowSubjectFinalizationWarning] = useState(false)
    const [subjectSelectedForFinalization, setSubjectSelectedForFinalization] = useState(null)
    const [isSubjectFinalizationSuccess, setSubjectFinalizationSuccess] = useState(false)
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

    const handleSubjectFinalize = () => {
        subjectService
            .finalize(subjectSelectedForFinalization.id)
            .then(() => {
                getAllSubjects()
                setSubjectFinalizationSuccess(true)
                closeSubjectFinalizationDialog()
                setSubjectSelectedForFinalization(null)
                setTimeout(() => {
                    setSubjectFinalizationSuccess(false)
                    closeSubjectFinalizationDialog()
                }, 3000)
            })
    }
    
    const closeSubjectDeletionDialog = () => {
        setShowSubjectDeleteWarning(false)
        setSubjectSelectedForDeletion(null)
    }

    const closeSubjectFinalizationDialog = () => {
        setShowSubjectFinalizationWarning(false)
        setSubjectSelectedForDeletion(null)
    }

    return (
        <>
            <h1>Review subjects</h1>

            <Link to="/createSubject">
                <button type="button" className="btn btn-primary mt-4">Create subject</button>
            </Link>

            {isSubjectDeleteSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Subject deleted
                </div>
            )}

            {isShowSubjectDeleteWarning && (<>
                <ConfirmationAlert
                    title='Are you sure you want to delete this subject?'
                    subtitle={subjectSelectedForDeletion.name}
                    affirmativeText='Delete'
                    handleAffirmative={handleSubjectDelete}
                    cancelText='Cancel'
                    handleCancel={closeSubjectDeletionDialog}
                />
            </>)}

            {isShowSubjectFinalizationWarning && (<>
                <ConfirmationAlert
                    title='Are you sure you want to finalize this subject? You cannot modify it once you do.'
                    subtitle={subjectSelectedForFinalization.name}
                    affirmativeText='Finalize'
                    handleAffirmative={handleSubjectFinalize}
                    cancelText='Cancel'
                    handleCancel={closeSubjectFinalizationDialog}
                />
            </>)}

            <ul className="list-group mt-4">
                {subjects.map(subject => 
                    <li key={subject.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">{subject.name}</div>
                            <div className="p-2"></div>
                            {subject.status != 'final' &&
                                <div class="btn-group" role="group">
                                    <button className="btn btn-primary btn-sm" type="button"
                                        onClick={() => {
                                            setSubjectSelectedForFinalization(subject)
                                            setShowSubjectFinalizationWarning(true)
                                            window.scrollTo(0, 0)
                                        }}
                                        disabled={isSubjectFinalizationSuccess}
                                    >Finalize</button>

                                    <button className="btn btn-primary btn-sm"
                                        type="button"
                                        as={Link} to={`/modifySubject/${subject.id}`}
                                    >
                                        {/* <Link to={`/modifySubject/${subject.id}`}> */}
                                            Modify
                                        {/* </Link> */}
                                    </button>

                                    <button className="btn btn-primary btn-sm" type="button"
                                        onClick={() => {
                                            setSubjectSelectedForDeletion(subject)
                                            setShowSubjectDeleteWarning(true)
                                            window.scrollTo(0, 0)
                                        }}
                                        disabled={isSubjectDeleteSuccess}
                                    >Delete</button>
                                </div>
                            }
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Subjects
