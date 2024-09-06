import { useState } from 'react'
import { ConfirmationAlert } from '../common/ConfirmationAlert';
import FrameworkDetails from './FrameworkDetails';

const FrameworkPreview = ({ frameworkService, frameworkName, frameworkDescription, facets, setIsPreview }) => {
    const [isFrameworkCreateSuccess, setFrameworkCreateSuccess] = useState(false)
    const [isShowFrameworkCreateWarning, setShowFrameworkCreateWarning] = useState(false)

    const closeSubjectCreateDialog = () => {
        setShowFrameworkCreateWarning(false)
    }
    
    return (
        <>
            {isFrameworkCreateSuccess && (
                <div className="alert alert-success mt-5" role="alert">
                    Framework saved
                </div>
            )}

            {isShowFrameworkCreateWarning && (
                <div className='mt-5'>
                <ConfirmationAlert
                    title='Are you sure you want to save this framework?'
                    affirmativeText='Save'
                    handleAffermative={() => {
                        frameworkService.create({
                            name: frameworkName,
                            description: frameworkDescription,
                            facets
                        }).then((result) => {
                            closeSubjectCreateDialog()
                            setFrameworkCreateSuccess(true)
                            setTimeout(() => {
                                setFrameworkCreateSuccess(false)
                                {/* Todo disable buttons and take user to framework view upon successful framework creation */}
                                }, 3000)            
                        })
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
                <button className='btn btn-primary me-2' type='submit' disabled={false} onClick={() => setIsPreview(false)}>
                    Modify framework
                </button>
                <button className='btn btn-primary' type='submit' disabled={false} onClick={() => {
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
