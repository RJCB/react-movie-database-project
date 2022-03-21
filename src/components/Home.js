import React, { useState, useEffect } from "react";

//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

//components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
//Hook
import { useHomeFetch } from "../hooks/useHomeFetch";
//Image
import NoImage from "../images/no_image.jpg";

const Home = () => {
    const { state, loading, error } = useHomeFetch();
    return (
        <React.Fragment>
            {/* check if results exist and if they do, render HeroImage. Props are image, title, text from the first result */}
            {state.results[0] &&
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview} />}
            <Grid header='Popular Movies'>
                {state.results.map((movie) => {
                    return <Thumb key={movie.id}
                        clickable={true}
                        image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage} movieId={movie.id}>{movie.title}</Thumb>
                })}
            </Grid>
        </React.Fragment>
    );
}

export default Home;