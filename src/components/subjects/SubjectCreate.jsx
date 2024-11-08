import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isValidMarkdown } from '../utilities'
import SubjectViewContents from './SubjectViewContents'

// Todo: Rename SubjectCreate to SubjectUpsert ?
const SubjectCreate = ({ subjectService, mode }) => {
    const [subjectName, setSubjectName] = useState('')
    const [subjectNameValidationError, setSubjectNameValidationError] = useState('')
    const [subjectDescription, setSubjectDescription] = useState('')
    const [subjectDescriptionValidationError, setSubjectDescriptionValidationError] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [isFormValid, setFormValid] = useState(false)
    const [isPreview, setPreview] = useState(false)
    const [isSubjectSuccess, setIsSubjectSuccess] = useState(false)
    // Todo add handling for subject create error
    const [isSubjectError, setIsSubjectError] = useState(false)

    const subjectNameMaxLength = 100; // Keep this in sync with the DB schema
    const subjectDescriptionMaxLength = 500; // Keep this in sync with the DB schema
    
    const navigate = useNavigate()

    let params = useParams();

    useEffect(() => {
        if (mode === 'modify') {
            const { id } = params
            subjectService
                .getById(id)
                .then(subject => {
                    setSubjectName(subject.name);
                    setSubjectDescription(subject.description);
                })
        }
    }, []) 

    const handleSubjectNameChange = (event) => {
        setSubjectName(event.target.value)
    }

    const handleSubjectDescriptionChange = (event) => {
        setSubjectDescription(event.target.value)
    }

    const isSubjectNameValid = () => {
        return subjectNameValidationError === ''
    }

    const isSubjectDescriptionValid = () => {
        return subjectDescriptionValidationError === ''
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

    const validateSubjectDescription = () => {
        const subjectDescriptionLength = subjectDescription.trim().length;
        let subjectDescriptionValidationError = '';
        if (subjectDescriptionLength == 0) {
            subjectDescriptionValidationError = 'Please provide a subject description'
        } else if (subjectDescriptionLength > subjectDescriptionMaxLength) {
            subjectDescriptionValidationError = `The subject name cannot exceed ${subjectDescriptionMaxLength} characters`
        } else if (!isValidMarkdown(subjectDescription)) {
            subjectDescriptionValidationError = `The subject description cannot contain markdown heading characters (i.e. "#" or "##")`
        }
        setSubjectDescriptionValidationError(subjectDescriptionValidationError);
        return subjectDescriptionValidationError === ''
    }

    const validateForm = () => {
        const isSubjectNameValid = validateSubjectName()
        const isSubjectDescriptionValid = validateSubjectDescription()
        setIsValidated(true);
        const isValid = isSubjectNameValid && isSubjectDescriptionValid;
        setFormValid(isValid)
        return isValid
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
            setPreview(true)
        } else {
            console.log('There are validation errors')
        }
    }
   
    const handleUpsertDraft = () => {
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
            name: subjectName,
            status: 'draft',
            description: subjectDescription
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

            {isPreview && <>
                <SubjectViewContents className='mt-5' name={subjectName} description={subjectDescription} />

                <div className='col-12'>
                    <button className='btn btn-primary mt-4' disabled={isSubjectSuccess || !isFormValid} onClick={handleUpsertDraft}>
                        {mode === 'modify' ? 'Modify draft' : 'Create draft'}
                    </button>
                </div>
            </>}

            <form className={getFormClass()} onSubmit={handleFormSubmit} noValidate>
                <div className='mb-3 col-md-6 has-validation'>
                    <label htmlFor='subjectName' className='form-label'>Name</label>
                    <input 
                        type='text'
                        className={'form-control ' + (isSubjectNameValid() ? 'is-valid' : 'is-invalid')}
                        id='subjectName'
                        aria-describedby='subjectNameHelp'
                        value={subjectName}
                        onChange={handleSubjectNameChange}
                        required
                        disabled={isSubjectSuccess}
                    />
                    <div id='subjectNameHelp' className='form-text'>A name for the review subject</div>
                    {isSubjectNameValid && <div className='invalid-feedback'>{subjectNameValidationError}</div>}
                </div>

                <div className='mb-3 col-md-6 has-validation'>
                    <label htmlFor='subjectDescription' className='form-label'>Description</label>
                    <textarea
                        className={'form-control ' + (isSubjectDescriptionValid() ? 'is-valid' : 'is-invalid')}
                        id='subjectDescription'
                        aria-describedby='subjectDescriptionHelp'
                        onChange={handleSubjectDescriptionChange}
                        value={subjectDescription}
                        required
                        disabled={isSubjectSuccess}
                    >
                    </textarea>
                    <div id='subjectDescriptionHelp' className='form-text'>A description for the review subject</div>
                    {!isSubjectDescriptionValid() && <div className='invalid-feedback'>{subjectDescriptionValidationError}</div>}
                </div>

                <div className='col-12'>
                    <button className='btn btn-primary' disabled={isSubjectSuccess}>
                        {isPreview ? 'Update preview' : 'Preview'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default SubjectCreate
