import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import SubjectViewContents from './SubjectViewContents'

const SubjectView = ({ subjectService }) => {
    const [subject, setSubject] = useState({})
    const [isLoaded, setLoaded] = useState(false)

    const { name, description } = subject

    let params = useParams();
    const { id } = params

    useEffect(() => {
        subjectService
            .getById(id)
            .then(receivedSubject => {
                setSubject(receivedSubject);
                setLoaded(true)
            })
    }, []) 

    return (<>{isLoaded &&<>
        <h1>View subject</h1>

        <Link to='/subjects'>
            <button type='button' className='btn btn-primary mt-4'>View all subjects</button>
        </Link>

        <SubjectViewContents className='mt-4' {...{ name, description }} />

        <Link to={`/search/${id}`}>
            <button type='button' className='btn btn-primary mt-4'>Search for subject</button>
        </Link>
    </>}</>)
}

export default SubjectView
