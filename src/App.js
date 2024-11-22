import React from "react";
import Cookies from "js-cookie";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import {getRoutes} from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function App() {

	const token = Cookies.get("tk");

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<RouterProvider router={getRoutes(token)}/>
		</LocalizationProvider>
	);
}
