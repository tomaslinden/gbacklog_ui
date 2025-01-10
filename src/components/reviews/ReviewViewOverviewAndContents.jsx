import ReviewViewContents from './ReviewViewContents'
import ReviewOverview from './ReviewOverview'
import { getFacetsFromReviewAsObject } from '../utilities'

const ReviewViewOverviewAndContents = ({
    reviewTargetType,
    reviewTargetName,
    framework,
    review
}) => {
    const facetContentsAsObject = getFacetsFromReviewAsObject(review)

    const { verdictType } = framework
    const { verdictValue, metaReviewAverage } = review

    return (<>
        <div className='mt-5'>
            <ReviewOverview
                mode='view'
                {...{ reviewTargetType, reviewTargetName, framework, metaReviewAverage }}
            />
        </div>

        <div className='mt-4'>
            <ReviewViewContents
                mode='view'
                facetContents={facetContentsAsObject}
                selectedFramework={framework}
                {...{ verdictType, verdictValue }}
            />
        </div>
    </>)
}

export default ReviewViewOverviewAndContents
