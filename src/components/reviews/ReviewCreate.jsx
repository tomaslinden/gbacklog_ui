import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ReviewCreate = ({ subjectService, frameworkService, reviewService, mode }) => {
    const [subjects, setSubjects] = useState([])
    const [frameworks, setFrameworks] = useState([])
    const [subjectId, setSubjectId] = useState('')
    const [frameworkId, setFrameworkId] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    // const [isReviewSuccess, setIsReviewSuccess] = useState(false)

    // const navigate = useNavigate()

    // let params = useParams();

    useEffect(() => {
        subjectService
            .getAll()
            .then(subjects => setSubjects(subjects))

        frameworkService
            .getAll()
            .then(frameworks => setFrameworks(frameworks))
    }, []) 
  
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
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
            // if (mode === 'modify') {
            //     // updateReview()
            // } else {
            //     // createReview()
            // }
            console.log('Proceed to create review', subjectId, frameworkId)
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
        <>
            <h1>Create review</h1>

            <Link to='/reviews'>
                <button type='button' className='btn btn-primary mt-4'>Back to reviews</button>
            </Link>

            {/* {isReviewSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Review {mode === 'modify' ? 'modified' : 'created'} 
                </div>
            )} */}

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
                        <Form.Text aria-describedby='subjectSelectHelp'>Select a subject to review</Form.Text>
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
                        <Form.Text aria-describedby='frameworkSelectHelp'>Select a framework to use for the review</Form.Text>
                    </Form.Group>
                </div>
                <div className='col-12'>
                    <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                        Continue to review
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default ReviewCreate
