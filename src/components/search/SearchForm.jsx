import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchForm = ({ 
    searchInputText,
    setSearchInputText,
    reviewTargetType,
    setReviewTargetType,
    onSubmit
}) => {
    const [isValidated, setIsValidated] = useState(false)

    const validateForm = () => {
        let isValid = true;
        setIsValidated(true);
        return isValid;
    }

    const handleFormSubmit = event => {
        event?.preventDefault()
        event?.stopPropagation()
        onSubmit()
    }

    const getFormClass = () => {
        let formClass = 'mt-4 row g-3 needs-validation'
        if (isValidated) {
            formClass += ' was-validated'
        }
        return formClass
    }

    return (
        <Form className={getFormClass()} noValidate validated={isValidated} onSubmit={handleFormSubmit}>
            <div className='mb-3 col-md-4'>
                <Form.Group>
                    <Form.Label htmlFor='reviewTargetTypeSelect'>Search term</Form.Label>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Form.Control
                            className="me-2"
                            as="input"
                            type="search"
                            placeholder="Search term"
                            aria-label="Search"
                            value={searchInputText}
                            onChange={(event) => {
                                setSearchInputText(event.target.value)
                            }}
                        />
                    </div>
                </Form.Group>
            </div>
            {/* <div className='mb-3 col-md-4'>
                <Form.Group>
                    <Form.Label htmlFor='reviewTargetTypeSelect'>Search target</Form.Label>
                    <Form.Select
                        aria-label="Select a review target type"
                        id='reviewTargetTypeSelect'
                        aria-describedby='reviewTargetTypeSelectHelp'
                        value={reviewTargetType}
                        onChange={({ target: { value } }) => setReviewTargetType(value)}
                        isValid={isValidated && isReviewTargetTypeValid()}
                        isInvalid={isValidated && !isReviewTargetTypeValid()}
                        required
                    >
                        <option value='any'>Any</option>
                        <option key='subject' value='subject'>Subject</option>
                        <option key='framework' value='framework'>Framework</option>
                        <option key='review' value='review'>Review</option>
                    </Form.Select>
                </Form.Group>
            </div> */}
            <div className='mb-3 col-md-4'>
                <Form.Group>
                    <Form.Label className='d-none d-md-block' htmlFor='reviewTargetTypeSelect'>&nbsp;</Form.Label>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                            Search
                        </Button>
                    </div>
                </Form.Group>
            </div>
        </Form>
    )  
}

export default SearchForm
