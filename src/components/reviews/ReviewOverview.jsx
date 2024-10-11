import Card from 'react-bootstrap/Card';

const ReviewOverview = ({
    mode,
    reviewTargetType,
    reviewTargetName,
    framework
}) => (
    <Card className='mt-4'>
        <Card.Body>
            <Card.Text>
                <p>
                    {mode === 'create' ? 'Creating a' : 'A'} review of the <em>{reviewTargetType}</em> <strong>{reviewTargetName}</strong> using the framework <strong>{framework.name}</strong>.
                </p>
                <p style={{marginBottom: '0px'}}>
                    {/* Todo add check for period at the end of description */}
                    {framework.description}
                </p>
            </Card.Text>
        </Card.Body>
    </Card>    
)

export default ReviewOverview
