import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ReviewCreateSelect = ({ 
    subjectService,
    frameworkService,
    frameworkId,
    setFrameworkId,
    setSelectedFramework,
    onSelectSuccess,
    continueButtonText,
    componentUsagetype,
    reviewTargetType,
    setReviewTargetType,
    reviewTargetId,
    setReviewTargetId,
    setSelectedReviewTarget,
}) => {
    const [subjects, setSubjects] = useState([])
    const [frameworks, setFrameworks] = useState([])
    const [isValidated, setIsValidated] = useState(false)

    const [reviewTargets, setReviewTargets] = useState([])

    useEffect(() => {
        subjectService
            .getAllFinal()
            .then(subjects => setSubjects(subjects))

        frameworkService
            .getAllFinal()
            .then(frameworks => setFrameworks(frameworks))
    }, []) 

    useEffect(() => {
        if(componentUsagetype === 'searchReviews' && reviewTargetId?.length > 0 && frameworkId?.length > 0) {
            console.log('triggered')
            handleFormSubmit()
        }
    }, [reviewTargetId, frameworkId])

    useEffect(() => {
        if (reviewTargetType === 'subject') {
            setReviewTargets(subjects)
        } else if (reviewTargetType === 'framework') {
            setReviewTargets(frameworks)
        }
    }, [reviewTargetType])
    
    const isReviewTargetTypeValid = () => {
        return reviewTargetType !== ''
    }

    const isReviewTargetIdValid = () => {
        return reviewTargetId !== ''
    }

    const isFrameworkIdValid = () => {
        return frameworkId !== ''
    }

    const validateForm = () => {
        let isValid = true;
        isValid = isValid && isReviewTargetTypeValid()
        isValid = isValid && isReviewTargetIdValid()
        isValid = isValid && isFrameworkIdValid()
        setIsValidated(true);
        return isValid;
    }

    const handleFormSubmit = event => {
        event?.preventDefault()
        event?.stopPropagation()
        if (validateForm()) {
            // Todo optimize this so that only the ids of subjects and frameworks are retrieved in the first phase
            // Then once a subject and a framework has been selected, fetch the actual
            // subject and framework.
            let selectedReviewTarget
            if (reviewTargetType === 'subject') {
                selectedReviewTarget = subjects.find(subject => subject.id === reviewTargetId)
            } else if (reviewTargetType === 'framework') {
                selectedReviewTarget = frameworks.find(framework => framework.id === reviewTargetId)
            }
            setSelectedReviewTarget(selectedReviewTarget)
            setSelectedFramework(frameworks.find(framework => framework.id === frameworkId))
            onSelectSuccess && onSelectSuccess()
        } else {
            console.log('There are validation errors')
        }
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
                <Form.Label htmlFor='reviewTargetTypeSelect'>Review target type</Form.Label>
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
                    <option value=''>Select review target type</option>
                    <option key='subject' value='subject'>Subject</option>
                    <option key='framework' value='framework'>Framework</option>
                </Form.Select>
                {/* <Form.Text aria-describedby='reviewTargetTypeSelectHelp'>Select a subject to review</Form.Text> */}
            </Form.Group>
        </div>
        <div className='mb-3 col-md-4'>
            <Form.Group>
                <Form.Label htmlFor='reviewSubjectSelect'>Review target</Form.Label>
                <Form.Select
                    aria-label="Select a review target to review"
                    id='reviewTargetSelect'
                    aria-describedby='reviewTargetSelectHelp'
                    value={reviewTargetId}
                    onChange={({ target: { value } }) => setReviewTargetId(value)}
                    isValid={isValidated && isReviewTargetIdValid()}
                    isInvalid={isValidated && !isReviewTargetIdValid()}
                    required
                >
                    <option value=''>Select review target</option>
                    {reviewTargets.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </Form.Select>
                {/* <Form.Text aria-describedby='subjectSelectHelp'>Select a subject to review</Form.Text> */}
            </Form.Group>
            
        </div>
        <div className='mb-3 col-md-4'>
            <Form.Group>
                <Form.Label htmlFor='reviewFrameworkSelect'>Review framework</Form.Label>
                <Form.Select
                    aria-label="Select a subject to review"
                    id='reviewFrameworkSelect'
                    aria-describedby='frameworkSelectHelp'
                    value={frameworkId}
                    onChange={({ target: { value } }) => setFrameworkId(value)}
                    isValid={isValidated && isFrameworkIdValid()}
                    isInvalid={isValidated && !isFrameworkIdValid()}
                    required
                >
                    <option value=''>Select framework</option>
                    {frameworks.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </Form.Select>
                {/* <Form.Text aria-describedby='frameworkSelectHelp'>Select a framework to use for the review</Form.Text> */}
            </Form.Group>
        </div>
        <div className='col-12'>
            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                {continueButtonText}
            </Button>
        </div>
        </Form>
    )
}

export default ReviewCreateSelect
