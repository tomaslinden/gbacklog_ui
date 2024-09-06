import { useState } from 'react'
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Info } from 'react-feather';
import { ConfirmationAlert } from '../common/ConfirmationAlert';

const FrameworkPreview = ({ frameworkName, frameworkDescription, facets, setIsPreview }) => {
    const [isFrameworkCreateSuccess, setFrameworkCreateSuccess] = useState(false)
    const [isShowFrameworkCreateWarning, setShowFrameworkCreateWarning] = useState(false)

    const handleDescription = 'This is a programmatic name for the facet. It is used to reference the framework\'s facets in reviews.'

    const handleFramworkSave = () => {
    }

    return (
        <>
            {isFrameworkCreateSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Framework saved
                </div>
            )}

            {isShowFrameworkCreateWarning && (<>
                <ConfirmationAlert
                    title='Are you sure you want to save this framework?'
                    affirmativeText='Save'
                    handleAffermative={() => {
                        console.log('Save framework')
                    }}
                    cancelText='Cancel'
                    handleCancel={() => setShowFrameworkCreateWarning(false)}
                />
            </>)}

            <h3 className='mt-5'>{frameworkName}</h3>
            <div>{frameworkDescription}</div>
            <h3 className='mt-4'>Facets</h3>
            {facets.map(({ name, handle, description }, index) => {
                return (
                    <div key={index} className="card mt-3" style={{width: '18rem'}}>
                        <div className="card-body">
                            <h4 className="card-title">#{index + 1}: {name}</h4>
                            <div
                                className="card-subtitle mb-2 text-body-secondary"
                                aria-label={handleDescription}
                                style={{display: 'flex', alignItems: 'center'}}
                            >
                                {handle}
                                <OverlayTrigger
                                    delay={{ hide: 450, show: 300 }}
                                    overlay={(props) => (
                                        <Tooltip {...props}>{handleDescription}</Tooltip>
                                    )}
                                >
                                    {/* Todo: Add a suitable aria label for the tooltip so that it becomes accessible */}
                                    <Button
                                        className="btn btn-light btn-sm"
                                        style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                    ><Info size="24" /></Button>
                                </OverlayTrigger>
                            </div>
                            <p className="card-text">{description}</p>
                        </div>
                    </div>
                )
            })}

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
