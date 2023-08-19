import "./index.css"
import "fullscreen-polyfill"

import ReactDOM from "react-dom"

import { App } from "./components/App"
import { registerGoogleAnalytics } from "./googleAnalytics/registerGoogleAnalytics"
import { renderWithContext } from "./renderWithContext"
import reportWebVitals from "./reportWebVitals"
import { registerFonts } from "./styles/fonts/registerFonts"

registerGoogleAnalytics()
registerFonts()
ReactDOM.render(renderWithContext(App), document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
