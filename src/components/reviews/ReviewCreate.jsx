import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ReviewCreateSelect from './ReviewCreateSelect'
import ReviewCreateForm from './ReviewCreateForm'
import ReviewCreatePreview from './ReviewCreatePreview'
import ReviewOverview from './ReviewOverview'
import PageHeadingAndButtons from '../common/PageHeadingAndButtons'

const ReviewCreate = ({ subjectService, frameworkService, reviewService }) => {
    const [frameworkId, setFrameworkId] = useState('')
    const [selectedFramework, setSelectedFramework] = useState()
    const [facetContents, setFacetContents] = useState({})
    const [phase, setPhase] = useState('select')
    const [reviewTargetType, setReviewTargetType] = useState('')
    const [reviewTargetId, setReviewTargetId] = useState('')
    const [selectedReviewTarget, setSelectedReviewTarget] = useState()
    const [verdictValue, setVerdictValue] = useState()

    const query = new URLSearchParams(useLocation().search);

    const reviewTargetTypeFromUrl = query.get("reviewTargetType");
    const reviewTargetIdFromUrl = query.get("reviewTargetId");
    const frameworkIdFromUrl = query.get("frameworkId");

    useEffect(() => {
        if ((reviewTargetTypeFromUrl === 'subject' || reviewTargetTypeFromUrl === 'framework') && reviewTargetIdFromUrl) {
            setReviewTargetType(reviewTargetTypeFromUrl)
            setReviewTargetId(reviewTargetIdFromUrl)
        }
        if (frameworkIdFromUrl) {
            setFrameworkId(frameworkIdFromUrl)
        }
    }, [])

    const renderSelect = () => {
        return phase === 'select' && (
            (frameworkIdFromUrl && frameworkId) ||
            (reviewTargetTypeFromUrl && reviewTargetType && reviewTargetIdFromUrl && reviewTargetId)
        )
    }

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
                    framework: selectedFramework,
                    reviewTargetId
                } } />
            }

            {renderSelect() &&
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
                    setPhase,
                    verdictValue,
                    setVerdictValue                
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
                    reviewTargetId,
                    verdictValue
                }} />
            }
        </>
    )
}

export default ReviewCreate
