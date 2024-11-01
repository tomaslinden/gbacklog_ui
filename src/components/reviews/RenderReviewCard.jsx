import Card from 'react-bootstrap/Card';

const RenderReviewCard = ({ children }) => {
    return (<>
        <Card.Text as='div'>
            {children}
        </Card.Text>
    </>)
}

export default RenderReviewCard
