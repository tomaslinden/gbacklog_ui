import PropTypes from 'prop-types'

const PageNavigationAndButtons = ({ children, heading }) => (<>
    <h1>{ heading }</h1>

    <div style={{textAlign: 'center'}}>
        {children}
    </div>
</>)

PageNavigationAndButtons.prototype = {
    heading: PropTypes.string.isRequired
}


export default PageNavigationAndButtons
