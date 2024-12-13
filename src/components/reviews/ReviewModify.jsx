import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import ReviewCreateForm from './ReviewCreateForm'
import ReviewCreatePreview from './ReviewCreatePreview'
import { getFacetsFromReviewAsObject } from '../utilities'
import ReviewOverview from './ReviewOverview'

const ReviewModify = ({ reviewService }) => {
    const [subjectId, setSubjectId] = useState('')
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedFramework, setSelectedFramework] = useState()
    const [facetContents, setFacetContents] = useState({})
    const [phase, setPhase] = useState('modify')

    const [reviewTargetType, setReviewTargetType] = useState('')
    const [reviewTargetId, setReviewTargetId] = useState('')
    const [selectedReviewTarget, setSelectedReviewTarget] = useState()
    
    let params = useParams();
    const reviewId = params.id

    useEffect(() => {
        reviewService
            .getById(reviewId)
            .then(review => {
                transformAndSetFacetContents(review)
                setSelectedFramework(review.reviewFramework)
                setFrameworkId(review.reviewFramework.id)
                setReviewTargetType(review.targetType)
                if (review.targetType === 'framework') {
                    setSelectedReviewTarget(review.frameworkTarget)
                    setReviewTargetId(review.frameworkTarget.id)
                } else if (review.targetType === 'subject') {
                    setSelectedReviewTarget(review.subjectTarget)
                    setReviewTargetId(review.subjectTarget.id)
                }        
            })
    }, []) 

    const transformAndSetFacetContents = (localReview) => {
        const newFacetContents = getFacetsFromReviewAsObject(localReview)
        setFacetContents(newFacetContents)
    }

    return (<>
        <Link to='/reviews'>
            <button type='button' className='btn btn-primary mt-4'>Back to reviews</button>
        </Link>

        {reviewTargetType && selectedReviewTarget && selectedFramework &&
            <div className='mt-5'>
                <ReviewOverview { ...{ 
                    mode: 'view',
                    reviewTargetType,
                    reviewTargetName: selectedReviewTarget.name,
                    framework: selectedFramework
                } } />
            </div>
        }

        {phase === 'modify' && selectedFramework && Object.keys(facetContents).length > 0 &&
            <ReviewCreateForm { ...{
                selectedFramework,
                facetContents,
                setFacetContents,
                setPhase
            } } />
        }

        {phase === 'preview' &&
            <ReviewCreatePreview {...{ 
                reviewService,
                selectedFramework,
                facetContents,
                setPhase,
                subjectId,
                frameworkId,
                mode: 'update',
                handleSave: (reviewToSave) => {
                    return reviewService.update(reviewId, reviewToSave)
                },
                reviewTargetType,
                reviewTargetId
            }} />
        }
    </>)
}

export default ReviewModify
