import Card from 'react-bootstrap/Card'
import CloseButton from 'react-bootstrap/CloseButton';

const ClosableCardTitle = ({ children, handleClose }) => {
    return (<>
        <Card.Title>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>{ children }</div>
                <CloseButton 
                    onClick={handleClose}
                    style={{
                        width: '4px',
                        backgroundSize: 'auto'
                    }}
                />
            </div>
        </Card.Title>
    </>)
}

export default ClosableCardTitle
