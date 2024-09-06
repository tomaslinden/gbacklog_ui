import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Subjects from './components/subjects/Subjects'
import SubjectCreate from './components/Subjects/SubjectCreate'
import Frameworks from './components/frameworks/Frameworks'
import FrameworkCreate from './components/frameworks/FrameworkCreate'
import Reviews from './components/reviews/Reviews'
import prodSubjectService from './services/subjects';
import devSubjectService from './services/mockSubjects';
import prodFrameworkService from './services/frameworks';
import devFrameworkService from './services/mockFrameworks';

let subjectService;
let frameworkService;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  subjectService = devSubjectService;
  frameworkService = devFrameworkService;
} else {
  subjectService = prodSubjectService;
  frameworkService = prodFrameworkService;
}

// Enable this to use production MongoDB during development
// Do not commit and restore before rebuilding UI from backlog!
// subjectService = prodSubjectService;
// frameworkService = prodFrameworkService;

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
                {/* Todo: add mode='crate' to createSubject as default mode */}
                <Route path="/createSubject" element={<SubjectCreate {...{ subjectService }} />} />
                <Route path="/modifySubject/:id" element={<SubjectCreate {...{ subjectService }} mode='modify' />} />
                <Route path="/frameworks" element={<Frameworks {...{ frameworkService }} />} />
                <Route path="/createFramework" element={<FrameworkCreate {...{ frameworkService }} mode='create'/>} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
