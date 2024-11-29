import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import ReviewViewOverviewAndContents from './ReviewViewOverviewAndContents'

const ReviewView = ({ subjectService, reviewService, frameworkService }) => {
    
    // Consider moving the logic to ReviewViewOverviewAndContents in preparation for writing 
    // the Flag component
    const [review, setReview] = useState()
    const [framework, setFramework] = useState()
    const [reviewTarget, setReviewTarget] = useState()

    let params = useParams();

    useEffect(() => {
        const { id } = params
        reviewService
            .getById(id)
            .then(receivedReview => {
                setReview(receivedReview);
                setFramework(receivedReview?.reviewFramework)
            })
    }, []) 

    useEffect(() => {
        if (review?.targetType === 'subject') {
            subjectService
                .getById(review.targetId)
                .then(subject => {
                    console.log('subject', subject)
                    setReviewTarget(subject)
                })
        } else if (review?.targetType === 'framework') {
            frameworkService
                .getById(review.targetId)
                .then(framework => {
                    console.log('framework', framework)
                    setReviewTarget(framework)
                })
        }
    }, [review]) 
    
    return (<>
        <h1>View review</h1>

        <Link to="/reviews">
            <button type="button" className="btn btn-primary mt-4">View all reviews</button>
        </Link>

        {/* Todo continue here: for upcoming flagging: 
        consider simplifying ReviewViewOverviewAndContents
        so that it only takes the review as an argument and then fetches what it needs by itself so it can display the review */}

        {review && reviewTarget && framework && <>
            <ReviewViewOverviewAndContents
                reviewTargetType={review.targetType}
                reviewTargetName={reviewTarget.name}
                framework={framework}
                // facetContents={facetContentsAsObject}
                review={review}
            />
        </>}

    </>)
}

export default ReviewView
