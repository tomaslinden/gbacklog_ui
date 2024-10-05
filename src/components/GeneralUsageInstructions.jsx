import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

const GeneralUsageInstructions = () => {
  
  const [display, setDisplay] = useState(true)

  return (<>
    {display &&
      <Card className='mt-4'>
        <Card.Body>
          <Card.Title>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>General usage principles</div>
                <CloseButton 
                  onClick={() => setDisplay(false)}
                  style={{
                    width: '4px',
                    backgroundSize: 'auto'
                  }}
                />
            </div>
          </Card.Title>
          <Card.Text>
            This service is meant to bring about positive change by providing a service for creating positive and constructive reviews on various things. Do not target individuals or specific organizations. Please be considerate when using this service.
          </Card.Text>
          <Card.Text>
            <em><span>‘Love the Lord your God with all your heart and with all your soul and with all your mind.’ This is the first and greatest commandment. And the second is like it: ‘Love your neighbor as yourself.’</span></em> (Matthew 22:36-39 NIV)
          </Card.Text>
        </Card.Body>
      </Card>
    }
  </>)
}

export default GeneralUsageInstructions
