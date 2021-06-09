import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// component file
import TodoContainer from "./components/TodoContainer"

// stylesheet
import "./App.css"

//const element = <h1>Hello from Create React App</h1>

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<TodoContainer />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
