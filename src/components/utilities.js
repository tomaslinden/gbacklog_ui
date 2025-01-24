export const getFacetsFromReviewAsObject = (localReview) => {
    // Refactor this to use the reduce higher order function instead
    let newFacetContents = {}

    localReview?.facetContents.forEach(({ handle, contents }) => {
        newFacetContents[handle] = contents
    })

    return newFacetContents
}

export const isValidMarkdown = ( markdown ) => {
    // return markdown.indexOf('#') === -1
    return true
}

// Modified from StackOverflow: https://stackoverflow.com/a/175787
export const isNumeric = (string) => {
    if (typeof string != "string") {
        return false // Only strings supported
    } else {
        return !isNaN(string) && !isNaN(parseFloat(string))
    }
}

export const convertVerdictPropertiesToString = (verdictProperties) => {
    if (!verdictProperties) {
        return {}
    } else {
        const { max, min, stepSize } = verdictProperties
        
        return {
            max: max + '',
            min: min + '',
            stepSize: stepSize + ''
        }    
    }
}

export const getMetaReviewFrameworkId = () => '67658a8f7ee31ced58af9939'
