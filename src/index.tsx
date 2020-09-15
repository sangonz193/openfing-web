import "fullscreen-api-polyfill";
import "regenerator-runtime/runtime";

import { Stylesheet } from "@fluentui/react/lib/Styling";
import React from "react";
import { render } from "react-dom";

import robotoBold from "./assets/fonts/Roboto-Bold.ttf";
import robotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import { App } from "./components/App";
import { registerIcons } from "./components/Icon/registerIcons";
import { renderWithStructure } from "./renderWithStructure";

registerIcons();

// window.addEventListener("keydown", (k) => {
// 	if (k.code === "Backquote") debugger;
// });

Stylesheet.getInstance().setConfig({ namespace: "of" });

const wrapper = document.getElementById("root");

const head = document.getElementsByTagName("head")[0];
const style = document.createElement("style");
style.innerHTML = `
    @font-face {
        font-family: Roboto;
        src: url("${robotoRegular}");
    }
    @font-face {
        font-family: Roboto;
        src: url("${robotoBold}");
        font-weight: bold;
    }`;
head.appendChild(style);

render(<>{renderWithStructure(App)}</>, wrapper);
