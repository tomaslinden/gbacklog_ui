import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Subjects from './components/Subjects'
import SubjectCreate from './components/SubjectCreate'
import Frameworks from './components/Frameworks'
import Reviews from './components/Reviews'
import prodSubjectService from './services/subjects';
import devSubjectService from './services/mockSubjects';

let subjectService;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  subjectService = devSubjectService;
} else {
  subjectService = prodSubjectService;
}

// Enable this to use production MongoDB during development
// subjectService = prodSubjectService;

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <div className="main-content mt-4">
            <Routes>
                <Route index element={<Subjects {...{ subjectService }} />} />
                <Route path="/subjects" element={<Subjects {...{ subjectService }} />} />
                <Route path="/createSubject" element={<SubjectCreate {...{ subjectService }} />} />
                <Route path="/frameworks" element={<Frameworks />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
