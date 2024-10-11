import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import ReviewViewContents from './ReviewViewContents'
import { getFacetsFromReviewAsObject } from '../utilities'
import ReviewOverview from './ReviewOverview'

const ReviewView = ({ subjectService, reviewService, frameworkService }) => {
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
                frameworkService.getById(receivedReview.frameworkId)
                    .then((receivedFramework) => {
                        setFramework(receivedFramework)
                    })
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
    
    const facetContentsAsObject = getFacetsFromReviewAsObject(review)

    return (<>
        <h1>View review</h1>

        <Link to="/reviews">
            <button type="button" className="btn btn-primary mt-4">View all reviews</button>
        </Link>

        {review && reviewTarget && framework && <>
            <div className='mt-5'>
                <ReviewOverview { ...{ 
                    mode: 'view',
                    reviewTargetType: review.targetType,
                    reviewTargetName: reviewTarget.name,
                    framework: framework
                } } />
            </div>

            <div className='mt-4'>
                <ReviewViewContents {...{ 
                    facetContents: facetContentsAsObject, 
                    selectedFramework: framework
                }} />
            </div>
        </>}

    </>)
}

export default ReviewView
