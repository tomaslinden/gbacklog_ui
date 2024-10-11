import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { ConfirmationAlert } from '../common/ConfirmationAlert';

const Subjects = ({ subjectService }) => {
    const [subjects, setSubjects] = useState([])

    const [confirmationType, setConfirmationType] = useState(null)
    const [isShowConfirmation, setShowConfirmation] = useState(false)
    const [itemSelectedForConfirmation, setItemSelectedForConfirmation] = useState(null)
    const [isConfirmationSuccess, setConfirmationSuccess] = useState(false)

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

    // Todo add handling for delete/finalize subject error

    const handleSubjectDelete = () => {
        subjectService
            .deleteSubject(itemSelectedForConfirmation.id)
            .then(() => {
                getAllSubjects()
                setConfirmationSuccess(true)
                closeConfirmationDialog()
                setItemSelectedForConfirmation(null)
                setTimeout(() => {
                    setConfirmationSuccess(false)
                    closeConfirmationDialog()
                }, 3000)
            })
    }

    const handleSubjectFinalize = () => {
        subjectService
            .finalize(itemSelectedForConfirmation.id)
            .then(() => {
                getAllSubjects()
                setConfirmationSuccess(true)
                closeConfirmationDialog()
                setItemSelectedForConfirmation(null)
                setTimeout(() => {
                    setConfirmationSuccess(false)
                    closeConfirmationDialog()
                }, 3000)
            })
    }

    const closeConfirmationDialog = () => {
        setShowConfirmation(false)
        setItemSelectedForConfirmation(null)
    }

    const openConfirmationDialog = (type, item) => {
        setConfirmationType(type)
        setItemSelectedForConfirmation(item)
        setShowConfirmation(true)
        window.scrollTo(0, 0)
    }

    return (
        <>
            <h1>Review subjects</h1>

            <Link to="/createSubject">
                <button type="button" className="btn btn-primary mt-4">Create subject</button>
            </Link>

            {isConfirmationSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Subject {confirmationType === 'delete' ? 'deleted' : 'finalized'}
                </div>
            )}

            {isShowConfirmation && confirmationType === 'delete' && (<>
                <ConfirmationAlert
                    title='Are you sure you want to delete this subject?'
                    subtitle={itemSelectedForConfirmation.name}
                    affirmativeText='Delete'
                    handleAffirmative={handleSubjectDelete}
                    cancelText='Cancel'
                    handleCancel={closeConfirmationDialog}
                />
            </>)}

            {isShowConfirmation && confirmationType === 'finalize' && (<>
                <ConfirmationAlert
                    title='Are you sure you want to finalize this subject? You cannot modify it once you do.'
                    subtitle={itemSelectedForConfirmation.name}
                    affirmativeText='Finalize'
                    handleAffirmative={handleSubjectFinalize}
                    cancelText='Cancel'
                    handleCancel={closeConfirmationDialog}
                />
            </>)}

            <ul className="list-group mt-4">
                {subjects.map(subject => 
                    <li key={subject.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">{subject.name}</div>
                            <div className="p-2"></div>
                            {subject.status != 'final' &&
                                <div className="btn-group" role="group">
                                    <button className="btn btn-primary btn-sm" type="button"
                                        onClick={() => {
                                            openConfirmationDialog('finalize', subject)
                                        }}
                                        disabled={isConfirmationSuccess}
                                    >Finalize</button>

                                    <button className="btn btn-primary btn-sm" type="button"
                                        onClick={() => {
                                            openConfirmationDialog('delete', subject)
                                        }}
                                        disabled={isConfirmationSuccess}
                                    >Delete</button>

                                    <Link to={`/modifySubject/${subject.id}`}>
                                        <button className="btn btn-primary btn-sm me-md-2"
                                            style={{position: 'relative', left:"-4px"}}
                                            type="button">
                                            Modify
                                        </button>
                                    </Link>
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
