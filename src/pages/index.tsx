import React, { FC } from "react";
import Body from "../components/structures/Body";
import { NextSeo } from "next-seo";
import { buildStaticPropsFN } from "../lib/ssg";

const Index: FC = (_p) => {
    return (
        <>
            <NextSeo title="Home" />
            <Body />
        </>
    );
};

export default Index;

//export const getServerSideProps = buildServerPropsFN({});
export const getStaticProps = buildStaticPropsFN({});
