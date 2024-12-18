import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import FrameworkCreateForm from './FrameworkCreateForm'
import FrameworkPreview from './FrameworkPreview'
import PageHeadingAndButtons from '../common/PageHeadingAndButtons'

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
        <PageHeadingAndButtons heading='Create framework'>
            <Link to='/frameworks'>
                <button type='button' className='btn btn-primary mt-4'>Back to frameworks</button>
            </Link>
        </PageHeadingAndButtons>

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
