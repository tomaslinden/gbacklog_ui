import PropTypes from 'prop-types'

const PageHeadingAndButtons = ({ className, children, heading }) => (<>
    <div {...{ className }}>
        {heading && <h1>{ heading }</h1>}

        <div style={{textAlign: 'center'}}>
            {children}
        </div>
    </div>
</>)

PageHeadingAndButtons.prototype = {
    // heading: PropTypes.string.isRequired
}


export default PageHeadingAndButtons
