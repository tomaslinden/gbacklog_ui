import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReviewCreateSelect from './ReviewCreateSelect'

const Reviews = ({ subjectService, frameworkService, reviewService }) => {
    const [subjectId, setSubjectId] = useState('')
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedSubject, setSelectedSubject] = useState()
    const [selectedFramework, setSelectedFramework] = useState()
    const [reviews, setReviews] = useState([])
    const [isShowReviewDeleteWarning, setShowReviewDeleteWarning] = useState(false)
    const [reviewSelectedForDeletion, setReviewSelectedForDeletion] = useState(null)
    const [isReviewDeleteSuccess, setReviewDeleteSuccess] = useState(false)

    useEffect(() => {
        getAllReviews()
    }, []) 

    const getAllReviews = () => {
        reviewService
            .getAll()
            .then(reviews => {
                setReviews(reviews)
            })
    }

    const handleReviewDelete = () => {
        console.log('handleReviewDelete')
        reviewService
            .deleteSubject(reviewSelectedForDeletion.id)
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

    const closeReviewDeletionDialog = () => {
        setShowReviewDeleteWarning(false)
        setReviewSelectedForDeletion(null)
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
                subjectId,
                setSubjectId,
                frameworkId,
                setFrameworkId,
                setSelectedSubject,
                setSelectedFramework,
                // setPhase
                continueButtonText: 'Get reviews'
            } } />

            <ul className="list-group mt-4">
                {selectedSubject && selectedFramework && reviews.map(review => 
                    <li className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                Review with id {review.id} of <strong>{review.subjectId}</strong> using <strong>{review.frameworkId}</strong>.
                            </div>
                            <div className="p-2"></div>
                            <div>
                                <button className="btn btn-primary me-md-2" style={{position: 'relative', left:"-4px"}} type="button">Modify</button>
                                <button className="btn btn-primary" type="button">Delete</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>

            <Card>
                <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
                    This is some text within a card body.
                    <div>
                        {/* <Link to={`/modifyReview/${review.id}`}> */}
                        <Link to={`/modifyReview/`}>
                            <Button className='mt-4' variant="warning">
                                Modify
                            </Button>
                        </Link>

                        <Button className='mt-4 ms-2' variant="primary" onClick={() => {
                            setReviewSelectedForDeletion(subject)
                            setShowReviewDeleteWarning(true)
                            window.scrollTo(0, 0)
                            disabled={isSubjectDeleteSuccess}
                        }}>
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
        </>
    )
}

export default Reviews
