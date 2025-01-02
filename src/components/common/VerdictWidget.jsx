import { ThumbsUp } from 'react-feather'
import Form from 'react-bootstrap/Form';

const VerdictWidget = ({
    verdictType,
    verdictProperties,
    verdictValue,
    setVerdictValue,
    style,
    className,
    disabled
}) => {
    const { min, max, stepSize } = verdictProperties

    const isBinary = () => {
        return (max === '1' && min === '0' && stepSize === '1') ||
            (max === 1 && min === 0 && stepSize === 1)
    }

    const convertVerdictEventValue = (value) => {
        if (isBinary() && value === true) {
            return 1
        } else if (isBinary && value === false) {
            return 0
        } else {
            return value
        }
    }

    return (
        <div {...{ style, className }}>
            {verdictType === 'discrete' && isBinary() &&
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', top: '0.1em'}}>
                    <Form.Check
                        type="switch"
                        checked={verdictValue}
                        onChange={(event) => 
                            setVerdictValue(convertVerdictEventValue(event.target.checked))
                        }
                    />
                    <ThumbsUp size="18" style={{position: 'relative', top: '-0.1rem'}}/>
                </div>
            }

            {verdictType === 'discrete' && !isBinary() && <>
                <div style={{display: 'flex'}}>
                    <input
                        type="range"
                        id="numeric-verdict-properties-preview"
                        name="numeric-verdict-properties-preview"
                        min={min}
                        max={max}
                        step={stepSize}
                        onChange={(event) => setVerdictValue(event.target.value)}
                        value={verdictValue}
                        {...{ disabled }}
                    />
                    <label
                        style={{display: verdictValue === undefined ? 'hidden' : 'block'}}
                        className='ms-2'
                        htmlFor="numeric-verdict-properties-preview"
                    >{verdictValue}</label>
                </div>
            </>}
        </div>
    )
}

export default VerdictWidget
