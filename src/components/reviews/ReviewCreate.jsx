import { useState } from 'react'
import { Link } from 'react-router-dom';
import ReviewCreateSelect from './ReviewCreateSelect'
import ReviewCreateForm from './ReviewCreateForm'
import ReviewCreatePreview from './ReviewCreatePreview'
import ReviewOverview from './ReviewOverview'
import PageHeadingAndButtons from '../common/PageHeadingAndButtons'

const ReviewCreate = ({ subjectService, frameworkService, reviewService, mode }) => {
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedFramework, setSelectedFramework] = useState()
    const [facetContents, setFacetContents] = useState({})
    const [phase, setPhase] = useState('select')
    const [reviewTargetType, setReviewTargetType] = useState('')
    const [reviewTargetId, setReviewTargetId] = useState('')
    const [selectedReviewTarget, setSelectedReviewTarget] = useState()

    return (
        <>
            <PageHeadingAndButtons heading='Create review'>
                <Link to='/reviews'>
                    <button type='button' className='btn btn-primary mt-4'>Back to reviews</button>
                </Link>
            </PageHeadingAndButtons>

            {selectedReviewTarget && selectedFramework &&
                <ReviewOverview { ...{ 
                    mode: 'create',
                    reviewTargetType,
                    reviewTargetName: selectedReviewTarget.name,
                    framework: selectedFramework
                } } />
            }

            {phase === 'select' &&
                <ReviewCreateSelect { ...{ 
                    subjectService,
                    frameworkService,
                    frameworkId,
                    setFrameworkId,
                    setSelectedFramework,
                    onSelectSuccess: () => setPhase('create'),
                    continueButtonText: 'Continue to review',
                    componentUsageType: 'createReview',
                    reviewTargetType,
                    setReviewTargetType,
                    reviewTargetId,
                    setReviewTargetId,
                    setSelectedReviewTarget
                } } />
            }

            {phase === 'create' &&
                <ReviewCreateForm { ...{
                    selectedFramework,
                    facetContents,
                    setFacetContents,
                    setPhase
                } } />
            }

            {phase === 'preview' &&
                <ReviewCreatePreview {...{ 
                    reviewService,
                    selectedFramework,
                    facetContents,
                    setPhase,
                    frameworkId,
                    mode: 'create',
                    handleSave: (reviewToSave) => {
                        return reviewService.create(reviewToSave)
                    },
                    reviewTargetType,
                    reviewTargetId
                }} />
            }
        </>
    )
}

export default ReviewCreate
