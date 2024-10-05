import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import './App.css'
import Navbar from './components/Navbar'
import Subjects from './components/subjects/Subjects'
import SubjectCreate from './components/Subjects/SubjectCreate'
import Frameworks from './components/frameworks/Frameworks'
import FrameworkView from './components/frameworks/FrameworkView'
import FrameworkCreate from './components/frameworks/FrameworkCreate'
import Reviews from './components/reviews/Reviews'
import ReviewCreate from './components/reviews/ReviewCreate'
import ReviewModify from './components/reviews/ReviewModify'
import ReviewView from './components/reviews/ReviewView'
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

          <Card className='mt-4'>
            <Card.Body>
              <Card.Title>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>General usage principles</div>
                  <div><CloseButton style={{
                    width: '4px',
                    backgroundSize: 'auto'
                  }}/></div>
                </div>
              </Card.Title>
              <Card.Text>
                This service is meant to bring about positive change by providing a service for creating positive and constructive reviews on various things. Do not target individuals or specific organizations.
              </Card.Text>
              <Card.Text>
                <em><span>‘Love the Lord your God with all your heart and with all your soul and with all your mind.’ This is the first and greatest commandment. And the second is like it: ‘Love your neighbor as yourself.’</span></em> (Matthew 22:36-39 NIV)
              </Card.Text>
            </Card.Body>
          </Card>

        </header>
        <div className="main-content mt-4">
            <Routes>
                <Route index element={<Subjects {...{ subjectService }} />} />
                <Route path="/subjects" element={<Subjects {...{ subjectService }} />} />
                {/* Todo: add mode='create' to createSubject instead of having a default mode */}
                <Route path="/createSubject" element={<SubjectCreate {...{ subjectService }} />} />
                <Route path="/modifySubject/:id" element={<SubjectCreate {...{ subjectService }} mode='modify' />} />
                <Route path="/frameworks" element={<Frameworks {...{ frameworkService }} />} />
                <Route path="/framework/:id" element={<FrameworkView {...{ frameworkService }} />} />
                <Route path="/modifyFramework/:id" element={<FrameworkCreate {...{ frameworkService }} mode='modify' />} />
                <Route path="/createFramework" element={<FrameworkCreate {...{ frameworkService }} mode='create'/>} />
                <Route path="/reviews" element={<Reviews {...{ subjectService, frameworkService, reviewService }} />} />
                <Route path="/review/:id" element={<ReviewView {...{ reviewService, frameworkService }} />} />
                <Route path="/createReview" element={<ReviewCreate {...{ subjectService, frameworkService, reviewService }} />} />
                <Route path="/modifyReview/:id" element={<ReviewModify {...{ frameworkService, reviewService }} />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
