import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Info } from 'react-feather';
import RenderMarkdown from '../common/RenderMarkdown'

const FrameworkDetails = ({
    frameworkName,
    frameworkDescription,
    frameworkStatus,
    facets
}) => {
    const handleDescription = 'This is a programmatic name for the facet. It is used to reference the framework\'s facets in reviews.'

    return (<>
        <h3 className='mt-5'>{frameworkName}</h3>
        <RenderMarkdown>{frameworkDescription}</RenderMarkdown>

        {frameworkStatus && <p>Status: <em>{frameworkStatus}</em></p>}
        <h3 className='mt-4'>Facets</h3>
        {facets.map(({ name, handle, description }, index) => {
            return (
                <div key={index} className="card mt-3">
                    <div className="card-body">
                        <h4 className="card-title">#{index + 1}: {name}</h4>
                        <div
                            className="card-subtitle mb-2 text-body-secondary"
                            aria-label={handleDescription}
                            style={{display: 'flex', alignItems: 'center'}}
                        >
                            {handle}
                            <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>{handleDescription}</Tooltip>
                                )}
                            >
                                {/* Todo: Add a suitable aria label for the tooltip so that it becomes accessible */}
                                <Button
                                    className="btn btn-light btn-sm"
                                    style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                ><Info size="24" /></Button>
                            </OverlayTrigger>
                        </div>
                        <RenderMarkdown>{description}</RenderMarkdown>
                    </div>
                </div>
            )
        })}
    </>)
}

export default FrameworkDetails
