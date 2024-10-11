import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { ConfirmationAlert } from '../common/ConfirmationAlert';

const Frameworks = ({ frameworkService }) => {
    const [frameworks, setFrameworks] = useState([])
    const [isShowFrameworkDeleteWarning, setShowFrameworkDeleteWarning] = useState(false)
    const [frameworkSelectedForDeletion, setFrameworkSelectedForDeletion] = useState(null)
    const [isFrameworkDeleteSuccess, setFrameworkDeleteSuccess] = useState(false)

    const [confirmationType, setConfirmationType] = useState(null)
    const [isShowConfirmation, setShowConfirmation] = useState(false)
    const [itemSelectedForConfirmation, setItemSelectedForConfirmation] = useState(null)
    const [isConfirmationSuccess, setConfirmationSuccess] = useState(false)
    
    useEffect(() => {
        getAllFrameworks()
    }, []) 

    const getAllFrameworks = () => {
        frameworkService
            .getAll()
            .then(frameworks => {
                setFrameworks(frameworks)
            })
    }

    const handleFrameworkDelete = () => {
        frameworkService
            .deleteFramework(itemSelectedForConfirmation.id)
            .then(() => {
                getAllFrameworks()
                setConfirmationSuccess(true)
                closeConfirmationDialog()
                setItemSelectedForConfirmation(null)
                setTimeout(() => {
                    setConfirmationSuccess(false)
                    closeConfirmationDialog()
                }, 3000)
            })
    }
    
    const handleFrameworkFinalize = () => {
        frameworkService
            .finalize(itemSelectedForConfirmation.id)
            .then(() => {
                getAllFrameworks()
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
            <h1>Review frameworks</h1>

            <Link to="/createFramework">
                <button type="button" className="btn btn-primary mt-4">Create framework</button>
            </Link>

            {isConfirmationSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Framework {confirmationType === 'delete' ? 'deleted' : 'finalized'}
                </div>
            )}

            {isShowConfirmation && confirmationType === 'delete' && (<>
                <ConfirmationAlert
                    title='Are you sure you want to delete this framework?'
                    subtitle={itemSelectedForConfirmation.name}
                    affirmativeText='Delete'
                    handleAffirmative={handleFrameworkDelete}
                    cancelText='Cancel'
                    handleCancel={closeConfirmationDialog}
                />
            </>)}

            {isShowConfirmation && confirmationType === 'finalize' && (<>
                <ConfirmationAlert
                    title='Are you sure you want to finalize this framework? You cannot modify it once you do.'
                    subtitle={itemSelectedForConfirmation.name}
                    affirmativeText='Finalize'
                    handleAffirmative={handleFrameworkFinalize}
                    cancelText='Cancel'
                    handleCancel={closeConfirmationDialog}
                />
            </>)}

            <ul className="list-group mt-4">
                {frameworks.map(framework => 
                    <li key={framework.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <Link to={`/framework/${framework.id}`}>
                                    {framework.name}
                                </Link>
                            </div>
                            <div className="p-2"></div>
                            {framework.status != 'final' &&
                                <div className="btn-group" role="group">
                                    <button className="btn btn-primary btn-sm" type="button"
                                        onClick={() => {
                                            openConfirmationDialog('finalize', framework)
                                        }}
                                        disabled={isConfirmationSuccess}
                                    >Finalize</button>

                                    <button className="btn btn-primary btn-sm" type="button"
                                        onClick={() => {
                                            openConfirmationDialog('delete', framework)
                                        }}
                                        disabled={isConfirmationSuccess}
                                    >Delete</button>

                                    <Link to={`/modifyFramework/${framework.id}`}>
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

export default Frameworks
