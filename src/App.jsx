import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Subjects from './components/Subjects'
import SubjectCreate from './components/SubjectCreate'
import prodSubjectService from './services/subjects';
import devSubjectService from './services/mockSubjects';

let subjectService;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  subjectService = devSubjectService;
} else {
  subjectService = prodSubjectService;
}

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="main-content">
        <BrowserRouter>
          <Routes>
              <Route index element={<Subjects {...{ subjectService }} />} />
              <Route path="/subjects" element={<Subjects {...{ subjectService }} />} />
              <Route path="/createSubject" element={<SubjectCreate />} {...{ subjectService }} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
