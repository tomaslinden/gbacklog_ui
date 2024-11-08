import Card from 'react-bootstrap/Card';
import RenderMarkdown from '../common/RenderMarkdown'
import RenderReviewCard from '../reviews/RenderReviewCard'

const SubjectViewContents = ({ className, name, description }) => {
    return (<>
        <Card {...{ className }}>
            <Card.Body>
                <Card.Title style={{display: 'flex', alignItems: 'center'}}>
                    <div>{name}</div>
                </Card.Title>
                <RenderReviewCard>
                    <RenderMarkdown>
                        {description}
                    </RenderMarkdown>
                </RenderReviewCard>
            </Card.Body>
        </Card>
    </>)
}

export default SubjectViewContents
