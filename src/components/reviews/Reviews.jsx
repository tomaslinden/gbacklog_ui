import { useState } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { ConfirmationAlert } from '../common/ConfirmationAlert';
import ReviewCreateSelect from './ReviewCreateSelect'

const Reviews = ({ subjectService, frameworkService, reviewService }) => {
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedFramework, setSelectedFramework] = useState()
    const [reviews, setReviews] = useState([])
    const [isShowReviewDeleteWarning, setShowReviewDeleteWarning] = useState(false)
    const [reviewSelectedForDeletion, setReviewSelectedForDeletion] = useState(null)
    const [isReviewDeleteSuccess, setReviewDeleteSuccess] = useState(false)
    const [reviewTargetType, setReviewTargetType] = useState('')
    const [reviewTargetId, setReviewTargetId] = useState('')
    const [selectedReviewTarget, setSelectedReviewTarget] = useState()
    
    const getAllReviews = () => {
        reviewService
            .getAll()
            .then(reviews => {
                const filteredReviews = reviews.filter((review) => {
                    // Todo update this so that it supports reviewTargetType
                    return (
                        review.targetId === reviewTargetId &&
                        review.frameworkId === frameworkId
                    )
                })
                setReviews(filteredReviews)
            })
    }

    const closeReviewDeletionDialog = () => {
        setShowReviewDeleteWarning(false)
        setReviewSelectedForDeletion(null)
    }

    const handleReviewDelete = () => {
        reviewService
            .deleteReview(reviewSelectedForDeletion.id)
            .then(() => {
                getAllReviews()
                setReviewDeleteSuccess(true)
                closeReviewDeletionDialog()
                setTimeout(() => {
                    setReviewDeleteSuccess(false)
                    closeSubjectDeletionDialog()
                }, 3000)
            })
    }

    return (
        <>
            <h1>Reviews</h1>

            <Link to="/createReview">
                <button type="button" className="btn btn-primary mt-4">Create review</button>
            </Link>
            
            <ReviewCreateSelect { ...{ 
                subjectService,
                frameworkService,
                frameworkId,
                setFrameworkId,
                setSelectedFramework,
                onSelectSuccess: getAllReviews,
                continueButtonText: 'Get reviews',
                componentUsagetype: 'searchReviews',
                reviewTargetType,
                setReviewTargetType,
                reviewTargetId,
                setReviewTargetId,
                setSelectedReviewTarget
            } } />

            {isShowReviewDeleteWarning && (<>
                <ConfirmationAlert
                    title='Are you sure you want to delete this review?'
                    subtitle={reviewSelectedForDeletion.name}
                    affirmativeText='Delete'
                    handleAffirmative={handleReviewDelete}
                    cancelText='Cancel'
                    handleCancel={closeReviewDeletionDialog}
                />
            </>)}

            {selectedReviewTarget && selectedFramework && reviews.map(review => {
                return (
                    <div key={review.id}> 
                        <CardGroup className='mt-4'>
                            {selectedFramework.facets.map((facet) => {
                                return (
                                    <Card key={facet.handle}>
                                        <Card.Body>
                                            <Card.Title>{facet.name}</Card.Title>
                                            <Card.Text>
                                                {review.facetContents.find(
                                                    (contents) => contents.handle === facet.handle)?.contents
                                                }
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </CardGroup>

                        <div className='mt-2 ms-1'>
                            <Link to={`/review/${review.id}`}>
                                <button className="btn btn-primary me-md-2"
                                    style={{position: 'relative', left:"-4px"}}
                                    type="button"
                                >
                                    View
                                </button>
                            </Link>

                            <Link to={`/modifyReview/${review.id}`}>
                                <button className="btn btn-primary ms-1 me-md-2"
                                    style={{position: 'relative', left:"-4px"}}
                                    type="button"
                                >
                                    Modify
                                </button>
                            </Link>

                            <button className="btn btn-primary" type="button"
                                onClick={() => {
                                    setReviewSelectedForDeletion(review)
                                    setShowReviewDeleteWarning(true)
                                    window.scrollTo(0, 0)
                                }}
                                disabled={isReviewDeleteSuccess}
                            >Delete</button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Reviews
