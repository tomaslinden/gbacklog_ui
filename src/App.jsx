import { useState, useEffect } from 'react'
import subjectService from './services/subjects'
import './App.css'

function App() {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    subjectService
      .getAll()
      .then(subjects => {
        setSubjects(subjects)
      })
  }, [])
  
  return (
    <>
      Subjects:
      <ul>
        {subjects.map(subject => 
          <>Subject: {JSON.stringify(subject)}</>
        )}
      </ul>
    </>
  )
}

export default App
