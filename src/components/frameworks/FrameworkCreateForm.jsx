import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DescriptionInputInstructions from '../common/DescriptionInputInstructions'
import { isValidMarkdown } from '../utilities'

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

    const frameworkAndFacetNameMaxLength = 50;
    const frameworkFacetDescriptionMaxLength = 500;

    const facetTemplate = { handle: '', name: '', description: '' }
    let defaultFacet = structuredClone(facetTemplate)
    defaultFacet.name = ''

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
        return frameworkDescriptionValidationError === ''
    }   

    const isFacetPropertyValid = (index, property) => {
        // The facet is valid if it is not set in the facetErrors or it is an empty string
        // Todo fix validation of facet errors (seems to work in an illogical manner)
        const error = getFacetPropertyValidationError(index, property)
        return error === undefined || error === ''
    }

    const getFacetPropertyValidationError = (index, property) => {
        // The facet is valid if it is not set in the facetErrors or it is an empty string
        // Todo fix validation of facet errors (seems to work in an illogical manner)
        return facetErrors[index]?.[property]
    }

    const validateFacetName = (index) => {
        const frameworkFacetNameLength = facets[index].name.trim().length;
        let facetNameValidationError = '';
        if (frameworkFacetNameLength == 0) {
            facetNameValidationError = 'Please provide a facet name'
        } else if (frameworkFacetNameLength > frameworkAndFacetNameMaxLength) {
            facetNameValidationError = `The framework name cannot exceed ${frameworkAndFacetNameMaxLength} characters`
        }
        return facetNameValidationError
    }

    const validateFacetDescription = (index) => {
        const facetDescription = facets[index].description;
        const facetDescriptionLength = facetDescription.trim().length;
        let facetDescriptionValidationError = '';
        if (facetDescriptionLength == 0) {
            facetDescriptionValidationError = 'Please provide a facet description'
        } else if (facetDescriptionLength > frameworkFacetDescriptionMaxLength) {
            facetDescriptionValidationError = `The facet description cannot exceed ${frameworkAndFacetNameMaxLength} characters`
        } else if (!isValidMarkdown(facetDescription)) {
            facetDescriptionValidationError = `The facet description cannot contain markdown heading characters (i.e. "#" or "##")`
        }
        return facetDescriptionValidationError
    }

    const validateFacets = () => {
        let facetsErrorsCopy = {}
        facets.forEach((facet, index) => {
            let facetNameError = validateFacetName(index)
            let facetDescriptionError = validateFacetDescription(index)
            if (facetNameError !== '' || facetDescriptionError !== '') {
                facetsErrorsCopy[index] = {}
            }
            if (facetNameError !== '') {
                facetsErrorsCopy[index].name = facetNameError
            }
            if (facetDescriptionError !== '') {
                facetsErrorsCopy[index].description = facetDescriptionError
            }
        })
        setFacetErrors(facetsErrorsCopy)
        return Object.keys(facetsErrorsCopy).length === 0
    }

    const validateFrameworkName = () => {
        const frameworkNameLength = frameworkName.trim().length;
        let frameworkNameValidationError = '';
        if (frameworkNameLength == 0) {
            frameworkNameValidationError = 'Please provide a framework name'
        } else if (frameworkNameLength > frameworkAndFacetNameMaxLength) {
            frameworkNameValidationError = `The framework name cannot exceed ${frameworkAndFacetNameMaxLength} characters`
        }
        setFrameworkNameValidationError(frameworkNameValidationError);
        return frameworkNameValidationError === ''
    }

    const validateFrameworkDescription = () => {
        const frameworkDescriptionLength = frameworkDescription.trim().length;
        let frameworkDescriptionValidationError = '';
        if (frameworkDescriptionLength == 0) {
            frameworkDescriptionValidationError = 'Please provide a framework description'
        } else if (frameworkDescriptionLength > frameworkAndFacetNameMaxLength) {
            frameworkDescriptionValidationError = `The framework description cannot exceed ${frameworkAndFacetNameMaxLength} characters`
        } else if (!isValidMarkdown(frameworkDescription)) {
            frameworkDescriptionValidationError = `The framework description cannot contain markdown heading characters (i.e. "#" or "##")`
        }
        setFrameworkDescriptionValidationError(frameworkDescriptionValidationError);
        return frameworkDescriptionValidationError === ''
    }

    const validateForm = () => {
        let isValid = true;
        const isFrameworkNameValid = validateFrameworkName()
        const isFrameworkDescriptionValid = validateFrameworkDescription()
        const isFacetsValid = validateFacets()
        isValid = isFrameworkNameValid && isFrameworkDescriptionValid && isFacetsValid 
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
        facetCopy.name = ''
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
        <DescriptionInputInstructions type='framework' className='mt-5' />

        <form className={getFormClass()} onSubmit={handleFormSubmit} noValidate>
            <div className='container mt-4'>
                <div className='mb-3 col-md-6 has-validation'>
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
                    {(!isFrameworkNameValid()) && <div className='invalid-feedback'>{frameworkNameValidationError}</div>}
                </div>

                <div className='mb-3 col-md-6 has-validation'>
                    <label htmlFor='frameworkDescription' className='form-label'>Framework description</label>
                    <textarea
                        className={'form-control ' + (isFrameworkDescriptionValid() ? 'is-valid' : 'is-invalid')}
                        id='frameworkDescription'
                        aria-describedby='frameworkDescriptionHelp'
                        onChange={handleFrameworkDescriptionChange}
                        value={frameworkDescription}
                        required
                    >
                    </textarea>
                    <div id='frameworkDescriptionHelp' className='form-text'>A description for the framework</div>
                    {(!isFrameworkDescriptionValid()) && <div className='invalid-feedback'>{frameworkDescriptionValidationError}</div>}
                    {/* Add displaying of characters left. Fetch these from the backend. */}
                </div>

                <h2>Facets</h2>
                {/* Todo add counter for facets so the numbering is correct.
                How to reproduce: remove a facet, the re-add one -> the numbering is incorrect.
                This bug also affects framework preview. */}
                {facets.map(({ name, description }, index) => (
                    <div className='row' key={index}>
                        <div className='mb-4 col-md-4 mt-2 has-validation'>
                            <label htmlFor='frameworkName' className='form-label'>A name for facet #{index + 1}</label>
                            <input 
                                type='text'
                                className={'form-control ' + (isFacetPropertyValid(index, 'name') ? 'is-valid' : 'is-invalid')}
                                id={'framework-facet-name-' + index}
                                aria-describedby={'framework-facet-name-help-' + index}
                                value={name}
                                onChange={(event) => {
                                    handleFrameworkFacetChange(event, index, 'name')
                                }}
                                required
                            />
                            <div id={'framework-facet-name-help-' + index} className='form-text'>A name for facet #{index + 1}</div>
                            {!isFacetPropertyValid(index, 'name') && <div className='invalid-feedback'>{getFacetPropertyValidationError(index, 'name')}</div>}
                            </div>
                        {/* Todo: make handles editable (along with a "generate" button) */}
                        <div className='mb-4 col-md-4 mt-2 has-validation'>
                            <label htmlFor='frameworkDescription' className='form-label'>Description for facet #{index + 1}</label>
                            <textarea
                                className={'form-control ' + (isFacetPropertyValid(index, 'description') ? 'is-valid' : 'is-invalid')}
                                id={'framework-facet-description-' + index}
                                aria-describedby={'framework-facet-description-help-' + index}
                                onChange={(event) => {
                                    handleFrameworkFacetChange(event, index, 'description')
                                }}
                                value={description}
                                required
                            >
                            </textarea>

                            <div id={'framework-facet-description-help-' + index} className='form-text'>A description for facet #{index + 1}</div>
                            {!isFacetPropertyValid(index, 'description') && <div className='invalid-feedback'>{getFacetPropertyValidationError(index, 'description')}</div>}
                            {/* Add displaying of characters left. Fetch these from the backend. */}
                        </div>
                        <div className='mb-4 col-md-4 mt-3' style={{display: 'flex', alignItems: 'center'}}>
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
