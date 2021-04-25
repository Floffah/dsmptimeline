import { schemeToTheme, Theme } from "./theme";

export function darkTheme(): Theme {
    return schemeToTheme({
        accent: [
            "#ffffff",
            "#fafafa",
            "#f5f5f5",
            "#f0f0f0",
            "#d9d9d9",
            "#bfbfbf",
            "#8c8c8c",
            "#595959",
            "#434343",
            "#262626",
            "#1f1f1f",
            "#141414",
            "#000000",
        ],
        primary: [
            "#111d2c",
            "#112a45",
            "#15395b",
            "#164c7e",
            "#1765ad",
            "#177ddc",
            "#3c9ae8",
            "#65b7f3",
            "#8dcff8",
            "#b7e3fa",
        ],
        error: [
            "#2a1215",
            "#431418",
            "#58181c",
            "#791a1f",
            "#a61d24",
            "#d32029",
            "#e84749",
            "#f37370",
            "#f89f9a",
            "#fac8c3",
        ],
    });
}
