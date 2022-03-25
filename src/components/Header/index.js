import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RMDBLogo from "../../images/react-movie-logo.svg";

import { Wrapper, Content, LogoImg } from "../Header/Header.styles";//named exports
//context
import { Context } from "../../context";

const Header = () => {
    const [user] = useContext(Context);
    return (
        <Wrapper>
            <Content>
                <Link to='/'>
                    <LogoImg src={RMDBLogo} alt='rmdb-logo' />
                </Link>
                {user ? (
                    <span>Logged in as:{user.username}</span>
                ) : (
                    <Link to="/login"><span>Log in</span></Link>
                )}
            </Content>
        </Wrapper>
    )
}

export default Header;//default export