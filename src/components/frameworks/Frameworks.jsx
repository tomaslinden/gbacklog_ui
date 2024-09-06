import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Frameworks = ({ frameworkService }) => {
    const [frameworks, setFrameworks] = useState([])

    useEffect(() => {
        getAllFrameworks()
    }, []) 

    const getAllFrameworks = () => {
        console.log('frameworkService', frameworkService)
        frameworkService
            .getAll()
            .then(frameworks => {
                setFrameworks(frameworks)
            })
    }
    
    return (
        <>
            <h1>Review frameworks</h1>

            <Link to="/createFramework">
                <button type="button" className="btn btn-primary mt-4">Add framework</button>
            </Link>
            
            <ul className="list-group mt-4">
                {frameworks.map(framework => 
                    <li key={framework.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">{framework.name}</div>
                            <div className="p-2"></div>
                            <div>
                                {/* <Link to={`/modifySubject/${framework.id}`}>
                                    <button className="btn btn-primary me-md-2"
                                        style={{position: 'relative', left:"-4px"}}
                                        type="button">
                                        Modify
                                    </button>
                                </Link> */}

                                {/* <button className="btn btn-primary" type="button"
                                    onClick={() => {
                                        setSubjectSelectedForDeletion(subject)
                                        setShowSubjectDeleteWarning(true)
                                        window.scrollTo(0, 0)
                                    }}
                                    disabled={isSubjectDeleteSuccess}
                                >Delete</button> */}
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Frameworks
