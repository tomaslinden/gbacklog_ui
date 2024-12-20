export const getFacetsFromReviewAsObject = (localReview) => {
    // Refactor this to use the reduce higher order function instead
    let newFacetContents = {}

    localReview?.facetContents.forEach(({ handle, contents }) => {
        newFacetContents[handle] = contents
    })

    return newFacetContents
}

export const isValidMarkdown = ( markdown ) => {
    return markdown.indexOf('#') === -1
}

export const getSubjectAndFrameworkByReviewId = (subjectId, frameworkId) => {

}

// Modified from StackOverflow: https://stackoverflow.com/a/175787
export const isNumeric = (string) => {
    if (typeof string != "string") {
        return false // Only strings supported
    } else {
        return !isNaN(string) && !isNaN(parseFloat(string))
    }
}
