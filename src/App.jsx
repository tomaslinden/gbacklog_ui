import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import GeneralUsageInstructions from './components/GeneralUsageInstructions'
import Subjects from './components/subjects/Subjects'
import SubjectCreate from './components/Subjects/SubjectCreate'
import SubjectView from './components/Subjects/SubjectView'
import Frameworks from './components/frameworks/Frameworks'
import FrameworkView from './components/frameworks/FrameworkView'
import FrameworkCreate from './components/frameworks/FrameworkCreate'
import Reviews from './components/reviews/Reviews'
import ReviewCreate from './components/reviews/ReviewCreate'
import ReviewModify from './components/reviews/ReviewModify'
import ReviewView from './components/reviews/ReviewView'
import Flag from './components/Flag'
import prodSubjectService from './services/subjects';
import devSubjectService from './services/mockSubjects';
import prodFrameworkService from './services/frameworks';
import devFrameworkService from './services/mockFrameworks';
import prodReviewService from './services/reviews';
import devReviewService from './services/mockReviews';

let subjectService;
let frameworkService;
let reviewService;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  subjectService = devSubjectService;
  frameworkService = devFrameworkService;
  reviewService = devReviewService;
} else {
  subjectService = prodSubjectService;
  frameworkService = prodFrameworkService;
  reviewService = prodReviewService;
}

// Enable this to use production MongoDB during development
// Do not commit and restore before rebuilding UI from backlog!
// subjectService = prodSubjectService;
// frameworkService = prodFrameworkService;
// reviewService = prodReviewService;

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>

        <div className="main-content">
            <GeneralUsageInstructions className="mt-4" />

            <div className="mt-4">
              <Routes>
                  <Route index element={<Subjects {...{ subjectService }} />} />
                  <Route path="/subjects" element={<Subjects {...{ subjectService }} />} />
                  <Route path="/subject/:id" element={<SubjectView {...{ subjectService }} />} />
                  {/* Todo: add mode='create' to createSubject instead of having a default mode */}
                  <Route path="/createSubject" element={<SubjectCreate {...{ subjectService }} />} />
                  <Route path="/modifySubject/:id" element={<SubjectCreate {...{ subjectService }} mode='modify' />} />
                  <Route path="/frameworks" element={<Frameworks {...{ frameworkService }} />} />
                  <Route path="/framework/:id" element={<FrameworkView {...{ frameworkService }} />} />
                  <Route path="/modifyFramework/:id" element={<FrameworkCreate {...{ frameworkService }} mode='modify' />} />
                  <Route path="/createFramework" element={<FrameworkCreate {...{ frameworkService }} mode='create'/>} />
                  <Route path="/reviews" element={<Reviews {...{ subjectService, frameworkService, reviewService }} />} />
                  <Route path="/review/:id" element={<ReviewView {...{ subjectService, reviewService, frameworkService }} />} />
                  <Route path="/createReview" element={<ReviewCreate {...{ subjectService, frameworkService, reviewService }} />} />
                  <Route path="/modifyReview/:id" element={<ReviewModify {...{ subjectService, frameworkService, reviewService }} />} />
                  <Route path="/flag/:targetType/:id" element={<Flag {...{ subjectService, frameworkService, reviewService }} />} />
              </Routes>
            </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
