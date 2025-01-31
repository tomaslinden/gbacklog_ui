import ReviewViewContents from './ReviewViewContents'
import ReviewOverview from './ReviewOverview'
import { getFacetsFromReviewAsObject } from '../utilities'

// Todo rationalize the component signature to only receive the review and the get
// the type, name and id of the review from the review object.
const ReviewViewOverviewAndContents = ({
    reviewTargetType,
    reviewTargetName,
    reviewTargetId,
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
                {...{
                    reviewTargetType,
                    reviewTargetName,
                    reviewTargetId,
                    framework,
                    metaReviewAverage,
                }}
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
