import "./index.css"
import "fullscreen-polyfill"

import ReactDOM from "react-dom"
import { RouterProvider } from "react-router-dom"

import reportWebVitals from "./reportWebVitals"
import { router } from "./routes/router"
import { registerFonts } from "./styles/fonts/registerFonts"

registerFonts()
ReactDOM.render(<RouterProvider router={router} />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
