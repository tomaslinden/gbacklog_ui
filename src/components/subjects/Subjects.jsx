import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from "react-router-dom";
import { ConfirmationAlert } from '../common/ConfirmationAlert';
import { Info } from 'react-feather';
import IconButton from '../common/IconButton'
import RenderMarkdown from '../common/RenderMarkdown'
import PageNavigationAndButtons from '../common/PageNavigationAndButtons'

const Subjects = ({ subjectService }) => {
    const [subjects, setSubjects] = useState([])

    const [confirmationType, setConfirmationType] = useState(null)
    const [isShowConfirmation, setShowConfirmation] = useState(false)
    const [itemSelectedForConfirmation, setItemSelectedForConfirmation] = useState(null)
    const [isConfirmationSuccess, setConfirmationSuccess] = useState(false)

    useEffect(() => {
        getAllSubjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* Todo move this to its own file and propagate to other pages */}
            <PageNavigationAndButtons heading='Review subjects'>
                <Link to="/createSubject">
                    <button type="button" className="btn btn-primary mt-4">Create subject</button>
                </Link>
            </PageNavigationAndButtons>

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
                            <div className="d-flex align-items-center">
                                <Link to={`/subject/${subject.id}`}>
                                    {subject.name}
                                </Link>
                                {subject?.description?.trim().length > 0 &&
                                <OverlayTrigger
                                    delay={{ hide: 450, show: 300 }}
                                    overlay={(props) => (
                                        <Tooltip {...props}>
                                            <RenderMarkdown>{subject.description}</RenderMarkdown>
                                        </Tooltip>
                                    )}
                                >
                                    {/* Todo: Add a suitable aria label for the tooltip so that it becomes accessible */}
                                    <Button
                                        className="btn btn-light btn-sm button-icon-custom"
                                        style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                    ><Info size="24" /></Button>
                                </OverlayTrigger>
                                }
                            </div>
                            <div className="p-2"></div>
                                <div style={{textAlign: 'right'}}>
                                    {subject.status != 'final' && <>
                                        <IconButton
                                            onClick={() => {
                                                openConfirmationDialog('finalize', subject)
                                            }}
                                            disabled={isConfirmationSuccess}
                                            className='ms-1'
                                            buttonVariant='primary'
                                            iconType='check-square'
                                            description='Finalize'
                                        />
                                        <IconButton
                                            onClick={() => {
                                                openConfirmationDialog('delete', subject)
                                            }}
                                            disabled={isConfirmationSuccess}
                                            className='ms-1'
                                            buttonVariant='primary'
                                            iconType='trash-2'
                                            description='Delete'
                                        />
                                        <IconButton 
                                            className='ms-1'
                                            buttonVariant='primary'
                                            iconType='edit'
                                            description='Modify'
                                            linkTarget={`/modifySubject/${subject.id}`}
                                        />
                                    </>}
                                    <IconButton
                                        onClick={() => {}}
                                        disabled={isConfirmationSuccess}
                                        className='ms-1'
                                        buttonVariant='danger'
                                        iconType='flag'
                                        description='Flag as inappropriate'
                                        linkTarget={`/flag/subject/${subject.id}`}
                                    />
                                </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

Subjects.propTypes = {
    subjectService: PropTypes.string.isRequired
}

export default Subjects
