import React from "react";
import { Link } from "react-router-dom";
//styles
import { Image } from "../Thumb/Thumb.styles"

const Thumb = ({ image, movieId, clickable }) => {
    return (
        <div>
            {/* redirect to a specific movie page based on the clicked movie image */}
            {clickable ? (
                <Link to={`/${movieId}`}>
                    <Image src={image} alt='movie-thumb' />
                </Link>
            ) : (
                <Image src={image} alt='movie-thumb' />
            )}
        </div>
    )
}

export default Thumb;