import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import ClosableCardTitle from './common/ClosableCardTitle'

const GeneralUsageInstructions = () => {
  
  const [display, setDisplay] = useState(true)

  return (<>
    {display &&
      <Card className='mt-4'>
        <Card.Body>
          <ClosableCardTitle handleClose={() => setDisplay(false)}>
            General usage principles
          </ClosableCardTitle>
          <Card.Text>
            This service is meant to bring about positive change by providing a service for creating encouraging and constructive reviews on various topics. Do not target individuals or specific organizations. Please be considerate when using this service.
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
