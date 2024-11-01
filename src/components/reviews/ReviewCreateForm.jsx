import { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { Info } from 'react-feather';
import ClosableCardTitle from '../common/ClosableCardTitle'

const ReviewCreateForm = ({
    selectedFramework,
    setPhase,
    facetContents,
    setFacetContents
}) => {
    const [facetContentValidations, setFacetContentValidations] = useState({})
    const [facetContentTouched, setFacetContentTouched] = useState({})
    const [displayInstructions, setDisplayInstructions] = useState(true)

    const { facets } = selectedFramework

    useEffect(() => {
        let newFacetContents = {}
        let newFacetContentValidations = {}
        let newFacetContentTouched = {}
        facets.forEach(({ handle }) => {
            newFacetContents[handle] = getSingleFacetContents(handle)
            newFacetContentValidations[handle] = true
            newFacetContentTouched[handle] = false
        })
        setFacetContents(newFacetContents)
        setFacetContentValidations(newFacetContentValidations)
        setFacetContentTouched(newFacetContentTouched)
    }, [])

    useEffect(() => {
        validateFacets()
    }, [facetContents])
    
    const getFormClass = () => {
        let formClass = 'mt-4 needs-validation'
        return formClass
    }

    const isFacetContentsTouched = (handle) => {
        return facetContentTouched[handle]
    }

    const isFacetContentsValid = (handle) => {
        return facetContentValidations[handle]
    }

    // Todo: add validation for disallowing using hashes in the markdown syntax.
    const validateFacets = () => {
        let isValid = true;
        if (Object.keys(facetContents).length > 0) {
            let facetContentValidationsCopy = structuredClone(facetContentValidations)
            facets.forEach(({ handle }) => {
                const singleFacetContents = facetContents[handle];
                const facetContentsLength = singleFacetContents.length
                if (facetContentsLength === 0 || facetContentsLength > 500) { // Synchronize with backend
                    isValid = false
                    facetContentValidationsCopy[handle] = false
                } else if (singleFacetContents.indexOf('#') > -1) {
                    isValid = false
                    facetContentValidationsCopy[handle] = false
                } else {
                    facetContentValidationsCopy[handle] = true
                }
            })
            setFacetContentValidations(facetContentValidationsCopy)
        }
        return isValid
    }
    
    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateFacets()) {
            setPhase('preview')
        }
    }

    const getSingleFacetContents = (handle) => facetContents[handle] ?? ''

    const setSingleFacetContents = (event, handle) => {
        const value = event.target.value;
        let facetContentsCopy = structuredClone(facetContents)
        let facetContentsTouchedCopy = structuredClone(facetContentTouched)
        facetContentsCopy[handle] = value
        facetContentsTouchedCopy[handle] = true
        setFacetContents(facetContentsCopy)
        setFacetContentTouched(facetContentsTouchedCopy)
    }

    return (<>
        {displayInstructions &&
            <Card className='mt-4'>
                <Card.Body>
                    <ClosableCardTitle handleClose={() => setDisplayInstructions(false)}>
                        Instructions
                    </ClosableCardTitle>
                    The review facet contents support using <a href='https://commonmark.org/help/' target='_blank'>Markdown syntax</a>.
                    Note that using the headings (i.e. hashes, such as "#" and "##", in markdown) are disallowed as they are reserved for the rest of the pages' contents.
                </Card.Body>
            </Card>
        }
        <Form className={getFormClass()} noValidate onSubmit={handleFormSubmit}>
            {facets.map((facet, index) => {
                const { handle, name, description } = facet
                return (
                    <Fragment key={handle}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>
                                <div
                                    className='mt-2'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        {facets.length > 1 && <>Facet #{index + 1}: </>}{name}
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>{description}</Tooltip>
                                            )}
                                        >
                                            {/* Todo: Add a suitable aria label for the tooltip so that it becomes accessible */}
                                            <Button
                                                className="btn btn-light btn-sm"
                                                style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                            ><Info size="24" /></Button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={getSingleFacetContents(handle)}
                                onChange={(event) => {
                                    setSingleFacetContents(event, handle)
                                }}
                                isValid={isFacetContentsTouched(handle) && isFacetContentsValid(handle)}
                                isInvalid={isFacetContentsTouched(handle) && !isFacetContentsValid(handle)}
                            />
                        </Form.Group>
                    </Fragment>
                )
            })}
            <Button className='mt-4' variant="primary" type="submit">
                Preview
            </Button>
        </Form>
    </>)
}
export default ReviewCreateForm
