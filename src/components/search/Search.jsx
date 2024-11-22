import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import debounce from 'debounce';
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'

const Search = ({ searchService }) => {
    const [searchInputText, setSearchInputText] = useState('')
    const [reviewTargetType, setReviewTargetType] = useState(false)    
    const [quickSearchTriggered, setQuickSearchTriggered] = useState(false)    
    const [searchResults, setSearchResults] = useState({})

    let params = useParams();
    const { quickSearchTerm } = params

    const actualPerformSearch = () => {
        console.log('performing search...', searchInputText)
        searchService.searchWithTerm(searchInputText).then((results) => {
            setSearchResults(results)
        })
    }

    // Prevents multiple calls of performSearch
    let performSearch = debounce(actualPerformSearch, 200);

    useEffect(() => {
        setSearchInputText(quickSearchTerm)
    }, [])

    useEffect(() => {
        console.log('useEffect searchInputText', searchInputText)
        if (!quickSearchTriggered && quickSearchTerm && searchInputText !== '') {
            setQuickSearchTriggered(true)
            performSearch()
        }
    }, [searchInputText])

    return (<>
        <SearchForm {...{ 
            searchInputText,
            setSearchInputText,
            reviewTargetType,
            setReviewTargetType,
            onSubmit: performSearch
        }} />

        <SearchResults { ...{ searchResults } } />
    </>)
}

export default Search
