import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import GeneralUsageInstructions from './components/GeneralUsageInstructions'
import Subjects from './components/subjects/Subjects'
import SubjectCreate from './components/subjects/SubjectCreate'
import SubjectView from './components/subjects/SubjectView'
import Frameworks from './components/frameworks/Frameworks'
import FrameworkView from './components/frameworks/FrameworkView'
import FrameworkCreate from './components/frameworks/FrameworkCreate'
import Reviews from './components/reviews/Reviews'
import ReviewCreate from './components/reviews/ReviewCreate'
import ReviewModify from './components/reviews/ReviewModify'
import ReviewView from './components/reviews/ReviewView'
import Flag from './components/Flag'
import Search from './components/search/Search'
import Instructions from './components/instructions/Instructions'
import prodSubjectService from './services/subjects';
import devSubjectService from './services/mockSubjects';
import prodFrameworkService from './services/frameworks';
import devFrameworkService from './services/mockFrameworks';
import prodReviewService from './services/reviews';
import devReviewService from './services/mockReviews';
import prodSearchService from './services/search';
import devSearchService from './services/mockSearch';


let subjectService;
let frameworkService;
let reviewService;
let searchService;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  subjectService = devSubjectService;
  frameworkService = devFrameworkService;
  reviewService = devReviewService;
  searchService = devSearchService;
} else {
  subjectService = prodSubjectService;
  frameworkService = prodFrameworkService;
  reviewService = prodReviewService;
  searchService = prodSearchService;
}

// Enable this to use production MongoDB during development
// Do not commit and restore before rebuilding UI from backlog!
// subjectService = prodSubjectService;
// frameworkService = prodFrameworkService;
// reviewService = prodReviewService;
// searchService = prodSearchService;

function App() {
  return (
    <>
      <HashRouter>
        <header>
          <Navbar />
        </header>

        <div className="main-content">
            <GeneralUsageInstructions className="mt-4" />

            <div className="mt-4">
              <Routes>
                  <Route index element={<Instructions />} />
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
                  <Route path="/review/:id" element={<ReviewView {...{ reviewService }} />} />
                  <Route path="/createReview" element={<ReviewCreate {...{ subjectService, frameworkService, reviewService }} />} />
                  <Route path="/modifyReview/:id" element={<ReviewModify {...{ reviewService }} />} />
                  <Route path="/flag/:targetType/:id" element={<Flag {...{ subjectService, frameworkService, reviewService }} />} />
                  <Route path="/search/:quickSearchTerm" element={<Search {...{ searchService }} />} />
                  <Route path="/search" element={<Search {...{ searchService }} />} />
                  <Route path="/instructions" element={<Instructions />} />
              </Routes>
            </div>
        </div>
      </HashRouter>
    </>
  )
}

export default App
