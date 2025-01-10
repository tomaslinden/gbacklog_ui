import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import IconButton from '../common/IconButton'
import VerdictWidget from '../common/VerdictWidget'
import { getMetaReviewFrameworkId } from '../utilities'

const ReviewMetaReviews = ({ className, reviewService, reviewTargetId, updateReview }) => {
    const [commentText, setCommentText] = useState('')
    const [commentVerdict, setCommentVerdict] = useState(false)
    const [metaReviews, setMetaReviews] = useState([])
    const [isSubmitMetaReviewSuccess, setSubmitMetaReviewSuccess] = useState(false)

    useEffect(() => {
        getMetaReviews()
    }, []) 

    const getMetaReviews = () => {
        // Todo get reviews by target id and type
        // reviewService.get
        reviewService
            .getManyByFrameworkAndTarget(
                getMetaReviewFrameworkId(),
                'review',
                reviewTargetId
            )
            .then(receivedMetaReviews => setMetaReviews(receivedMetaReviews))
    }

    const validateForm = () => {
        return commentText.trim().length > 0
    }

    // Todo implement flash alert
    const displayOnSuccessFlashAlert = () => {
        setSubmitMetaReviewSuccess(true)
        setTimeout(() => {
            setSubmitMetaReviewSuccess(false)
        }, 3000)
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
            reviewService.create({
                // Todo move this id to some configuration file
                frameworkId: getMetaReviewFrameworkId(),
                targetType: 'review',
                targetId: reviewTargetId,
                facetContents: [{
                    handle: 'comment',
                    contents: commentText
                }],
                verdictValue: commentVerdict ? 1 : 0
            }).then(() => reviewService
                .getMetaReviewAverage(reviewTargetId)
                .then(receivedAverage => receivedAverage)
            // Note that if multiple people submit meta reviews to the same review simultaneously,
            // then the meta review average calculated here will not be accurate.
            // Consider adding logic for checking for inconsistencies with regard to the
            // meta review averages stored in the reviews.
            ).then((metaReviewAverage) => 
                reviewService.patch(reviewTargetId, { metaReviewAverage })
            ).then(() => {
                updateReview()
                getMetaReviews()
                clearMetaReviewForm()
                displayOnSuccessFlashAlert()
            })
        }
    }

    const clearMetaReviewForm = () => {
        setCommentText('')
        setCommentVerdict(false)
    }
        
    return (<div {...{ className }}>
        <h2>Add meta-review</h2>
        <Card>
            <Card.Body>
                {isSubmitMetaReviewSuccess && (
                    <div className="alert alert-success mt-4" role="alert">
                        Meta-review submitted
                    </div>
                )}

                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="commentForm.verdict">
                        <Form.Label className='mt-1'>
                            Is the review good?
                        </Form.Label>
                        <VerdictWidget
                            verdictType='discrete'
                            verdictProperties={{ max: 1, min: 0, stepSize: 1 }}
                            {...{
                                verdictValue: commentVerdict,
                                setVerdictValue: setCommentVerdict,
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="commentForm.text">
                        <Form.Label className='mt-4'>
                            Motivation
                        </Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={commentText}
                            onChange={(event) => {
                                setCommentText(event.target.value)
                            }}
                        />
                    </Form.Group>

                    <Button
                        className="mt-4"
                        type="submit"
                        disabled={isSubmitMetaReviewSuccess}
                    >Submit</Button>
                </Form>
            </Card.Body>
        </Card>

        <h2 className='mt-5'>Meta-reviews</h2>
        {metaReviews.length > 0 && metaReviews.map((metaReview) => 
            <Card as='div' className='mt-2' key={metaReview.id}>
                <div style={{display: 'flex'}}>
                    <Card.Body>
                        <VerdictWidget
                            verdictType='discrete'
                            verdictProperties={{ max: 1, min: 0, stepSize: 1 }}
                            {...{
                                verdictValue: metaReview?.verdictValue,
                            }}
                            disabled={true}
                        />
                        <div className='mt-2'>
                            {metaReview?.facetContents[0]?.contents}
                        </div>
                    </Card.Body>
                    <div>
                        <IconButton
                            onClick={() => {}}
                            disabled={false}
                            className='mt-3 ms-2 me-3'
                            buttonVariant='danger'
                            iconType='flag'
                            description='Flag as inappropriate'
                            linkTarget={`/flag/review/${metaReview.id}`}
                        />
                    </div>
                </div>
            </Card>
        )}
    </div>)
}

export default ReviewMetaReviews
