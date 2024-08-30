import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const formFacetHandleFromName = name => {
    let handle = structuredClone(name)
    handle = handle.toLowerCase().trim()
    handle = handle.replace(/\s+/g,'-')
    handle = handle.replace(/[^0-9a-z\-]/gi, '')
    return handle
}

const FrameworkCreate = ({ frameworkService, mode }) => {

    const facetTemplate = { handle: '', facetName: '', description: '' }
    let defaultFacet = structuredClone(facetTemplate)
    defaultFacet.facetName = 'Facet #1'
    // defaultFacet.handle = formFacetHandleFromName(defaultFacet.facetName)

    const [frameworkName, setFrameworkName] = useState('')
    const [frameworkNameValidationError, setFrameworkNameValidationError] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [isFrameworkSuccess, setIsFrameworkSuccess] = useState(false)
    // Todo add handling for framework create error
    // const [isFrameworkError, setIsFrameworkError] = useState(false)
    const [facets, setFacets] = useState([defaultFacet])
    const [facetErrors, setFacetErrors] = useState({})

    const frameworkNameMaxLength = 50;
    
    useEffect(() => {
        if (mode === 'create') {
            // let defaultFacet = structuredClone(facetTemplate)
            // defaultFacet.handle = 'facet-1'
            // let facetsCopy = structuredClone(facets)
            // facetsCopy.push(defaultFacet)
            // setFacets(facetsCopy)
        } else if (mode === 'modify') {
            const { id } = params
            frameworkService
                .getById(id)
                .then(framework => {
                    setFrameworkName(framework.name);
                    // Todo update facets as well
                })
        }
    }, []) 

    const resetFacetErrors = () => {
        setFacetErrors({})
    }

    const handleFrameworkNameChange = event => {
        setFrameworkName(event.target.value)
    }

    const handleFrameworkFacetChange = (event, index, fieldName) => {
        const value = event.target.value;
        let facetsCopy = structuredClone(facets)
        facetsCopy[index][fieldName] = value;
        // facetsCopy[index].handle = formFacetHandleFromName(value)
        setFacets(facetsCopy)
    }

    const isFrameworkNameValid = () => {
        return frameworkNameValidationError === ''
    }

    const isFacetNameValid = (index) => {
        // The facet is valid if it is not set in the facetErrors or it is an empty string
        return facetErrors[index] === undefined || facetErrors[index]?.facetName === ''
    }

    const validateFacetName = (index) => {
        const frameworkNameLength = facets[index][fieldName].trim().length;
        let facetNameValidationError = '';
        if (frameworkNameLength == 0) {
            facetNameValidationError = 'Please provide a framework name'
        } else if (frameworkNameLength > frameworkNameMaxLength) {
            facetNameValidationError = `The framework name cannot exceed ${frameworkNameMaxLength} characters`
        }
        // Todo validate framework handles' uniqueness
        let facetsErrorsCopy = structuredClone(facetErrors)
        currentFacetErrorsCopy = facetsErrorsCopy[index]
        currentFacetErrorsCopy.facetName = facetNameValidationError;
        setFacetErrors(currentFacetErrorsCopy)
        return facetNameValidationError === ''
    }

    const validateFacets = () => {
        let isValid = true;
        facets.forEach((facet, index) => {
            isValid = isValid && validateFacetName(index)
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
        isValid = isValid
        setIsValidated(true);
        return isValid;
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        if (validateForm()) {
            if (mode === 'modify') {
                updateFramework()
            } else {
                createFramework()
            }
        } else {
            console.log('There are validation errors')
        }
    }

    const getObjectToUpsert = () => {
        return {
            name: frameworkName,
            facets: facets
        }
    }
    
    const createFramework = () => {
        console.log('createFramework', getObjectToUpsert())
        // frameworkService.create(getObjectToUpsert())
        //     .then(handleOnUpsertSuccess)
    }

    const updateFramework = () => {
        const { id } = params
        frameworkService.update(id, getObjectToUpsert())
            .then(handleOnUpsertSuccess)      
    }

    const handleOnUpsertSuccess = () => {
        setIsFrameworkSuccess(true)
        setTimeout(() => {
            setIsFrameworkSuccess(false)
            navigate('/frameworks')
        }, 2000)
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
        const defaultFacetNameLength = facetCopy.facetName.length;
        const defaultFacetNameWithoutNumber = facetCopy.facetName.substring(0, defaultFacetNameLength - 1);
        const numberOfFacets = facets.length + 1
        facetCopy.facetName = defaultFacetNameWithoutNumber + numberOfFacets
        // facetCopy.handle = formFacetHandleFromName(facetCopy.facetName)
        facetsCopy.push(facetCopy)
        setFacets(facetsCopy)
    }

    const deleteFacet = (event, index) => {
        event.preventDefault()
        resetFacetErrors() // Because facet indexes have changed
        let facetsCopy = structuredClone(facets)
        delete facetsCopy[index]
        setFacets(facetsCopy)
    }

    return (<>
        <h1>Create framework</h1>

        <Link to='/frameworks'>
            <button type='button' className='btn btn-primary mt-4'>Back to frameworks</button>
        </Link>

        {/* Add preview of the framework that is to be sent including facet handles */}

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
                        disabled={isFrameworkSuccess}
                    />
                    <div id='frameworkNameHelp' className='form-text'>A name for the framework</div>
                    {isFrameworkNameValid && <div className='invalid-feedback'>{frameworkNameValidationError}</div>}
                </div>

                <h2>Facets</h2>
                {facets.map(({ handle, facetName, description }, index) => (<div className='row' key={index}>
                    <div>Facet handle: <strong>{ handle }</strong> { facetName }(auto-generated from the facet's name)</div>
                    <div className='mb-4 col-md-4 mt-2'>
                        <label htmlFor='frameworkName' className='form-label'>A name for facet #1</label>
                        <input 
                            type='text'
                            className={'form-control ' + (isFacetNameValid(index) ? 'is-valid' : 'is-invalid')}
                            id={'framework-facet-' + index}
                            aria-describedby='frameworkNameHelp'
                            value={facetName}
                            onChange={(event) => {
                                handleFrameworkFacetChange(event, index, 'facetName')
                            }}
                            required
                            disabled={isFrameworkSuccess}
                        />
                        <div id='frameworkNameHelp' className='form-text'>A human-friendly name for facet #1</div>
                        {/* {isFrameworkNameValid && <div className='invalid-feedback'>{frameworkNameValidationError}</div>} */}
                    </div>
                    <div className='mb-4 col-md-4 mt-2'>
                        <label htmlFor='frameworkDescription' className='form-label'>Description for facet #1</label>
                        <input 
                            type='text'
                            // className={'form-control ' + (isFrameworkNameValid() ? 'is-valid' : 'is-invalid')}
                            className={'form-control is-valid'}
                            // id='frameworkName'
                            aria-describedby='frameworkDescriptionHelp'
                            // value={facets[index].description}
                            // onChange={() => handleFrameworkFacetChange(index, handle, 'description')}
                            required
                            // disabled={isFrameworkSuccess}
                        />
                        <div id='frameworkDescriptionHelp' className='form-text'>A description for facet #1</div>
                        {/* {isFrameworkNameValid && <div className='invalid-feedback'>{frameworkNameValidationError}</div>} */}
                    </div>
                    <div className='mb-4 col-md-4' style={{display: 'flex', alignItems: 'center'}}>
                        {/* Todo make delete facet work */}
                        <button className='btn btn-primary' onClick={(event) => {
                            deleteFacet(event, index)
                        }}>
                            Delete
                        </button>
                    </div>
                </div>))}

                {/* Todo: generate facets only on submit */}
                <div className='col-12'>
                    <button className='btn btn-primary' onClick={addFacet}>
                        Add facet
                    </button>
                </div>

                <div className='col-12 mt-5'>
                    <button className='btn btn-primary' type='submit' disabled={isFrameworkSuccess}>
                        {mode === 'modify' ? 'Modify draft framework' : 'Create draft framework'}
                    </button>
                </div>
            </div>
        </form>
    </>)
}

export default FrameworkCreate
