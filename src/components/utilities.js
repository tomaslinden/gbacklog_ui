export const getFacetsFromReviewAsObject = (localReview) => {
    // Refactor this to use the reduce higher order function instead
    let newFacetContents = {}

    localReview?.facetContents.forEach(({ handle, contents }) => {
        newFacetContents[handle] = contents
    })

    return newFacetContents
}
