import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ReviewCreateForm from './ReviewCreateForm'
import ReviewCreatePreview from './ReviewCreatePreview'
import { getFacetsFromReviewAsObject } from '../utilities'

const ReviewModify = ({ frameworkService, reviewService }) => {
    const [subjectId, setSubjectId] = useState('')
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedFramework, setSelectedFramework] = useState()
    const [facetContents, setFacetContents] = useState({})
    const [phase, setPhase] = useState('modify')

    let params = useParams();
    const reviewId = params.id

    useEffect(() => {
        reviewService
            .getById(reviewId)
            .then(review => {
                transformAndSetFacetContents(review)
                setSubjectId(review.subjectId)
                setFrameworkId(review.frameworkId)
                frameworkService
                    .getById(review.frameworkId)
                    .then(framework => setSelectedFramework(framework))
            })
    }, []) 

    const transformAndSetFacetContents = (localReview) => {
        const newFacetContents = getFacetsFromReviewAsObject(localReview)
        setFacetContents(newFacetContents)
    }

    return (<>
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
                }
            }} />
        }
    </>)
}

export default ReviewModify
