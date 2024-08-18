import { Link } from "react-router-dom";

const Frameworks = () => {
    return (
        <>
            <h1>Reviews of &lt;subject&gt; through review framework &lt;framework&gt;</h1>

            <Link to="/createReview">
                <button type="button" className="btn btn-primary mt-4">Create review</button>
            </Link>
            
            <ul className="list-group mt-4">
                <li className="list-group-item">
                    <div class="d-flex justify-content-between">
                        <div className="d-flex align-items-center">My review</div>
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
