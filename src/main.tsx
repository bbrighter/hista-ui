import "dayjs/locale/de";
import "./main.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";

import { Router } from "./routes";

dayjs.locale("de");

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Router />
		</ThemeProvider>
	</React.StrictMode>,
);
