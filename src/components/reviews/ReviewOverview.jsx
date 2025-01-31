import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import RenderReviewCard from './RenderReviewCard'
import RenderMarkdown from '../common/RenderMarkdown'

const ReviewOverview = ({
    mode,
    reviewTargetType,
    reviewTargetName,
    framework,
    metaReviewAverage,
    reviewTargetId
}) => (
    <Card className='mt-4'>
        <Card.Body as='div'>
            <RenderReviewCard>
                <p>
                    {mode === 'create' ? 'Creating a' : 'A'} review of {reviewTargetType === 'review' ? 'a' : 'the'} <em>{reviewTargetType}</em> <Link to={`/${reviewTargetType}/${reviewTargetId}`}>
                        <strong>{reviewTargetName}</strong>
                    </Link> using the framework <Link to={`/framework/${framework.id}`}>
                        <strong>{framework.name}</strong>
                    </Link>.
                </p>
                <div style={{marginBottom: metaReviewAverage ? 'default' : '0px'}}>
                    {/* Todo add check for period at the end of description */}
                    <RenderMarkdown>{framework.description}</RenderMarkdown>
                </div>
                {metaReviewAverage && <p style={{marginBottom: '0px'}}>
                    {/* https://stackoverflow.com/a/11832950 */}
                    Meta-review average: {Math.round((metaReviewAverage + Number.EPSILON) * 100) / 100}
                </p>}
            </RenderReviewCard>
        </Card.Body>
    </Card>    
)

export default ReviewOverview
