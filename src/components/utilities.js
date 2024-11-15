export const getFacetsFromReviewAsObject = (localReview) => {
    // Refactor this to use the reduce higher order function instead
    let newFacetContents = {}

    localReview?.facetContents.forEach(({ handle, contents }) => {
        newFacetContents[handle] = contents
    })

    return newFacetContents
}

export const isValidMarkdown = ( markdown ) => {
    console.log('isValidMarkdown', markdown, markdown.indexOf('#') === -1)
    return markdown.indexOf('#') === -1
}

export const getSubjectAndFrameworkByReviewId = (subjectId, frameworkId) => {

}