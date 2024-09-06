import { useState } from 'react'
import { Link } from 'react-router-dom';
import FrameworkCreateForm from './FrameworkCreateForm'
import FrameworkPreview from './FrameworkPreview'

const FrameworkCreate = ({ frameworkService, mode }) => {

    const [isPreview, setIsPreview] = useState(false)
    const [frameworkName, setFrameworkName] = useState('')
    const [frameworkDescription, setFrameworkDescription] = useState('')
    const [facets, setFacets] = useState([])

    return (<>
        <h1>Create framework</h1>

        <Link to='/frameworks'>
            <button type='button' className='btn btn-primary mt-4'>Back to frameworks</button>
        </Link>

        {isPreview && <FrameworkPreview {...{ frameworkService, frameworkName, frameworkDescription, facets, setIsPreview }} />}
        
        {!isPreview && <FrameworkCreateForm {...{ 
            frameworkService,
            mode,
            setIsPreview,
            frameworkName,
            setFrameworkName,
            frameworkDescription,
            setFrameworkDescription,
            facets,
            setFacets,
        }} />}
    </>)
}

export default FrameworkCreate
