import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

// Todo: Rename SubjectCreate to SubjectUpsert ?
const SubjectCreate = ({ subjectService, mode }) => {
    const [subjectName, setSubjectName] = useState('')
    const [subjectNameValidationError, setSubjectNameValidationError] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [isSubjectSuccess, setIsSubjectSuccess] = useState(false)
    // Todo add handling for subject create error
    const [isSubjectError, setIsSubjectError] = useState(false)

    const subjectNameMaxLength = 100; // Keep this in sync with the DB schema
    
    const navigate = useNavigate()

    let params = useParams();

    useEffect(() => {
        if (mode === 'modify') {
            const { id } = params
            subjectService
                .getById(id)
                .then(subject => {
                    setSubjectName(subject.name);
                })
        }
    }, []) 

    const handleSubjectChange = (event) => {
        setSubjectName(event.target.value)
    }
    
    const isSubjectNameValid = () => {
        return subjectNameValidationError === ''
    }

    const validateSubjectName = () => {
        const subjectNameLength = subjectName.trim().length;
        let subjectNameValidationError = '';
        if (subjectNameLength == 0) {
            subjectNameValidationError = 'Please provide a subject name'
        } else if (subjectNameLength > subjectNameMaxLength) {
            subjectNameValidationError = `The subject name cannot exceed ${subjectNameMaxLength} characters`
        }
        setSubjectNameValidationError(subjectNameValidationError);
        return subjectNameValidationError === ''
    }

    const validateForm = () => {
        let isValid = true;
        isValid = isValid && validateSubjectName()
        setIsValidated(true);
        return isValid;
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
            if (mode === 'modify') {
                updateSubject()
            } else {
                createSubject()
            }
        } else {
            console.log('There are validation errors')
        }
    }
   
    const getObjectToUpsert = () => {
        return {
            name: subjectName
        }
    }

    const createSubject = () => {
        subjectService.create(getObjectToUpsert())
            .then(handleOnUpsertSuccess)
    }

    const updateSubject = () => {
        const { id } = params
        subjectService.update(id, getObjectToUpsert())
            .then(handleOnUpsertSuccess)      
    }

    const handleOnUpsertSuccess = () => {
        setIsSubjectSuccess(true)
        setTimeout(() => {
            setIsSubjectSuccess(false)
            navigate('/subjects')
        }, 2000)
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
            <h1>Create subject</h1>

            <Link to='/subjects'>
                <button type='button' className='btn btn-primary mt-4'>Back to subjects</button>
            </Link>

            {isSubjectSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Subject {mode === 'modify' ? 'modified' : 'created'} 
                </div>
            )}

            <form className={getFormClass()} onSubmit={handleFormSubmit} noValidate>
                <div className='mb-3 col-md-6'>
                    <label htmlFor='subjectName' className='form-label'>Name</label>
                    <input 
                        type='text'
                        className={'form-control ' + (isSubjectNameValid() ? 'is-valid' : 'is-invalid')}
                        id='subjectName'
                        aria-describedby='subjectNameHelp'
                        value={subjectName}
                        onChange={handleSubjectChange}
                        required
                        disabled={isSubjectSuccess}
                    />
                    <div id='subjectNameHelp' className='form-text'>A name for the review subject</div>
                    {isSubjectNameValid && <div className='invalid-feedback'>{subjectNameValidationError}</div>}
                </div>
                <div className='col-12'>
                    <button className='btn btn-primary' type='submit' disabled={isSubjectSuccess}>
                        {mode === 'modify' ? 'Modify draft' : 'Create draft'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default SubjectCreate
