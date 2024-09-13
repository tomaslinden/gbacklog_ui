import { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { Info } from 'react-feather';

const ReviewCreateActual = ({
    // selectedSubject,
    selectedFramework
}) => {
    const [isValidated, setIsValidated] = useState(false)
    const [facetContents, setFacetContents] = useState({})

    const { facets } = selectedFramework

    const getFormClass = () => {
        let formClass = 'mt-4 needs-validation'
        if (isValidated) {
            formClass += ' was-validated'
        }
        return formClass
    }

    const validateForm = () => {
        let isValid = true;
        isValid = isValid && isSubjectIdValid()
        setIsValidated(true);
        return isValid;
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
        } else {
            console.log('There are validation errors')
        }
    }

    const getSingleFacetContents = (handle) => facetContents[handle] ?? ''

    const setSingleFacetContents = (event, handle) => {
        const value = event.target.value;
        let facetContentsCopy = structuredClone(facetContents)
        facetContentsCopy[handle] = value
        setFacetContents(facetContentsCopy)
    }

    return (<>
        <Form className={getFormClass()} noValidate validated={isValidated} onSubmit={handleFormSubmit}>
            {facets.map((facet, index) => {
                const { handle, name, description } = facet
                return (
                    <Fragment key={handle}>
                        <Form.Group style={{width: '100%'}} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>
                                <div
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
                            />
                        </Form.Group>
                    </Fragment>
                )
            })}
        </Form>
    </>)
}
export default ReviewCreateActual
