import Table from 'react-bootstrap/Table';

const SearchResults = ({ searchResults }) => {
    return (<>
        <h2>Subjects</h2>
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
                            <tr key={id}>
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

        <h2>Frameworks</h2>
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
                            <tr key={id}>
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

        <h2>Reviews</h2>
        {searchResults?.reviews?.length > 0 && (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Target type</th>
                        <th>Target id</th>
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
                            targetId,
                            createdAt,
                            updatedAt,
                            reviewFramework
                        } = reviews
                        return(
                            <tr key={id}>
                                <td>{targetType}</td>
                                <td>{targetId}</td>
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
