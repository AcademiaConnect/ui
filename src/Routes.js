import React  from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {checkAuthLoader} from "./shared/auth";
import Login from "./containers/Auth/Login";
import NavBar from "./components/NavBar/NavBar";
import Error from "./containers/Error/Error";
import CreateAccount from "./containers/Auth/CreateAccount";
import Inicial from "./containers/Inicio";


export const getRoutes = (dispatch, token) => {
    let routes = [];
    
    if (token) {
        // Usuário autenticado
        routes = [
            {path: "inicio", element: <Inicial />, loader: () => checkAuthLoader(dispatch)},
            {path: "*", element: <Navigate to="/inicio" />}
        ];
    } else {
        // Usuário não autenticado
        routes = [
            {path: "create_account", element: <CreateAccount />},
            {path: "*", element: <Navigate to="/" />},
            {index: true, element: <Login />},
        ];
    }

    return createBrowserRouter([
        {
            path: "*",
            errorElement: <Error />,
            element: <NavBar />,
            children: routes
        },
    ]);
};