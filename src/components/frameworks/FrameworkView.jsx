// import { Link } from 'react-router-dom';

const FrameworkView = ({ frameworkName, frameworkDescription, facets, setIsPreview }) => {
    return (<>
        {/* Todo finalize UI */}
        <h2 className='mt-5'>Preview framework</h2>
        Name: {frameworkName}<br />
        Description: {frameworkDescription}<br />
        {facets.map(({ name, description }, index) => {
            console.log('facet', name, description)
            return (<>
                <br />
                Facet number: {index + 1}<br />
                Facet name: {name}<br />
                Facet description: {description}<br />
            </>)
        })}

        <div className='col-12 mt-5'>
            <button className='btn btn-primary' type='submit' disabled={false} onClick={() => setIsPreview(false)}>
                Modify framework
            </button>
        </div>
    </>)
}

export default FrameworkView
