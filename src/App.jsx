import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Subjects from './components/subjects/Subjects'
import SubjectCreate from './components/Subjects/SubjectCreate'
import Frameworks from './components/frameworks/Frameworks'
import Reviews from './components/reviews/Reviews'
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
                <Route path="/modifySubject/:id" element={<SubjectCreate {...{ subjectService }} mode='modify' />} />
                <Route path="/frameworks" element={<Frameworks />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
