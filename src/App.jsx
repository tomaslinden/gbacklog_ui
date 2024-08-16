import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Subjects from './components/Subjects'

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div class="main-content">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Subjects />}>
              <Route index element={<Subjects />} />
              <Route path="subjects" element={<Subjects />} />
              {/* Todo implement functionality for creating subjects */}
              {/* <Route path="createSubject" element={<SubjectCreate />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
