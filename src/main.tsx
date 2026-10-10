import "dayjs/locale/de";
import "./main.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { ensureLocalization } from "./Initialization/Localization";
import { Router } from "./routes";

ensureLocalization();

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
