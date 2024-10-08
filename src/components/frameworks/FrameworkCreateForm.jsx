import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const trimAndRemoveDuplicateWhitespace = oldString => {
    let newString = structuredClone(oldString).trim()
    newString = newString.replace(/\s+/g,' ')
    return newString
}

const formFacetHandleFromName = name => {
    let handle = structuredClone(name).toLowerCase()
    handle = trimAndRemoveDuplicateWhitespace(handle)
    handle = handle.replace(/\s+/g,'-')
    handle = handle.replace(/[^0-9a-z\-]/gi, '')
    return handle
}

// Todo refactor framework create form to use react bootsrap in stead of native bootstrap for forms
// This might fix the illogical way facet validation currently works
// (it is af it works the other way around, i.e. is valid containing false means that is valid)

const FrameworkCreateForm = ({ 
    mode,
    setIsPreview,
    frameworkName,
    setFrameworkName,
    frameworkDescription,
    setFrameworkDescription,
    facets,
    setFacets
}) => {
    const [frameworkNameValidationError, setFrameworkNameValidationError] = useState('')
    const [frameworkDescriptionValidationError, setFrameworkDescriptionValidationError] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [facetErrors, setFacetErrors] = useState({})

    const frameworkNameMaxLength = 50;

    const facetTemplate = { handle: '', name: '', description: '' }
    let defaultFacet = structuredClone(facetTemplate)
    defaultFacet.name = 'Facet #1'

    useEffect(() => {
        if (mode === 'create') {
            if (facets.length === 0) {
                setFacets([ defaultFacet ])
            }
        }
    }, []) 

    const resetFacetErrors = () => {
        setFacetErrors({})
    }

    const handleFrameworkNameChange = event => {
        setFrameworkName(event.target.value)
    }

    const handleFrameworkDescriptionChange = event => {
        setFrameworkDescription(event.target.value)
    }
    
    const handleFrameworkFacetChange = (event, index, fieldName) => {
        const value = event.target.value;
        let facetsCopy = structuredClone(facets)
        facetsCopy[index][fieldName] = value;
        setFacets(facetsCopy)
    }

    const isFrameworkNameValid = () => {
        // Todo add check for max length
        return frameworkNameValidationError === ''
    }

    const isFrameworkDescriptionValid = () => {
        // Todo add check for max length
        return true
    }   

    const isFacetNameValid = (index) => {
        // The facet is valid if it is not set in the facetErrors or it is an empty string
        // Todo fix validation of facet errors (seems to work in an illogical manner)
        return facetErrors[index] === undefined || facetErrors[index]?.name === ''
    }

    const addFacetValidationError = (index, errorMessage) => {
        let facetsErrorsCopy = structuredClone(facetErrors)
        facetsErrorsCopy[index] = errorMessage
        setFacetErrors(facetsErrorsCopy)
    }

    const validateFacetName = (index) => {
        const frameworkNameLength = facets[index].name.trim().length;
        let facetNameValidationError = '';
        if (frameworkNameLength == 0) {
            facetNameValidationError = 'Please provide a framework name'
        } else if (frameworkNameLength > frameworkNameMaxLength) {
            facetNameValidationError = `The framework name cannot exceed ${frameworkNameMaxLength} characters`
        }
        addFacetValidationError(index, facetNameValidationError)
        return facetNameValidationError === ''
    }

    const validateFacets = () => {
        let isValid = true;
        let localFacetHandles = {}
        facets.forEach((facet, index) => {
            isValid = isValid && validateFacetName(index)
            const { name } = facet
            if (localFacetHandles.hasOwnProperty(name)) {
                isValid = false // A framework must have unique facet handles
                addFacetValidationError(localFacetHandles[name], 'Facet names cannot be duplicates')
                addFacetValidationError(index, 'Facet names cannot be duplicates')
            } else {
                localFacetHandles[name] = index
            }
        })
        return isValid
    }

    const validateFrameworkName = () => {
        const frameworkNameLength = frameworkName.trim().length;
        let frameworkNameValidationError = '';
        if (frameworkNameLength == 0) {
            frameworkNameValidationError = 'Please provide a framework name'
        } else if (frameworkNameLength > frameworkNameMaxLength) {
            frameworkNameValidationError = `The framework name cannot exceed ${frameworkNameMaxLength} characters`
        }
        setFrameworkNameValidationError(frameworkNameValidationError);
        return frameworkNameValidationError === ''
    }
    
    const validateForm = () => {
        let isValid = true;
        isValid = isValid && validateFrameworkName()
        isValid = isValid && validateFacets()
        // Todo add test for testing for facet name and handle uniqueness
        // Todo add test for checking that there is at least one facet (and add a maximum number of facets also to the Mongoose schema)
        setIsValidated(true);
        return isValid;
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
            addHandlesToFacets()
            setIsPreview(true)
        } else {
            console.log('There are validation errors')
        }
    }

    const addHandlesToFacets = () => {
        const newFacets = facets.map((facet) => {
            let newFacet = structuredClone(facet)
            newFacet.name = trimAndRemoveDuplicateWhitespace(facet.name);
            newFacet.handle = formFacetHandleFromName(facet.name)
            return newFacet
        })
        setFacets(newFacets)
    }
    
    const getFormClass = () => {
        let formClass = 'mt-4 row g-3 needs-validation'
        if (isValidated) {
            formClass += ' was-validated'
        }
        return formClass
    }

    const addFacet = event => {
        event.preventDefault()
        let facetsCopy = structuredClone(facets)
        let facetCopy = structuredClone(defaultFacet)
        const defaultFacetNameLength = facetCopy.name.length;
        const defaultFacetNameWithoutNumber = facetCopy.name.substring(0, defaultFacetNameLength - 1);
        const numberOfFacets = facets.length + 1
        facetCopy.name = defaultFacetNameWithoutNumber + numberOfFacets
        facetsCopy.push(facetCopy)
        setFacets(facetsCopy)
    }

    const deleteFacet = (event, index) => {
        event.preventDefault()
        resetFacetErrors() // Because facet indices have changed
        let facetsCopy = structuredClone(facets)
        facetsCopy.splice(index, 1)
        setFacets(facetsCopy)
    }

    return (<>
        <Link to='/frameworks'>
            <button type='button' className='btn btn-primary mt-4'>Back to frameworks</button>
        </Link>

        <form className={getFormClass()} onSubmit={handleFormSubmit} noValidate>
            <div className='container mt-4'>
                <div className='mb-3 col-md-6'>
                    <label htmlFor='frameworkName' className='form-label'>Framework name</label>
                    <input 
                        type='text'
                        className={'form-control ' + (isFrameworkNameValid() ? 'is-valid' : 'is-invalid')}
                        id='frameworkName'
                        aria-describedby='frameworkNameHelp'
                        value={frameworkName}
                        onChange={handleFrameworkNameChange}
                        required
                    />
                    <div id='frameworkNameHelp' className='form-text'>A name for the framework</div>
                    {isFrameworkNameValid && <div className='invalid-feedback'>{frameworkNameValidationError}</div>}
                </div>

                <div className='mb-3 col-md-6'>
                    <label htmlFor='frameworkDescription' className='form-label'>Framework description</label>
                    <textarea
                        className={'form-control ' + (isFrameworkDescriptionValid() ? 'is-valid' : 'is-invalid')}
                        id='frameworkDescription'
                        aria-describedby='frameworkDescriptionHelp'
                        onChange={handleFrameworkDescriptionChange}
                        value={frameworkDescription}
                    >
                        
                    </textarea>
                    <div id='frameworkDescriptionHelp' className='form-text'>A description for the framework</div>
                    {isFrameworkDescriptionValid && <div className='invalid-feedback'>{frameworkDescriptionValidationError}</div>}
                    {/* Add displaying of characters left. Fetch these from the backend. */}
                </div>

                <h2>Facets</h2>
                {/* Todo add counter for facets so the numbering is correct.
                How to reproduce: remove a facet, the re-add one -> the numbering is incorrect.
                This bug also affects framework preview. */}
                {facets.map(({ name, description }, index) => (
                    <div className='row' key={index}>
                        <div className='mb-4 col-md-4 mt-2'>
                            <label htmlFor='frameworkName' className='form-label'>A name for facet #{index + 1}</label>
                            <input 
                                type='text'
                                className={'form-control ' + (isFacetNameValid(index) ? 'is-valid' : 'is-invalid')}
                                id={'framework-facet-' + index}
                                aria-describedby='frameworkNameHelp'
                                value={name}
                                onChange={(event) => {
                                    handleFrameworkFacetChange(event, index, 'name')
                                }}
                                required
                            />
                            <div id='frameworkNameHelp' className='form-text'>A human-friendly name for facet #{index + 1}</div>
                        </div>
                        {/* Todo: make handles editable (along with a "generate" button) */}
                        <div className='mb-4 col-md-4 mt-2'>
                            <label htmlFor='frameworkDescription' className='form-label'>Description for facet #{index + 1}</label>
                            <input 
                                type='text'
                                className={'form-control is-valid'}
                                aria-describedby='frameworkDescriptionHelp'
                                value={description}
                                onChange={(event) => {
                                    handleFrameworkFacetChange(event, index, 'description')
                                }}
                            />
                            <div id='frameworkDescriptionHelp' className='form-text'>A description for facet #{index + 1}</div>
                            {/* Add displaying of characters left. Fetch these from the backend. */}
                        </div>
                        <div className='mb-4 col-md-4 mt-3' style={{display: 'flex', alignItems: 'center'}}>
                            {/* Todo make delete facet work */}
                            <button className='btn btn-primary' onClick={(event) => {
                                deleteFacet(event, index)
                            }}>
                                Delete facet
                            </button>
                        </div>
                    </div>
                ))}

                <div className='col-12'>
                    <button className='btn btn-primary' onClick={addFacet}>
                        Add facet
                    </button>
                </div>

                <div className='col-12 mt-5'>
                    <button className='btn btn-primary' type='submit'>
                        Preview framework
                    </button>
                </div>
            </div>
        </form>
    </>)
}

export default FrameworkCreateForm
