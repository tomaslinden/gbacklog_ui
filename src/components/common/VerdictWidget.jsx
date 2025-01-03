import { ThumbsUp, ThumbsDown } from 'react-feather'
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
        if (isBinary() && (value === true || value === 1)) {
            return 1
        } else if (isBinary && value === false || value === 0) {
            return 0
        } else {
            return value
        }
    }

    return (
        <div {...{ style, className }}>
            {verdictType === 'discrete' && isBinary() &&
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', top: '0.1em'}}>
                    {disabled !== true && <>
                        <Form.Check
                            type="switch"
                            checked={verdictValue ? true : false}
                            onChange={(event) => 
                                setVerdictValue(convertVerdictEventValue(event.target.checked))
                            }
                            {...{ disabled }}
                        />
                        <ThumbsUp size="18" style={{position: 'relative', top: '-0.1rem'}}/>
                    </>}
                    {disabled === true && <>
                        <ThumbsDown
                            size="18"
                            color={verdictValue ? '#CCCCCC' : '#6C3BAA'}
                            alt={verdictValue ? 'Positive' : 'Negative'}
                            aria-label={verdictValue ? 'Positive' : 'Negative'}
                        />
                        <ThumbsUp
                            className='ms-2'
                            size="18"
                            color={verdictValue ? '#6C3BAA' : '#CCCCCC'}
                            alt={verdictValue ? 'Positive' : 'Negative'}
                            aria-label={verdictValue? 'Positive' : 'Negative'}
                        />
                    </>}
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
