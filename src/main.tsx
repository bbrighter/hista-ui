import "dayjs/locale/de";
import "./main.css";

import { i18n } from "@lingui/core";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { messages as deMessages } from "./locales/de-DE/messages";
import { messages as swMessages } from "./locales/de-SW/messages";
import { Router } from "./routes";

i18n.load({
	"de-DE": deMessages,
	"de-SW": swMessages,
});

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
