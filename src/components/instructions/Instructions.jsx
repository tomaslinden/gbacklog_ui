import { useEffect } from 'react'
import RenderMarkdown from "../common/RenderMarkdown"

const instructionsString = 
`
# Instructions

**GBacklog** (potential alternative name *Salvia*) is an experimental service meant for testing whether peer-reviewing methods typically employed in science can be employed in other settings.

Using this approach, the overarching goal of the service is to help bring about positive change.
It is not meant for criticism, and especially not for targeting specific individuals or organizations.

The service is built up of three main types of *entities:*
- **Subject**: an entity representing a review target (the object of so called reviews)
- **Framework**: a specific tool through which reviews of subjects can be created
- **Review**: an evaluation of a review subject through a particular framework

The service contains four main sections:
- **Review subjects**: for maintaining (and flagging) the possible targets of reviews
- **Review frameworks**: for maintaining (and flagging) review frameworks
- **Reviews**: for maintaining (and flagging) evaluations of review subjects
- **Search**: for searching for and browsing the above entities

Frameworks can also have a so called *numeric verdicts*.
These can then be used when creating reviews in order to give a numeric representation of a review.
A review's verdict is meant to reflect the degree of positive impact that the review subject is thought to have as seen through a particular review framework.

Reviews can also be given a *thumbs-up* or a *thumbs-down* verdict along with a motivation.
This is meant to give a rating of whether a review is deemed to be of high quality or not. (So called *meta-reviews*)
The average meta-review score for a review is displayed on a review’s view page.
A review's meta-review score is calculated by taking the number of positive meta-reviews divided by the total number of meta-reviews a review has received.

All types of entities can be flagged in case they are deemed non-constructive.

A future development goal is to be able to rank subjects based on their reviews’ numeric verdicts weighed by their meta-reviews scores,
as seen through a particular framework.
This is meant to give a ordering of subjects based on how well they are deemed to produce positive change.`

const Instructions = () => {
    return (
        <RenderMarkdown disallowHeadings={false}>
            {instructionsString}
        </RenderMarkdown>
    )
}

export default Instructions;