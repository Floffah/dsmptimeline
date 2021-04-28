import { GetStaticPropsContext, GetStaticPropsResult } from "next";

export const getStaticProps = (
    _p: GetStaticPropsContext,
): GetStaticPropsResult<any> => ({ props: {} });

export const buildStaticPropsFN = (_opts: any) => (p: GetStaticPropsContext) =>
    getStaticProps(p);
