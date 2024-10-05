import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import ReviewViewContents from './ReviewViewContents'
import { getFacetsFromReviewAsObject } from '../utilities'

const ReviewView = ({ reviewService, frameworkService }) => {
    const [review, setReview] = useState()
    const [framework, setFramework] = useState()

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
    
    const facetContentsAsObject = getFacetsFromReviewAsObject(review)

    return (<>
        <h1>View review</h1>

        <Link to="/reviews">
            <button type="button" className="btn btn-primary mt-4">View all reviews</button>
        </Link>

        {review && framework &&
            <div className='mt-5'>
                <ReviewViewContents {...{ 
                    facetContents: facetContentsAsObject, 
                    selectedFramework: framework
                }} />
            </div>
        }

    </>)
}

export default ReviewView
