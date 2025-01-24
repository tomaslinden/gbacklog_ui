import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

const SearchResults = ({ searchResults }) => {
    const navigate = useNavigate();
  
    return (<>
        <h2 className='mt-4'>Subjects</h2>
        {searchResults?.subjects?.length > 0 && (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Last updated</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults?.subjects?.map((subject) => {
                        const {id, name, status, updatedAt} = subject
                        return(
                            <tr
                                key={id}
                                className='clickable'
                                onClick={() => navigate(`/subject/${id}`)}
                                role="button"
                            >
                                <td>{name}</td>
                                <td>{status}</td>
                                <td>{updatedAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
        {searchResults?.subjects?.length === 0 && <>
            No subjects found
        </>}

        <h2 className='mt-4'>Frameworks</h2>
        {searchResults?.frameworks?.length > 0 && (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Last updated</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults?.frameworks?.map((framework) => {
                        const {id, name, status, updatedAt} = framework
                        return(
                            <tr
                                key={id}
                                className='clickable'
                                onClick={() => navigate(`/framework/${id}`)}
                                role="button"
                            >
                                <td>{name}</td>
                                <td>{status}</td>
                                <td>{updatedAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
        {searchResults?.frameworks?.length === 0 && <>
            No frameworks found
        </>}

        <h2 className='mt-4'>Reviews</h2>
        {searchResults?.reviews?.length > 0 && (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Target type</th>
                        <th>Target name</th>
                        <th>Framework name</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults?.reviews?.map((reviews) => {
                        const {
                            id,
                            targetType,
                            subjectTarget,
                            frameworkTarget,
                            createdAt,
                            updatedAt,
                            reviewFramework
                        } = reviews
                        return(
                            <tr
                                className='clickable'
                                key={id}
                                onClick={() => navigate(`/review/${id}`)}
                                role="button"
                            >
                                <td>{targetType}</td>
                                <td>{targetType === 'subject' ?
                                        subjectTarget?.name : frameworkTarget?.name
                                }</td>
                                <td>{reviewFramework?.name}</td>
                                <td>{createdAt}</td>
                                <td>{updatedAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
        {searchResults?.reviews?.length === 0 && <>
            No reviews found
        </>}
    </>)
}

export default SearchResults
