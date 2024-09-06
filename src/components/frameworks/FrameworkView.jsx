import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import FrameworkDetails from './FrameworkDetails';

const FrameworkView = ({ frameworkService }) => {
    const [framework, setFramework] = useState({})
    const [isLoaded, setLoaded] = useState(false)

    let params = useParams();

    useEffect(() => {
        const { id } = params
        frameworkService
            .getById(id)
            .then(receivedFramework => {
                setFramework(receivedFramework);
                setLoaded(true)
            })
    }, []) 

    return (<>{isLoaded &&<>
        <h1>View framework</h1>

        <Link to='/frameworks'>
            <button type='button' className='btn btn-primary mt-4'>Back to frameworks</button>
        </Link>

        <FrameworkDetails
            frameworkName={framework.name}
            frameworkDescription={framework.description}
            facets={framework.facets}
        />
    </>}</>)
}

export default FrameworkView
