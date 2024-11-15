import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SubjectViewContents from './subjects/SubjectViewContents'
import FrameworkDetails from './frameworks/FrameworkDetails';
import PageHeadingAndButtons from './common/PageHeadingAndButtons'
import { ConfirmationAlert } from './common/ConfirmationAlert';
import ReviewViewOverviewAndContents from './reviews/ReviewViewOverviewAndContents'

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const Flag = ({ subjectService, frameworkService, reviewService }) => {
    const [target, setTarget] = useState({})
    const [targetAdditionalInfo, setTargetAdditionalInfo] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const [isShowConfirmation, setShowConfirmation] = useState(false)
    const [isConfirmationSuccess, setConfirmationSuccess] = useState(false)

    let params = useParams();
    const { targetType, id } = params

    useEffect(() => {
        if (targetType === 'framework') {
            frameworkService
                .getById(id)
                .then(receivedFramework => {
                    setTarget(receivedFramework);
                    setLoaded(true)
                })
        } else if (targetType === 'subject') {
            subjectService
                .getById(id)
                .then(receivedSubject => {
                    setTarget(receivedSubject);
                    setLoaded(true)
                })
        } else if (targetType === 'review') {
            // Todo simplify this by using async/await instead of promises
            reviewService
                .getById(id)
                .then(receivedReview => {
                    setTarget(receivedReview);
                    let newTargetAdditionalInfo = {}
                    frameworkService
                        .getById(receivedReview.frameworkId)
                        .then(receivedReviewFramework => {
                            newTargetAdditionalInfo.framework = receivedReviewFramework
                            if (receivedReview?.targetType === 'subject') {
                                subjectService
                                    .getById(receivedReview.targetId)
                                    .then(receivedSubject => {
                                        newTargetAdditionalInfo.reviewTarget = receivedSubject
                                        setTargetAdditionalInfo(newTargetAdditionalInfo)
                                        setLoaded(true)
                                    })
                            } else if (receivedReview?.targetType === 'framework') {
                                frameworkService
                                    .getById(receivedReview.targetId)
                                    .then(receivedReviewTargetFramework => {
                                        newTargetAdditionalInfo.reviewTarget = receivedReviewTargetFramework
                                        setTargetAdditionalInfo(newTargetAdditionalInfo)
                                        setLoaded(true)
                                    })
                            }
                                    
                        })
                })
        }
    }, []) 

    const closeConfirmationDialog = () => {
        setShowConfirmation(false)
    }
    
    const handleFlagging = () => {
        if (targetType === 'framework') {
            frameworkService
                .flag(id)
                .then(() => {
                    setConfirmationSuccess(true)
                })
        } else if (targetType === 'subject') {
            subjectService
                .flag(id)
                .then(() => {
                    setConfirmationSuccess(true)
                })
        } else if (targetType === 'review') {
            reviewService
                .flag(id)
                .then(() => {
                    setConfirmationSuccess(true)
                })
        }
    }

    return (<>
        <PageHeadingAndButtons heading={`Flag ${targetType}`}>
            <Link to={`/${targetType}s`}>
                <button type='button' className='btn btn-primary mt-4'>Back to {`${targetType}s`}</button>
            </Link>
        </PageHeadingAndButtons>

        {isConfirmationSuccess && (
            <div className="alert alert-success mt-4" role="alert">
                {capitalizeFirstLetter(targetType)} flagged
            </div>
        )}

        {!isConfirmationSuccess && isShowConfirmation && (<>
            <ConfirmationAlert
                title={`Are you sure you want to flag this ${targetType}? It will no longer be accessible for usage.`}
                // subtitle={target?.name}
                affirmativeText='Flag'
                handleAffirmative={handleFlagging}
                cancelText='Cancel'
                handleCancel={closeConfirmationDialog}
                buttonVariation='danger'
            />
        </>)}

        {isLoaded &&<>
            {targetType === 'subject' &&
                <SubjectViewContents className='mt-4' name={target.name} description={target.description} />
            }            

            {targetType === 'framework' &&
                <FrameworkDetails
                    frameworkName={target.name}
                    frameworkDescription={target.description}
                    frameworkStatus={target.status}
                    facets={target.facets}
                />
            }

            {targetType === 'review' &&
                target?.targetType &&
                targetAdditionalInfo?.reviewTarget?.name &&
                targetAdditionalInfo?.framework && (<>
                <ReviewViewOverviewAndContents
                    reviewTargetType={target.targetType}
                    reviewTargetName={targetAdditionalInfo.reviewTarget.name}
                    framework={targetAdditionalInfo.framework}
                    review={target} />
            </>)}

            <Button
                variant='warning'
                className='mt-3'
                onClick={() => setShowConfirmation(true)}
                disabled={isShowConfirmation || isConfirmationSuccess}
            >Flag</Button>
        </>}
    </>)
}

export default Flag
