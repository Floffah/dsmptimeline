import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export const getServerSideProps = (
    _p: GetServerSidePropsContext,
): GetServerSidePropsResult<any> => ({ props: {} });

export const buildServerPropsFN = (_opts: any) => (
    p: GetServerSidePropsContext,
) => getServerSideProps(p);
