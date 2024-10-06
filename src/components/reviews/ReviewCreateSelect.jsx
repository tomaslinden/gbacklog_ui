import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ReviewCreateSelect = ({ 
    subjectService,
    frameworkService,
    subjectId,
    setSubjectId,
    frameworkId,
    setFrameworkId,
    setSelectedSubject,
    setSelectedFramework,
    // setPhase
    onSelectSuccess,
    continueButtonText,
    type
}) => {
    const [subjects, setSubjects] = useState([])
    const [frameworks, setFrameworks] = useState([])
    const [isValidated, setIsValidated] = useState(false)

    useEffect(() => {
        subjectService
            .getAllFinal()
            .then(subjects => setSubjects(subjects))

        frameworkService
            .getAll()
            .then(frameworks => setFrameworks(frameworks))
    }, []) 

    useEffect(() => {
        if(type === 'searchReviews' && subjectId?.length > 0 && frameworkId?.length > 0) {
            console.log('triggered')
            handleFormSubmit()
        }
    }, [subjectId, frameworkId])

    const isSubjectIdValid = () => {
        return subjectId !== ''
    }

    const isReviewIdValid = () => {
        return frameworkId !== ''
    }

    const validateForm = () => {
        let isValid = true;
        isValid = isValid && isSubjectIdValid()
        isValid = isValid && isReviewIdValid()
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
            setSelectedSubject(subjects.find(subject => subject.id === subjectId))
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
        <div className='mb-3 col-md-6'>
            <Form.Group>
                <Form.Label htmlFor='reviewSubjectSelect'>Review subject</Form.Label>
                <Form.Select
                    aria-label="Select a subject to review"
                    id='reviewSubjectSelect'
                    aria-describedby='subjectSelectHelp'
                    value={subjectId}
                    onChange={({ target: { value } }) => setSubjectId(value)}
                    isValid={isValidated && isSubjectIdValid()}
                    isInvalid={isValidated && !isSubjectIdValid()}
                    required
                >
                    <option value=''>Select subject</option>
                    {subjects.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </Form.Select>
                {/* <Form.Text aria-describedby='subjectSelectHelp'>Select a subject to review</Form.Text> */}
            </Form.Group>
        </div>
        <div className='mb-3 col-md-6'>
            <Form.Group>
                <Form.Label htmlFor='reviewFrameworkSelect'>Review framework</Form.Label>
                <Form.Select
                    aria-label="Select a subject to review"
                    id='reviewFrameworkSelect'
                    aria-describedby='frameworkSelectHelp'
                    value={frameworkId}
                    onChange={({ target: { value } }) => setFrameworkId(value)}
                    isValid={isValidated && isReviewIdValid()}
                    isInvalid={isValidated && !isReviewIdValid()}
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
