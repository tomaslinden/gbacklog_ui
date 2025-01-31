import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import FrameworkDetails from './FrameworkDetails';
import { convertVerdictPropertiesToString } from '../utilities'

const FrameworkView = ({ frameworkService }) => {
    const [framework, setFramework] = useState({})
    const [isLoaded, setLoaded] = useState(false)

    let params = useParams();
    const { id } = params

    useEffect(() => {
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
            frameworkNumericVerdictType={framework.verdictType}
            frameworkNumericVerdictProperties={convertVerdictPropertiesToString(framework.verdictProperties)}
            frameworkStatus={framework.status}
            facets={framework.facets}
        />

        <Link to={`/search/${id}`}>
            <button type='button' className='btn btn-primary mt-4'>Search with framework</button>
        </Link>

        <Link to={`/createReview?reviewTargetType=framework&reviewTargetId=${id}`}>
            <button type='button' className='btn btn-primary mt-4 ms-2'>Review this framework</button>
        </Link>
        <Link to={`/createReview?frameworkId=${id}`}>
            <button type='button' className='btn btn-primary mt-4 ms-2'>Write a review using this framework</button>
        </Link>
    </>}</>)
}

export default FrameworkView
