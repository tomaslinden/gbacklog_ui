import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { ThumbsUp } from 'react-feather'
import Form from 'react-bootstrap/Form';

const VerdictWidgetPreview = ({ widgetType, verdictProperties }) => {

    const [verdictValue, setVerdictValue] = useState()

    const { min, max, stepSize } = verdictProperties

    const getNumberOfSteps = () => {
        return (max - min) / stepSize + 1
    }

    const isBinary = () => {
        return max === '1' && min === '0' && stepSize === '1' 
    }

    return (
        <Card className='mt-2'>
            <Card.Body>
                <Card.Text>Preview verdict scale</Card.Text>
                <Card.Text as='div'>
                    {widgetType === 'none' && <>(None selected)</>}

                    {widgetType === 'discrete' &&
                        <p>Number of possible values: {getNumberOfSteps()}</p>
                    }

                    {widgetType === 'discrete' && isBinary() &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Check
                                type="switch"
                            />
                            <ThumbsUp size="18" style={{position: 'relative', top: '-0.1rem'}}/>
                        </div>
                    }

                    {widgetType === 'discrete' && !isBinary() && <>
                        <div style={{display: 'flex'}}>
                            <input
                                type="range"
                                id="numeric-verdict-properties-preview"
                                name="numeric-verdict-properties-preview"
                                min={min}
                                max={max}
                                step={stepSize}
                                onChange={(event) => setVerdictValue(event.target.value)}
                            />
                            <label className='ms-2' htmlFor="numeric-verdict-properties-preview">{verdictValue}</label>
                        </div>
                    </>}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default VerdictWidgetPreview
