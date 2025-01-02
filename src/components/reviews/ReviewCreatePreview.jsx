import { useState } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ReviewViewContents from './ReviewViewContents'

const ReviewCreatePreview = ({
    selectedFramework,
    facetContents,
    setPhase,
    frameworkId,
    mode,
    handleSave,
    reviewTargetType,
    reviewTargetId,
    verdictValue
}) => {
    // Rename these to upsert
    const [isReviewCreateSuccess, setReviewCreateSuccess] = useState(false)
    const [createdReview, setCreatedReview] = useState(false)

    const facetHandles = Object.keys(facetContents)

    const { verdictType } = selectedFramework

    const getReviewObject = () => {
        const facetContentsToSend = facetHandles.map((handle) => {
            return {
                handle,
                contents: facetContents[handle].trim()
            }
        })

        return {
            frameworkId,
            targetType: reviewTargetType,
            targetId: reviewTargetId,
            facetContents: facetContentsToSend,
            verdictValue
        }
    }

    const handleReviewSave = () => {
        handleSave(getReviewObject()).then((result) => {
            setCreatedReview(result)
            setReviewCreateSuccess(true)    
        })
    }

    return (<>
        {isReviewCreateSuccess && (<>
            <div className="alert alert-success mt-5" role="alert">
                Review saved
            </div>
            <Link to={`/review/${createdReview.id}`}>
                <button className='btn btn-primary me-2'>
                    View {mode === 'create' ? 'created' : 'modified'} review
                </button>
            </Link>
            <Link to={`/reviews`}>
                <button className='btn btn-primary'>
                    To reviews
                </button>
            </Link>
        </>)}

        <ReviewViewContents {...{
            facetContents,
            selectedFramework,
            verdictType,
            verdictValue
        }} />

        {!isReviewCreateSuccess && <>
            <Button className='mt-4' variant="warning" onClick={handleReviewSave}>
                Save review
            </Button>

            <Button
                className='mt-4 ms-2'
                variant="primary"
                onClick={() => setPhase(mode === 'create' ? 'create' : 'modify')}>
                Continue editing
            </Button>
        </>}
    </>)
}

export default ReviewCreatePreview
