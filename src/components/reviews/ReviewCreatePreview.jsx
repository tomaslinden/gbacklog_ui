import { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { Info } from 'react-feather';

const ReviewCreatePreview = ({
    reviewService,
    selectedFramework,
    facetContents,
    setPhase,
    subjectId,
    frameworkId,
    mode,
    handleSave
}) => {
    // Rename these to upsert
    const [isReviewCreateSuccess, setReviewCreateSuccess] = useState(false)
    const [createdReview, setCreatedReview] = useState(false)

    const facetHandles = Object.keys(facetContents)

    const getFacetProperty = (facetHandle, property) => {
        const foundFacet = selectedFramework.facets.find(facet => facet.handle === facetHandle)
        return foundFacet?.[property]
    }

    const getReviewObject = () => {
        const facetContentsToSend = facetHandles.map((handle) => {
            return {
                handle,
                contents: facetContents[handle].trim()
            }
        })

        return {
            frameworkId,
            subjectId,
            facetContents: facetContentsToSend
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
                <button className='btn btn-primary me-2' disabled>
                    View {mode === 'create' ? 'created' : 'modified'} review
                </button>
            </Link>
            <Link to={`/reviews`}>
                <button className='btn btn-primary'>
                    To reviews
                </button>
            </Link>
        </>)}

        {facetHandles.map((handle) => {
            return (<Fragment key={handle}>
                <Card className='mt-4'>
                    <Card.Body>
                        <Card.Title style={{display: 'flex', alignItems: 'center'}}>
                            <div>{getFacetProperty(handle, 'name')}</div>
                            <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>{getFacetProperty(handle, 'description')}</Tooltip>
                                )}
                            >
                                {/* Todo: Add a suitable aria label for the tooltip so that it becomes accessible */}
                                <Button
                                    className="btn btn-light btn-sm"
                                    style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                ><Info size="24" /></Button>
                            </OverlayTrigger>
                        </Card.Title>
                        <Card.Text>
                            {facetContents[handle]}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>)
        })}

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
