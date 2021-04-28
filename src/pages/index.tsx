import React, { FC } from "react";
import Body from "../components/structures/Body";
import { NextSeo } from "next-seo";
import { buildServerPropsFN } from "../lib/ssr";

const Index: FC = (_p) => {
    return (
        <>
            <NextSeo title="Home" />
            <Body />
        </>
    );
};

export default Index;

export const getServerSideProps = buildServerPropsFN({});
