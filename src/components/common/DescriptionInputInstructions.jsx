
import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import ClosableCardTitle from '../common/ClosableCardTitle'

const DescriptionInputInstructions = ({ type, className }) => {
    const [displayInstructions, setDisplayInstructions] = useState(true)

    let descriptionSpecification

    if (type === 'review') {
        descriptionSpecification = 'review facet contents'
    } else if (type === 'framework') {
        descriptionSpecification = 'framework and facet descriptions'
    }

    return (<>
        {displayInstructions &&
            <Card {...{ className }} >
                <Card.Body>
                    <ClosableCardTitle handleClose={() => setDisplayInstructions(false)}>
                        Instructions
                    </ClosableCardTitle>
                    The {descriptionSpecification} support using <a href='https://commonmark.org/help/' target='_blank'>Markdown syntax</a>.
                    Note that using the headings (i.e. hashes, such as "#" and "##", in markdown) are disallowed as they are reserved for the rest of the pages' contents.
                </Card.Body>
            </Card>
        }
    </>)
}

export default DescriptionInputInstructions
