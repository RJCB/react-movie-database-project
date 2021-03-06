/**
 * This component initializes the state with empty values with same structure as the result from API.
 * The state and logic is for the Home component. The purpose of this Hook is to have a cleaner Home component by
 * separating the logic from JSX
 */
import { useState, useEffect } from "react";
//API
import API from "../API";
//Helpers
import { isPersistedState } from "../helpers";
const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);//show loading spinner based on this
            const movies = await API.fetchMovies(searchTerm, page);
            /** movies is an object with page,total_pages,total_results key values and a "results" array. In setState, we set the movies as state and if there are additional pages, we append the "results" from new movies object to the "results" from the previous movies state because we don't want to wipe out previous "results" everytime we fetch a new page
            */
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
        }

        setLoading(false);
    }

    //initial and search
    useEffect(() => {
        //Fetch state from session storage except when user is searching
        if (!searchTerm) {
            const sessionState = isPersistedState("homeState");
            if (sessionState) {
                setState(sessionState);
                return;
            }
        }
        setState(initialState);//reset state before making a new search
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //Load more
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    //Write to session storage to avoid API call everytime we load homepage
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(state));
    }, [searchTerm, state])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}