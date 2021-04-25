import "antd/dist/antd.dark.min.css";
import React, { FC } from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "styled-components";
import AppState, { AppContext } from "../state/AppState";
import getTheme from "../theme/theme";

const NextApp: FC<AppProps> = (p) => {
    const app = new AppState(getTheme());

    return (
        <>
            <DefaultSeo
                description="All streams/videos of the smp cut into a big timeline"
                titleTemplate="%s | Timeline"
                openGraph={{
                    locale: "en",
                    title: "DreamSMP Timeline",
                    description:
                        "All streams/videos of the smp cut into a big timeline",
                }}
            />
            <AppContext.Provider value={app}>
                <ThemeProvider theme={app.theme}>
                    <p.Component {...p.pageProps} />
                </ThemeProvider>
            </AppContext.Provider>
        </>
    );
};

export default NextApp;
