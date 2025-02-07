import React, { useContext, useEffect, useState } from "react";
import { Route as RouterRoute, Redirect } from "react-router-dom";

import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";

const Route = ({ component: Component, isPrivate = false, ...rest }) => {
	const { isAuth, loading } = useContext(AuthContext);
	const [expired, setExpired] = useState(false);
	 useEffect(() => {
		const isExpired = localStorage.getItem("isExpired") === "true" ;
		
		setExpired(isExpired);
		
	  }, []);
	if (!isAuth && isPrivate) {
		return (
			<>
				{loading && <BackdropLoading />}
				<Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
			</>
		);
	}

	if (isAuth && !isPrivate) {
		return (
			<>
				{loading && <BackdropLoading />}
				<Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
			</>
		);
	}


	return (
		<>
			{loading && <BackdropLoading />}
			{/* {localStorage.getItem("isExpired") === "true" ? (
				<Redirect to={{ pathname: "/plans" }} />
			): (
				<RouterRoute {...rest} component={Component} />
			)} */}
			<RouterRoute {...rest} component={Component} />
		</>
	);
};

export default Route;
