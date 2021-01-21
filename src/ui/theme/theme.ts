import { darkTheme } from "./dark";

export default function getTheme(name = "dark"): Theme {
    if (name === "dark") {
        return darkTheme();
    }
    return darkTheme();
}

export function schemeToTheme(scheme: Scheme): Theme {
    return {
        bg: scheme.accent[11],
        topareas: {
            bg: scheme.accent[10],
        },
        creditbar: {
            bg: scheme.accent[10],
        },
    };
}

export interface Theme {
    bg: string;
    topareas: {
        bg: string;
    };
    creditbar: {
        bg: string;
    };
}

export interface Scheme {
    accent: [
        string, //1
        string, //2
        string, //3
        string, //4
        string, //5
        string, //6
        string, //7
        string, //8
        string, //9
        string, //10
        string, //11
        string, //12
        string, //13
        // from ant-design's gray colour
    ];
    primary: [
        string, //1
        string, //2
        string, //3
        string, //4
        string, //5
        string, //6
        string, //7
        string, //8
        string, //9
        string, //10
        // from ant-design's daybreak blue in dark mode
    ];
    error: [
        string, //1
        string, //2
        string, //3
        string, //4
        string, //5
        string, //6
        string, //7
        string, //8
        string, //9
        string, //10
        // from ant-design's dust red in dark mode
    ];
}
