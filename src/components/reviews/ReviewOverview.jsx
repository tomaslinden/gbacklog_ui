import Card from 'react-bootstrap/Card';
import RenderReviewCard from './RenderReviewCard'

const ReviewOverview = ({
    mode,
    reviewTargetType,
    reviewTargetName,
    framework,
    metaReviewAverage
}) => (
    <Card className='mt-4'>
        <Card.Body>
            <RenderReviewCard>
                <p>
                    {mode === 'create' ? 'Creating a' : 'A'} review of {reviewTargetType === 'review' ? 'a' : 'the'} <em>{reviewTargetType}</em> <strong>{reviewTargetName}</strong> using the framework <strong>{framework.name}</strong>.
                </p>
                <p style={{marginBottom: metaReviewAverage ? 'default' : '0px'}}>
                    {/* Todo add check for period at the end of description */}
                    {framework.description}
                </p>
                {metaReviewAverage && <p style={{marginBottom: '0px'}}>
                    {/* https://stackoverflow.com/a/11832950 */}
                    Meta-review average: {Math.round((metaReviewAverage + Number.EPSILON) * 100) / 100}
                </p>}
            </RenderReviewCard>
        </Card.Body>
    </Card>    
)

export default ReviewOverview
