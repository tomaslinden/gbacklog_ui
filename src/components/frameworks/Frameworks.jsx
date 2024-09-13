import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { ConfirmationAlert } from '../common/ConfirmationAlert';

const Frameworks = ({ frameworkService }) => {
    const [frameworks, setFrameworks] = useState([])
    const [isShowFrameworkDeleteWarning, setShowFrameworkDeleteWarning] = useState(false)
    const [frameworkSelectedForDeletion, setFrameworkSelectedForDeletion] = useState(null)
    const [isFrameworkDeleteSuccess, setFrameworkDeleteSuccess] = useState(false)

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
        console.log('handleFrameworkDelete frameworkService', frameworkService)
        frameworkService
            .deleteFramework(frameworkSelectedForDeletion.id)
            .then(() => {
                getAllFrameworks()
                setFrameworkDeleteSuccess(true)
                closeFrameworkDeletionDialog()
                setFrameworkSelectedForDeletion(null)
                setTimeout(() => {
                    setFrameworkDeleteSuccess(false)
                    closeFrameworkDeletionDialog()
                }, 3000)
            })
    }

    const closeFrameworkDeletionDialog = () => {
        setShowFrameworkDeleteWarning(false)
        setFrameworkSelectedForDeletion(null)
    }
    
    return (
        <>
            <h1>Review frameworks</h1>

            <Link to="/createFramework">
                <button type="button" className="btn btn-primary mt-4">Add framework</button>
            </Link>

            {isFrameworkDeleteSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Framework deleted
                </div>
            )}

            {isShowFrameworkDeleteWarning && (<>
                <ConfirmationAlert
                    title='Are you sure you want to delete this framework?'
                    subtitle={frameworkSelectedForDeletion.name}
                    affirmativeText='Delete'
                    handleAffirmative={handleFrameworkDelete}
                    cancelText='Cancel'
                    handleCancel={closeFrameworkDeletionDialog}
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
                            <div>
                                <Link to={`/modifyFramework/${framework.id}`}>
                                    <button className="btn btn-primary me-md-2"
                                        style={{position: 'relative', left:"-4px"}}
                                        type="button">
                                        Modify
                                    </button>
                                </Link>

                                <button className="btn btn-primary" type="button"
                                    onClick={() => {
                                        setFrameworkSelectedForDeletion(framework)
                                        setShowFrameworkDeleteWarning(true)
                                        window.scrollTo(0, 0)
                                    }}
                                    disabled={isFrameworkDeleteSuccess}
                                >Delete</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Frameworks
