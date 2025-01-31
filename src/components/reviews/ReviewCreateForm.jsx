import { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { Info } from 'react-feather';
import DescriptionInputInstructions from '../common/DescriptionInputInstructions'
import VerdictWidget from '../common/VerdictWidget'
import { isValidMarkdown } from '../utilities'

const ReviewCreateForm = ({
    selectedFramework,
    setPhase,
    facetContents,
    setFacetContents,
    verdictValue,
    setVerdictValue
}) => {
    const [facetContentValidations, setFacetContentValidations] = useState({})
    const [facetContentTouched, setFacetContentTouched] = useState({})

    const { verdictType, verdictProperties, facets } = selectedFramework

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
                if (facetContentsLength === 0 || facetContentsLength > 1000) { // Synchronize with backend
                    isValid = false
                    facetContentValidationsCopy[handle] = false
                } else if (!isValidMarkdown(singleFacetContents)) {
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

    const validateVerdict = () => {
        if (verdictProperties && verdictProperties?.min && verdictProperties?.max) {
            return verdictValue !== undefined &&
                verdictValue >= verdictProperties.min &&
                verdictValue <= verdictProperties.max
        } else {
            return true
        }
    }
    
    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
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

    const validateForm = () => {
        return validateFacets() && validateVerdict()
    }

    return (<>
        <DescriptionInputInstructions type='review' className='mt-4' />

        {verdictType && verdictType !== 'none' &&
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className='mt-4'>
                    Verdict
                </Form.Label>
                <VerdictWidget
                    {...{
                        verdictType,
                        verdictProperties,
                        verdictValue,
                        setVerdictValue,
                    }}
                    className='ms-1'
                />
                {(!validateVerdict()) && <div className='invalid-feedback' style={{display: 'block'}}>Please check the verdict</div>}
            </Form.Group>}

        <Form className={getFormClass()} noValidate onSubmit={handleFormSubmit}>
            {facets.map((facet, index) => {
                const { handle, name, description } = facet
                return (
                    <Fragment key={handle}>
                        <Form.Group controlId={'facet.ControlTextarea' + index}>
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
                                            <Button
                                                className="btn btn-light btn-sm button-icon-custom"
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
