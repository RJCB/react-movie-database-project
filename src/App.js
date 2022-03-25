import React from 'react';
//Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
//context
import UserProvider from "./context";

//styles
import { GlobalStyle } from './GlobalStyle';

const App = () => {
	return (
		<BrowserRouter>
			<UserProvider>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/:movieId" element={<Movie />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
				<GlobalStyle />
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;//default export
