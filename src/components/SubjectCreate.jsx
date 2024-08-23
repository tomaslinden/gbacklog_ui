import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SubjectCreate = ({ subjectService }) => {
    const [subjectName, setSubjectName] = useState('')
    const [subjectNameValidationError, setSubjectNameValidationError] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [isSubjectSuccess, setIsSubjectSuccess] = useState(false)
    // Todo add handling for subject create error
    const [isSubjectError, setIsSubjectError] = useState(false)

    const subjectNameMaxLength = 50;
    
    const navigate = useNavigate()

    const handleNoteChange = (event) => {
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

    const addSubject = (event) => {
        event.preventDefault()
        validateForm();
        if (validateForm()) {
            subjectService.create({
                name: subjectName
            }).then(returnedSubject => {
                setIsSubjectSuccess(true)
                setTimeout(() => {
                    setIsSubjectSuccess(false)
                    navigate('/subjects')
                }, 5000)
            })      
        } else {
            console.log('There are validation errors')
        }
        event.stopPropagation()
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
            <h1>Add subject</h1>

            <Link to='/subjects'>
                <button type='button' className='btn btn-primary mt-4'>Back to subjects</button>
            </Link>

            {isSubjectSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                    Subject created
                </div>
            )}

            <form className={getFormClass()} onSubmit={addSubject} noValidate>
                <div className='mb-3 col-md-6'>
                    <label htmlFor='subjectName' className='form-label'>Name</label>
                    <input 
                        type='text'
                        className={'form-control ' + (isSubjectNameValid() ? 'is-valid' : 'is-invalid')}
                        id='subjectName'
                        aria-describedby='subjectNameHelp'
                        value={subjectName}
                        onChange={handleNoteChange}
                        required
                        disabled={isSubjectSuccess}
                    />
                    <div id='subjectNameHelp' className='form-text'>A name for the review subject</div>
                    {isSubjectNameValid && <div className='invalid-feedback'>{subjectNameValidationError}</div>}
                </div>
                <div className='col-12'>
                    <button className='btn btn-primary' type='submit' disabled={isSubjectSuccess}>Create</button>
                </div>
            </form>
        </>
    )
}

export default SubjectCreate
