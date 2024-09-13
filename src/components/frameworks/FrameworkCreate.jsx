import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import FrameworkCreateForm from './FrameworkCreateForm'
import FrameworkPreview from './FrameworkPreview'

const FrameworkCreate = ({ frameworkService, mode }) => {
    const [isPreview, setIsPreview] = useState(false)
    const [frameworkId, setFrameworkId] = useState(null)
    const [frameworkName, setFrameworkName] = useState('')
    const [frameworkDescription, setFrameworkDescription] = useState('')
    const [facets, setFacets] = useState([])

    let params = useParams();

    useEffect(() => {
        if (mode === 'modify') {
            const { id } = params
            frameworkService
                .getById(id)
                .then(framework => {
                    const { name, description, facets } = framework
                    setFrameworkId(id)
                    setFrameworkName(name)
                    setFrameworkDescription(description)
                    setFacets(facets)
                })
        }
    }, []) 
    
    return (<>
        <h1>Create framework</h1>

        {isPreview && <FrameworkPreview {...{ 
            frameworkService,
            mode,
            frameworkId,
            frameworkName,
            frameworkDescription,
            facets,
            setIsPreview
        }} />}
        
        {!isPreview && <FrameworkCreateForm {...{ 
            mode,
            setIsPreview,
            frameworkName,
            setFrameworkName,
            frameworkDescription,
            setFrameworkDescription,
            facets,
            setFacets
        }} />}
    </>)
}

export default FrameworkCreate
