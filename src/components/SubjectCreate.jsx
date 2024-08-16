import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const SubjectCreate = () => {
    const [subjectName, setSubjectName] = useState('')

    const handleNoteChange = (event) => {
        setSubjectName(event.target.value)
    }
    
    const addSubject = (event) => {
        event.preventDefault()
        // const subjectObject = {
        //   name: subjectName,
        // }
      
        // Todo add functionality for creating subjects
        // subjectService
        //   .create(subjectObject)
        //     .then(returnedSubject => {
        //     })
        // Todo add handlers for success and error
        // Display alerts as suitable
    }

    return (
        <>
            <h1>Add subject</h1>

            <Link to="/subjects">
                <button type="button" className="btn btn-primary mt-4">Back to subjects</button>
            </Link>

            <form className="mt-4" onSubmit={addSubject}>
                <div className="mb-3">
                    <label for="subjectName" className="form-label">Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="subjectName"
                        aria-describedby="subjectNameHelp"
                        value={subjectName}
                        onChange={handleNoteChange}
                    />
                    <div id="subjectNameHelp" className="form-text">A name for the review subject</div>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </>
    )
}

export default SubjectCreate
