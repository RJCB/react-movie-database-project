import React, { useState, useEffect, useRef } from "react";
//Image
import searchIcon from "../../images/search-icon.svg";
//styles
import { Wrapper, Content } from "../SearchBar/SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('');
    const initial = useRef(true);

    // timer is to set a slight delay after user enters search term and before we show results
    useEffect(() => {
        if (initial.current) {//useRef is used here to avoid initial render of setSearchTerm. We want to load results without a searchTerm on initial load
            initial.current = false;
            return;
        }
        //slight delay to make load appear more real
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500)
        // clear timer once its run, to avoid multiple timeouts
        return () => clearTimeout(timer)
    }, [setSearchTerm, state]);
    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input type="text"
                    placeholder="Search Movie"
                    onChange={e => setState(e.currentTarget.value)}
                    value={state} />
            </Content>
        </Wrapper>
    )
}

export default SearchBar;