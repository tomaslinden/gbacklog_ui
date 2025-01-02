import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import VerdictWidget from '../common/VerdictWidget'

const VerdictWidgetPreview = ({ verdictType, verdictProperties }) => {

    const [verdictValue, setVerdictValue] = useState()

    const { min, max, stepSize } = verdictProperties

    const getNumberOfSteps = () => {
        return (max - min) / stepSize + 1
    }

    useEffect(() => {
        setVerdictValue(max)
    }, [verdictProperties, verdictType]) 

    return (
        <Card className='mt-2'>
            <Card.Body>
                <Card.Text as='div'>
                    <div style={{display: 'flex'}}>
                        <div>
                            {verdictType === 'none' && <>(None selected)</>}

                            {verdictType === 'discrete' &&
                                <p>Number of possible values: {getNumberOfSteps()}</p>
                            }

                            <div style={{display: 'flex'}}>
                                <div>Preview: </div>
                                {/* Todo extract verdict widget into its own component and use when creating reviews with non-none verdict */}
                                <VerdictWidget
                                    {...{
                                        verdictType,
                                        verdictProperties,
                                        verdictValue,
                                        setVerdictValue,
                                    }}
                                    style={{ marginLeft: '0.5em' }}
                                />
                            </div>
                        </div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default VerdictWidgetPreview
