import { Fragment } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { Info } from 'react-feather';
import RenderMarkdown from '../common/RenderMarkdown'
import RenderReviewCard from './RenderReviewCard'
import VerdictWidget from '../common/VerdictWidget'

// Todo: rename selectedFramework to framework
const ReviewViewContents = ({
    facetContents,
    selectedFramework,
    verdictType,
    verdictValue,
    notes
}) => {
    const facetHandles = Object.keys(facetContents)

    const getFacetProperty = (facetHandle, property) => {
        const foundFacet = selectedFramework.facets.find(facet => facet.handle === facetHandle)
        return foundFacet?.[property]
    }

    return (<Fragment>

        <Card className='mt-4'>
            <Card.Body>
                <Card.Title style={{display: 'flex', alignItems: 'center'}}>
                    <div>Review notes</div>
                </Card.Title>
                <Card.Text as='div'>
                    <RenderMarkdown>
                        {notes}
                    </RenderMarkdown>
                </Card.Text>
            </Card.Body>
        </Card>

        {verdictType && verdictType !== 'none' && <>
            <Card className='mt-4'>
                <Card.Body>
                    <Card.Title style={{display: 'flex', alignItems: 'center'}}>
                        <div>Verdict</div>
                    </Card.Title>
                    <Card.Text as='div'>
                        <VerdictWidget
                            {...{
                                verdictType,
                                verdictValue,
                            }}
                            verdictProperties={selectedFramework?.verdictProperties}
                            className='ms-1'
                            disabled={true}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        </>}

        {facetHandles.map((handle) => {
            return (<Fragment key={handle}>
                <Card className='mt-4'>
                    <Card.Body>
                        <Card.Title style={{display: 'flex', alignItems: 'center'}}>
                            <div>{getFacetProperty(handle, 'name')}</div>
                            <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>{getFacetProperty(handle, 'description')}</Tooltip>
                                )}
                            >
                                {/* Todo: Add a suitable aria label for the tooltip so that it becomes accessible */}
                                <Button
                                    className="btn btn-light btn-sm"
                                    style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                ><Info size="24" /></Button>
                            </OverlayTrigger>
                        </Card.Title>
                        <RenderReviewCard>
                            <RenderMarkdown>
                                {facetContents[handle]}
                            </RenderMarkdown>
                        </RenderReviewCard>
                    </Card.Body>
                </Card>
            </Fragment>)
        })}
    </Fragment>)
}

export default ReviewViewContents
