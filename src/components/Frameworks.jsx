import { Link } from "react-router-dom";

const Frameworks = () => {
    return (
        <>
            <h1>Review frameworks</h1>

            <Link to="/createFramework">
                <button type="button" className="btn btn-primary mt-4">Add framework</button>
            </Link>
            
            <ul className="list-group mt-4">
                <li className="list-group-item">
                    <div class="d-flex justify-content-between">
                        <div className="d-flex align-items-center">My review framework</div>
                        <div className="p-2"></div>
                        <div>
                            <button className="btn btn-primary me-md-2" style={{position: 'relative', left:"-4px"}} type="button">Modify</button>
                            <button className="btn btn-primary" type="button">Delete</button>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Frameworks
