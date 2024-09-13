import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ReviewCreateSelect from './ReviewCreateSelect'
import ReviewCreateActual from './ReviewCreateActual'

const ReviewCreate = ({ subjectService, frameworkService, reviewService, mode }) => {
    const [subjectId, setSubjectId] = useState('')
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedSubject, setSelectedSubject] = useState()
    const [selectedFramework, setSelectedFramework] = useState()
    const [phase, setPhase] = useState('select')
  
    return (
        <>
            <h1>Create review</h1>

            <Link to='/reviews'>
                <button type='button' className='btn btn-primary mt-4'>Back to reviews</button>
            </Link>

            {selectedSubject && selectedFramework &&
                <Card className='mt-5'>
                    <Card.Body>
                    <p>
                    Review being created of subject <strong>{selectedSubject.name}</strong> using review framework <strong>{selectedFramework.name}</strong>.
                    </p>
                    <p style={{marginBottom: '0px'}}>
                        {/* Todo add check for period at the end of description */}
                        {selectedFramework.description}
                    </p>
                    </Card.Body>
                </Card>
            }

            {phase === 'select' &&
                <ReviewCreateSelect { ...{ 
                    subjectService,
                    frameworkService,
                    subjectId,
                    setSubjectId,
                    frameworkId,
                    setFrameworkId,
                    setSelectedSubject,
                    setSelectedFramework,
                    setPhase
                } } />
            }

            {phase === 'create' &&
                <ReviewCreateActual { ...{ selectedSubject, selectedFramework } } />
            }
        </>
    )
}

export default ReviewCreate
