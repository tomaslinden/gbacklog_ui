import { useState } from 'react'
import { Link } from "react-router-dom";
import { ConfirmationAlert } from '../common/ConfirmationAlert';
import FrameworkDetails from './FrameworkDetails';

const FrameworkPreview = ({ 
    frameworkService,
    mode,
    frameworkId,
    frameworkName,
    frameworkDescription,
    facets,
    setIsPreview
}) => {
    const [isFrameworkCreateSuccess, setFrameworkCreateSuccess] = useState(false)
    const [createdFramework, setCreatedFramework] = useState(false)
    const [isShowFrameworkCreateWarning, setShowFrameworkCreateWarning] = useState(false)

    const closeSubjectCreateDialog = () => {
        setShowFrameworkCreateWarning(false)
    }
    
    const getFrameworkObjectToUpsert = () => {
        return {
            name: frameworkName,
            description: frameworkDescription,
            facets
        }
    }

    const handleFrameworkUpsertSuccess = (result) => {
        setCreatedFramework(result)
        closeSubjectCreateDialog()
        setFrameworkCreateSuccess(true)
    }

    return (
        <>
            {isFrameworkCreateSuccess && (<>
                <div className="alert alert-success mt-5" role="alert">
                    Framework saved
                </div>
                <Link to={`/framework/${createdFramework.id}`}>
                    <button className='btn btn-primary me-2'>
                        View {mode === 'created' ? 'created' : 'modified'} framework
                    </button>
                </Link>
                <Link to={`/frameworks`}>
                    <button className='btn btn-primary'>
                        Back to frameworks
                    </button>
                </Link>
            </>)}

            {isShowFrameworkCreateWarning && (
                <div className='mt-5'>
                <ConfirmationAlert
                    title='Are you sure you want to save this framework?'
                    affirmativeText='Save'
                    handleAffirmative={() => {
                        if (mode === 'create') {
                            frameworkService.create(
                                getFrameworkObjectToUpsert()
                            ).then(handleFrameworkUpsertSuccess)
                        } else if (mode === 'modify') {
                            frameworkService.update(
                                frameworkId, 
                                getFrameworkObjectToUpsert()
                            ).then(handleFrameworkUpsertSuccess)
                        }
                    }}
                    cancelText='Cancel'
                    handleCancel={closeSubjectCreateDialog}
                />
                </div>
            )}

            <FrameworkDetails
                {...{
                    frameworkName,
                    frameworkDescription,
                    facets
                }}
            />
            <div className='col-12 mt-5'>
                <button className='btn btn-primary me-2' type='submit' disabled={isFrameworkCreateSuccess} onClick={() => setIsPreview(false)}>
                    Back to modify framework
                </button>
                <button className='btn btn-primary' type='submit' disabled={isFrameworkCreateSuccess} onClick={() => {
                    setShowFrameworkCreateWarning(true)
                    window.scrollTo(0, 0)
                }}>
                    Save
                </button>
            </div>
        </>
    )
}

export default FrameworkPreview
