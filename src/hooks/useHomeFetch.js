/**
 * This component initializes the state with empty values with same structure as the result from API.
 * The state and logic is for the Home component. The purpose of this Hook is to have a cleaner Home component by
 * separating the logic from JSX
 */
import { useState, useEffect, useRef } from "react";
//API
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);//show loading spinner based on this
            const movies = await API.fetchMovies(searchTerm, page);
            /** movies is an object with page,total_pages,total_results key values and a "results" array. In setState, we set the movies as state and if there are additional pages, we append the "results" from new movies object to the "results" from the previous movies state because we don't want to wipe out previous "results" everytime we fetch a new page
            */
            console.log(movies);
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

    useEffect(() => {
        fetchMovies(1);
    }, []);

    return { state, loading, error };
}