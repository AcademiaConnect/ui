import React  from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {checkAuthLoader} from "./shared/auth";
import Login from "./containers/Auth/Login";
import Error from "./containers/Error/Error";
import CreateAccount from "./containers/Auth/CreateAccount";
import Events from "./containers/Events/events";


export const getRoutes = (token) => {
    let routes = [];
    
    if (token) {
        // Usuário autenticado
        routes = [
            {path: "*", element: <Navigate to="/events" />},
            {path: "events", element: <Events />, loader: () => checkAuthLoader() }

        ];
    } else {
        // Usuário não autenticado
        routes = [
            {path: "create_account", element: <CreateAccount />},
            {path: "*", element: <Navigate to="/" />},
            {index: true, element: <Login />}
        ];
    }

    return createBrowserRouter([
        {
            path: "*",
            errorElement: <Error />,
            children: routes
        },
    ]);
};