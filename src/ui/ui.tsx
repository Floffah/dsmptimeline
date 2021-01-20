import "antd/dist/antd.dark.min.css";
import AppState from "./state/AppState";
import getTheme from "./theme/theme";
import { ThemeProvider } from "styled-components";
import Body from "./components/structures/Body";
import { render } from "react-dom";
import * as React from "react";

export default function ui() {
    const app = new AppState(getTheme());
    render(
        <ThemeProvider theme={app.theme}>
            <Body />
        </ThemeProvider>,
        getRoot(),
    );
}

export function getRoot() {
    let root = document.getElementById("root");
    if (root === null) {
        root = document.createElement("div");
        root.setAttribute("id", "root");
        document.body.appendChild(root);
    }
    return root;
}
