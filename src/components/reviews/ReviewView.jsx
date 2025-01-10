import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import ReviewViewOverviewAndContents from './ReviewViewOverviewAndContents'
import ReviewMetaReviews from './ReviewMetaReviews'

const ReviewView = ({ reviewService }) => {
    // Consider moving the logic to ReviewViewOverviewAndContents in preparation for writing 
    // the Flag component
    const [review, setReview] = useState()
    const [metaReviewAverage, setMetaReviewAverage] = useState()
    const [framework, setFramework] = useState()
    const [reviewTarget, setReviewTarget] = useState()

    let params = useParams();
    const { id } = params

    useEffect(() => {
        reviewService
            .getById(id)
            .then(receivedReview => {
                setReview(receivedReview);
                setFramework(receivedReview?.reviewFramework)
                if (receivedReview.targetType === 'subject') {
                    setReviewTarget(receivedReview.subjectTarget)
                // Review target is a framework
                } else {
                    setReviewTarget(receivedReview.frameworkTarget)
                }
            })

        reviewService
            .getMetaReviewAverage(id)
            .then(receivedAverage => setMetaReviewAverage(receivedAverage))
    }, [])

    return (<>
        <h1>View review</h1>

        <Link to="/reviews">
            <button type="button" className="btn btn-primary mt-4">View all reviews</button>
        </Link>

        {/* consider simplifying ReviewViewOverviewAndContents
        so that it only takes the review as an argument and then fetches what it needs by itself so it can display the review */}

        {review && reviewTarget && framework && <>
            <ReviewViewOverviewAndContents
                reviewTargetType={review.targetType}
                reviewTargetName={reviewTarget.name}
                framework={framework}
                review={review}
                metaReviewAverage={metaReviewAverage}
            />

            <ReviewMetaReviews className='mt-5' {...{
                reviewService,
                reviewTargetId: id,
            }} />
        </>}

    </>)
}

export default ReviewView
