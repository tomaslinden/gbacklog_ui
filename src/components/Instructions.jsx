const Instructions = () => {

    return (<>
<p><b>GBacklog</b> (potential alternative name <i>Salvia</i>) is an experimental service meant for testing whether peer-reviewing methods typically employed in science can be employed in other settings.
Using this approach, the overarching goal of the service is to help bring about positive change. It is not meant for criticism, and especially not for targeting specific individuals or organizations.</p>

<p>The service is built up of three main types of <i>entities:</i></p>
<ul>
    <li><b>Subject</b>: an entity representing a review target (the object of so called reviews)</li>
    <li><b>Framework</b>: a specific tool through which reviews of subjects can be created</li>
    <li><b>Review</b>: an evaluation of a review subject through a particular  framework (above)</li>
</ul>

<p>The service contains four main sections:</p>
<ul>
    <li><b>Subjects</b>: meant for viewing, creating (and flagging) the possible objects of reviews</li>
    <li><b>Frameworks</b>: a section for viewing and creating (and flagging) review frameworks</li>
    <li><b>Reviews</b>: a section for viewing, creating (and flagging) evaluations of review subjects</li>
    <li><b>Search</b>: a section for searching for and browsing the above entities</li>
</ul>

<p>Frameworks can also have a so called <i>numeric verdicts</i>. These can then be used when creating reviews in order to give a numeric representation of the review. The subject’s verdict is meant to reflect the degree of positive impact that the review subject is thought to have as seen through a particular review framework.</p>

<p>Reviews can also be given a <i>thumbs-up</i> or a <i>thumbs-down</i> verdict along with a motivation. This is meant to give a rating of whether a review is deemed to be of high quality or not. (So called <i>meta-reviews</i>) The average meta-review score for a review is displayed on a review’s view page (i.e. the number of positive meta-reviews divided by the total number of meta-reviews a review has).</p>

<p>All types of entities can be flagged in case they are deemed non-constructive.</p>

<p>A future development goal is to be able rank subjects based on their reviews’ numeric verdicts, weighed by their meta-reviews scores, as seen through a particular framework. This is meant to give a quantitative ordering of subjects based on how well they are deemed to produce positive change.</p>
    </>)
}

export default Instructions;