import ReviewViewContents from './ReviewViewContents'
import ReviewOverview from './ReviewOverview'
import { getFacetsFromReviewAsObject } from '../utilities'

const ReviewViewOverviewAndContents = ({
    reviewTargetType,
    reviewTargetName,
    framework,
    review,
}) => {

    const facetContentsAsObject = getFacetsFromReviewAsObject(review)

    return (<>
        <div className='mt-5'>
            <ReviewOverview
                mode='view'
                {...{ reviewTargetType }}
                {...{ reviewTargetName }}
                {...{ framework }}
            />
        </div>

        <div className='mt-4'>
            <ReviewViewContents
                mode='view'
                facetContents={facetContentsAsObject}
                selectedFramework={framework}
            />
        </div>
    </>)
}

export default ReviewViewOverviewAndContents
