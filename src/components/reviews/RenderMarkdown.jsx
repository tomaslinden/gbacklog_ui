import Markdown from 'react-markdown'

const RenderMarkdown = ({ children }) => {
    return (<>
        <Markdown disallowedElements={['h1', 'h2', 'h3']}>
            {children}
        </Markdown>
    </>)
}

export default RenderMarkdown
